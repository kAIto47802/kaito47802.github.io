import type { Publication } from '@/types';
import * as cheerio from 'cheerio';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

type ScholarItem = {
  ok: boolean;
  citationUrl: string;
  citations: number | null;
  error: string | null;
};

type ScholarProfile = {
  citationUrl: string;
  citations: number | null;
  error: string | null;
};

type ScholarJsonFile = {
  profileId: string;
  updatedAt: string;
  profile: ScholarProfile;
  items: Record<string, ScholarItem>;
};

type LocaleData = {
  publications?: {
    content?: Record<string, Publication[]>;
  };
};

const normalizeText = (text: string): string =>
  text
    .replace(/[\u200e\u200f\u202a-\u202e\u2066-\u2069]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const parseCitationCount = (text: string): number | null =>
  /^(?:\d+|\d{1,3}(?:,\d{3})+)$/.test(text) ? Number(text.replaceAll(',', '')) : null;

const extractProfileCitationCount = ($: cheerio.CheerioAPI): number | null => {
  const row = $('#gsc_rsb_st tbody tr')
    .filter((_, tr) => {
      const label = normalizeText($(tr).find('td.gsc_rsb_sc1').first().text());
      return label === 'Citations';
    })
    .first();

  return parseCitationCount(normalizeText(row.find('td.gsc_rsb_std').first().text()));
};

const getScholarEntries = async (): Promise<string[]> => {
  const data = JSON.parse(
    await readFile('src/i18n/locales/en.json', 'utf8'),
  ) as LocaleData;

  const content = data.publications?.content ?? {};

  const scholars = Object.values(content).flatMap((publications) =>
    publications
      .filter(
        (publication): publication is Publication & { scholar: string } =>
          typeof publication.scholar === 'string' && publication.scholar.length > 0,
      )
      .map((publication) => publication.scholar),
  );

  return Array.from(new Set(scholars)).sort();
};

const buildCitationUrl = (profileId: string, articleId: string): string => {
  const url = new URL('https://scholar.google.com/citations');
  url.searchParams.set('view_op', 'view_citation');
  url.searchParams.set('hl', 'en');
  url.searchParams.set('user', profileId);
  url.searchParams.set('citation_for_view', `${profileId}:${articleId}`);
  return url.toString();
};

const buildProfileUrl = (profileId: string): string => {
  const url = new URL('https://scholar.google.com/citations');
  url.searchParams.set('hl', 'en');
  url.searchParams.set('user', profileId);
  return url.toString();
};

const fetchHtml = async (url: string): Promise<string> => {
  const response = await fetch(url, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      'accept-language': 'en-US,en;q=0.9',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  return await response.text();
};

const fetchScholarProfile = async (profileId: string, articleIds: string[]) => {
  const citationUrl = buildProfileUrl(profileId);
  const pageUrl = new URL(citationUrl);
  pageUrl.searchParams.set('cstart', '0');
  pageUrl.searchParams.set('pagesize', '100');

  let $ = cheerio.load(await fetchHtml(pageUrl.toString()));
  const citations = extractProfileCitationCount($);
  if (citations === null) {
    throw new Error('Could not extract profile citation count from Google Scholar');
  }

  const profile = { citationUrl, citations, error: null };
  const articleCitations = new Map<string, number>();
  const pending = new Set(articleIds);
  const profilePrefix = `${profileId}:`;
  let offset = 0;

  while (pending.size > 0) {
    const rows = $('#gsc_a_b tr.gsc_a_tr');

    for (const row of rows) {
      const article = $(row);
      const href = article.find('a.gsc_a_at').attr('href');
      if (!href || !URL.canParse(href, citationUrl)) {
        continue;
      }

      const citationId = new URL(href, citationUrl).searchParams.get('citation_for_view');
      if (!citationId?.startsWith(profilePrefix)) {
        continue;
      }

      const articleId = citationId.slice(profilePrefix.length);
      if (!pending.has(articleId)) {
        continue;
      }

      const link = article.find('.gsc_a_c a.gsc_a_ac').first();
      const text = normalizeText(link.text());
      // Scholar leaves both the count and link empty for uncited articles.
      const count =
        text === '' && link.attr('href') === '' ? 0 : parseCitationCount(text);
      if (count !== null) {
        articleCitations.set(articleId, count);
        pending.delete(articleId);
      }
    }

    if (
      pending.size === 0 ||
      rows.length === 0 ||
      !$('#gsc_bpf_more').is('button:not([disabled])')
    ) {
      break;
    }

    offset += rows.length;
    pageUrl.searchParams.set('cstart', String(offset));
    $ = cheerio.load(await fetchHtml(pageUrl.toString()));
    if ($('#gsc_a_b').length === 0) {
      throw new Error(
        `Could not read the Google Scholar article list at offset ${offset}`,
      );
    }
  }

  return { profile, articleCitations };
};

const readPreviousData = async (outputPath: string): Promise<ScholarJsonFile | null> => {
  try {
    return JSON.parse(await readFile(outputPath, 'utf8')) as ScholarJsonFile;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw error;
  }
};

const main = async () => {
  const scholarEntries = await getScholarEntries();
  const scholarProfileId = 'oJvSC5wAAAAJ';
  const outputPath = process.env.OUTPUT_PATH ?? 'public/data/scholar.json';

  const { profile, articleCitations } = await fetchScholarProfile(
    scholarProfileId,
    scholarEntries,
  );
  const previous =
    articleCitations.size < scholarEntries.length
      ? await readPreviousData(outputPath)
      : null;
  const previousItems =
    previous?.profileId === scholarProfileId ? previous.items : undefined;

  const entries = scholarEntries.map((articleId): [string, ScholarItem] => {
    const count = articleCitations.get(articleId);
    const error =
      count === undefined
        ? 'Could not extract article citation count from the Google Scholar profile'
        : null;
    const citations = count ?? previousItems?.[articleId]?.citations ?? null;
    if (error) {
      const fallback =
        citations === null ? '' : `; retaining previous count (${citations})`;
      console.warn(`${articleId}: ${error}${fallback}`);
    }

    return [
      articleId,
      {
        ok: count !== undefined,
        citationUrl: buildCitationUrl(scholarProfileId, articleId),
        citations,
        error,
      },
    ];
  });

  const payload: ScholarJsonFile = {
    profileId: scholarProfileId,
    updatedAt: new Date().toISOString(),
    profile,
    items: Object.fromEntries(entries),
  };

  await mkdir(dirname(outputPath), { recursive: true });
  const temporaryPath = `${outputPath}.${randomUUID()}.tmp`;
  try {
    await writeFile(temporaryPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
    await rename(temporaryPath, outputPath);
  } finally {
    await rm(temporaryPath, { force: true });
  }

  console.log(`Wrote ${outputPath}`);
  console.log(JSON.stringify(payload, null, 2));
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
