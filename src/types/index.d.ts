export interface ExternalLink {
  text: string;
  name: string;
  link: string;
}

export interface Publication {
  title: string;
  authors: string;
  conference: string;
  year: number;
  github?: {
    repo: string;
    withStar?: boolean;
  };
  arxiv?: string;
  poster?: ExternalLink;
  paper?: ExternalLink;
  slide?: ExternalLink;
  link?: string;
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
