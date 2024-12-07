export interface Poster {
  text: string;
  link: string;
}

export interface Publication {
  title: string;
  authors: string;
  conference: string;
  year: number;
  github?: string;
  arxiv?: string;
  poster?: Poster;
  type: 'international conference' | 'domestic conference' | 'workshop';
}

export interface AwardsAndHonors {
  title: string;
  descriptions: string[];
  yearMonth: string;
  emphasize: boolean;
}

export interface WorkExperience {
  company: string;
  position: string;
  period: {
    start: string;
    end: string;
  };
  descriptions: string[];
}
