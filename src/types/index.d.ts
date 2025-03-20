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
  link?: string;
  type: 'international conference' | 'domestic conference' | 'article' | 'workshop';
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

export interface Education {
  institution: string;
  department: string;
  degree: string;
  period: {
    start: string;
    end: string;
  };
  notes: string[];
}

export interface OtherExperience {
  place: string;
  period: {
    start: string;
    end: string;
  };
  descriptions: string[];
  notes: string[];
}
