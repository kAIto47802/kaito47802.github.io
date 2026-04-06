import type { Publication } from '@/types';
import Handlebars from 'handlebars';
import fs from 'node:fs';

type ScholarItem = {
  ok: boolean;
  citationUrl: string;
  citations: number | null;
  error: string | null;
};

type ScholarJsonFile = {
  profileId: string;
  updatedAt: string;
  profile?: {
    citationUrl: string;
    citations: number | null;
    error: string | null;
  };
  items: Record<string, ScholarItem>;
};

type GithubStarsJsonFile = {
  updatedAt: string;
  totalStars: number;
  items: Record<string, number>;
};

type PublicationWithMetrics = Publication & {
  githubStars?: number | null;
  scholarCitations?: number | null;
};

type LocaleData = {
  publications?: {
    content?: Record<string, Publication[]>;
  };
  githubTotalStars?: number | null;
  scholarTotalCitations?: number | null;
  [key: string]: unknown;
};

const readJsonIfExists = <T>(path: string): T | null => {
  if (!fs.existsSync(path)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(path, 'utf8')) as T;
};

const rawData = JSON.parse(
  fs.readFileSync('src/i18n/locales/en.json', 'utf8'),
) as LocaleData;

const scholarData = readJsonIfExists<ScholarJsonFile>('public/data/scholar.json');
const githubStarsData = readJsonIfExists<GithubStarsJsonFile>(
  'public/data/github-stars.json',
);

const content = rawData.publications?.content ?? {};

const enrichedContent: Record<string, PublicationWithMetrics[]> = Object.fromEntries(
  Object.entries(content).map(([category, publications]) => [
    category,
    publications.map((publication) => {
      const githubRepo = publication.github?.repo;
      const githubStars =
        publication.github?.withStar && githubRepo
          ? (githubStarsData?.items[githubRepo] ?? null)
          : undefined;

      const scholarId = publication.scholar;
      const scholarCitations = scholarId
        ? (scholarData?.items[scholarId]?.citations ?? null)
        : undefined;

      return {
        ...publication,
        githubStars,
        scholarCitations,
      };
    }),
  ]),
);

const data: LocaleData = {
  ...rawData,
  publications: {
    ...rawData.publications,
    content: enrichedContent,
  },
  githubTotalStars: githubStarsData?.totalStars ?? null,
  scholarTotalCitations: scholarData?.profile?.citations ?? null,
};

Handlebars.registerHelper('escapeLatex', (text: unknown): unknown =>
  typeof text !== 'string' ? text : text.replace(/&/g, '\\&').replace(/#/g, '\\#'),
);
Handlebars.registerHelper('or', (...args) => {
  const values = args.slice(0, -1);
  return values.some(Boolean);
});
Handlebars.registerHelper('and', (...args) => {
  const values = args.slice(0, -1);
  return values.every(Boolean);
});

const tpl = fs.readFileSync('src/templates/cv.tex.hbs', 'utf8');
const render = Handlebars.compile(tpl);
let output = render(data);

output = output
  .replace(/<underline>([\s\S]*?)<\/underline>/g, '\\underline{$1}')
  .replace(/&/g, '\\&')
  .replace(/–/g, '--');

fs.writeFileSync('cv.tex', output);
console.log('LaTeX CV generated successfully!');
