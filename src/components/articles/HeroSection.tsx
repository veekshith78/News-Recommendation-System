import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Article } from '../../types';
import ArticleCard from './ArticleCard';

interface HeroSectionProps {
  featuredArticles: Article[];
}

const HeroSection = ({ featuredArticles }: HeroSectionProps) => {
  // If we have no featured articles, show nothing
  if (featuredArticles.length === 0) return null;

  return (
    <section className="py-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Featured Article */}
          {featuredArticles[0] && (
            <div className="lg:col-span-2">
              <ArticleCard article={featuredArticles[0]} featured />
            </div>
          )}

          {/* Secondary Featured Articles */}
          <div className="flex flex-col gap-6">
            {featuredArticles.slice(1, 3).map((article) => (
              <div key={article.id} className="flex-1">
                <ArticleCard article={article} featured />
              </div>
            ))}
          </div>
        </div>

        {/* Categories Quicklinks */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {['technology', 'business', 'sports', 'entertainment', 'health', 'science', 'politics'].map((category) => (
            <Link
              key={category}
              to={`/category/${category}`}
              className="flex items-center justify-center md:justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors text-center md:text-left"
            >
              <span className="font-medium capitalize">{category}</span>
              <ChevronRight className="hidden md:block w-4 h-4" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;