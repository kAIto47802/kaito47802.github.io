import type { Publication } from '@/types';
import * as cheerio from 'cheerio';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
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

const stripHtml = (html: string): string =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

const extractCitationCount = (html: string): number | null => {
  const text = stripHtml(html);

  const citedByMatch = text.match(/\bCited by\s+(\d+)\b/i);
  if (citedByMatch) {
    return Number.parseInt(citedByMatch[1], 10);
  }

  const citationValueMatch = text.match(/\bCitations\b\s+(\d+)\b/i);
  if (citationValueMatch) {
    return Number.parseInt(citationValueMatch[1], 10);
  }

  return null;
};

const normalizeText = (text: string): string =>
  text
    .replace(/[\u200e\u200f\u202a-\u202e\u2066-\u2069]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const extractProfileCitationCount = (html: string): number | null => {
  const $ = cheerio.load(html);

  const row = $('#gsc_rsb_st tbody tr')
    .filter((_, tr) => {
      const label = normalizeText($(tr).find('td.gsc_rsb_sc1').first().text());
      return label === 'Citations';
    })
    .first();

  if (row.length === 0) {
    return null;
  }

  const valueText = normalizeText(row.find('td.gsc_rsb_std').first().text());

  if (!valueText) {
    return null;
  }

  const value = Number.parseInt(valueText.replaceAll(',', ''), 10);
  return Number.isNaN(value) ? null : value;
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

const fetchScholarItem = async (
  profileId: string,
  articleId: string,
): Promise<ScholarItem> => {
  const citationUrl = buildCitationUrl(profileId, articleId);

  const payload: ScholarItem = {
    ok: false,
    citationUrl,
    citations: null,
    error: null,
  };

  try {
    const html = await fetchHtml(citationUrl);
    const citations = extractCitationCount(html);

    if (citations == null) {
      throw new Error('Could not extract article citation count from the page');
    }

    payload.ok = true;
    payload.citations = citations;
  } catch (error) {
    payload.error =
      error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  }

  return payload;
};

const fetchScholarProfile = async (profileId: string): Promise<ScholarProfile> => {
  const citationUrl = buildProfileUrl(profileId);

  const payload: ScholarProfile = {
    citationUrl,
    citations: null,
    error: null,
  };

  try {
    const html = await fetchHtml(citationUrl);
    const citations = extractProfileCitationCount(html);

    if (citations == null) {
      throw new Error('Could not extract profile citation count from the page');
    }

    payload.citations = citations;
  } catch (error) {
    payload.error =
      error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  }

  return payload;
};

const main = async () => {
  const scholarEntries = await getScholarEntries();
  const scholarProfileId = 'oJvSC5wAAAAJ';
  const outputPath = process.env.OUTPUT_PATH ?? 'public/data/scholar.json';

  const profile = await fetchScholarProfile(scholarProfileId);
  const entries = await Promise.all(
    scholarEntries.map(async (articleId) => {
      const item = await fetchScholarItem(scholarProfileId, articleId);
      return [articleId, item] as const;
    }),
  );

  const payload: ScholarJsonFile = {
    profileId: scholarProfileId,
    updatedAt: new Date().toISOString(),
    profile,
    items: Object.fromEntries(entries),
  };

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');

  console.log(`Wrote ${outputPath}`);
  console.log(JSON.stringify(payload, null, 2));
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
