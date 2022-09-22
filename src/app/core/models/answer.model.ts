export interface Answer {
  id: number;
  title: string;
  url: string;
  answer: string;
  rank: number;
  score: number;
}

export interface ExtractiveAnswer {
  answer: string;
  score: number;
}