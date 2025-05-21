export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  source: string;
  publishedAt: string;
  imageUrl: string;
  category: Category;
  readTime: number;
  url: string;
  featured?: boolean;
}

export type Category = 
  | 'technology' 
  | 'business' 
  | 'sports' 
  | 'entertainment' 
  | 'health' 
  | 'science' 
  | 'politics';

export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  icon: string;
}