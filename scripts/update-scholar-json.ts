import type { Publication } from '@/types';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

type ScholarItem = {
  ok: boolean;
  citationUrl: string;
  citations: number | null;
  error: string | null;
};

type ScholarJsonFile = {
  profileId: string;
  updatedAt: string;
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

  return [...new Set(scholars)].sort();
};

const buildCitationUrl = (profileId: string, articleId: string): string => {
  const url = new URL('https://scholar.google.com/citations');
  url.searchParams.set('view_op', 'view_citation');
  url.searchParams.set('hl', 'en');
  url.searchParams.set('user', profileId);
  url.searchParams.set('citation_for_view', `${profileId}:${articleId}`);
  return url.toString();
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
    const response = await fetch(citationUrl, {
      headers: {
        'user-agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'accept-language': 'en-US,en;q=0.9',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const citations = extractCitationCount(html);

    if (citations == null) {
      throw new Error('Could not extract citation count from the page');
    }

    payload.ok = true;
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

  const entries = await Promise.all(
    scholarEntries.map(async (articleId) => {
      const item = await fetchScholarItem(scholarProfileId, articleId);
      return [articleId, item] as const;
    }),
  );

  const payload: ScholarJsonFile = {
    profileId: scholarProfileId,
    updatedAt: new Date().toISOString(),
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
