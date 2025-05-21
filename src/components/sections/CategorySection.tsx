import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Article } from '../../types';
import ArticleGrid from '../articles/ArticleGrid';

interface CategorySectionProps {
  title: string;
  articles: Article[];
  viewAllLink?: string;
}

const CategorySection = ({ title, articles, viewAllLink }: CategorySectionProps) => {
  if (articles.length === 0) return null;

  return (
    <section className="py-10">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
            >
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          )}
        </div>

        <ArticleGrid articles={articles.slice(0, 3)} />
      </div>
    </section>
  );
};

export default CategorySection;