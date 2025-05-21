import { CategoryInfo } from '../types';
import { Atom, BarChart3, Dumbbell, Film, Globe, HeartPulse, Laptop } from 'lucide-react';

export const categories: CategoryInfo[] = [
  {
    id: 'technology',
    name: 'Technology',
    description: 'Latest in tech, gadgets, and digital trends',
    icon: 'Laptop'
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Market updates, economy, and corporate news',
    icon: 'BarChart3'
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Scores, highlights, and sports coverage',
    icon: 'Dumbbell'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Celebrity news, movies, music, and culture',
    icon: 'Film'
  },
  {
    id: 'health',
    name: 'Health',
    description: 'Wellness, medical research, and health advice',
    icon: 'HeartPulse'
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Scientific discoveries and breakthroughs',
    icon: 'Atom'
  },
  {
    id: 'politics',
    name: 'Politics',
    description: 'Political news, policy updates, and government',
    icon: 'Globe'
  }
];

export const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case 'technology':
      return Laptop;
    case 'business':
      return BarChart3;
    case 'sports':
      return Dumbbell;
    case 'entertainment':
      return Film;
    case 'health':
      return HeartPulse;
    case 'science':
      return Atom;
    case 'politics':
      return Globe;
    default:
      return Globe;
  }
};