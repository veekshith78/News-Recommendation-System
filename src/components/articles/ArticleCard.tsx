import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, Clock } from 'lucide-react';
import { useNews } from '../../contexts/NewsContext';
import { Article } from '../../types';
import { formatDate } from '../../utils/formatters';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

const ArticleCard = ({ article, featured = false }: ArticleCardProps) => {
  const { saveArticle, unsaveArticle, isArticleSaved } = useNews();
  
  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isArticleSaved(article.id)) {
      unsaveArticle(article.id);
    } else {
      saveArticle(article);
    }
  };

  if (featured) {
    return (
      <div className="card group h-full">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <Link
              to={`/category/${article.category}`}
              className="text-xs font-semibold uppercase tracking-wider text-primary-300 hover:text-primary-200 transition-colors mb-2"
            >
              {article.category}
            </Link>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 line-clamp-2">
              <Link to={`/article/${article.id}`} className="hover:underline">
                {article.title}
              </Link>
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-300 text-sm">
                <span>{article.author}</span>
                <span className="mx-2">•</span>
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <button
                onClick={handleSaveToggle}
                className="text-white p-1 rounded-full hover:bg-white/20 transition-colors"
                aria-label={isArticleSaved(article.id) ? "Unsave article" : "Save article"}
              >
                {isArticleSaved(article.id) ? (
                  <BookmarkCheck className="w-5 h-5" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card group h-full flex flex-col">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col flex-grow p-5">
        <Link
          to={`/category/${article.category}`}
          className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors mb-2"
        >
          {article.category}
        </Link>
        <h3 className="text-lg font-bold mb-2 line-clamp-2 flex-grow">
          <Link to={`/article/${article.id}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {article.title}
          </Link>
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {article.summary}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>{article.readTime} min read</span>
          </div>
          <button
            onClick={handleSaveToggle}
            className="text-gray-500 dark:text-gray-400 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={isArticleSaved(article.id) ? "Unsave article" : "Save article"}
          >
            {isArticleSaved(article.id) ? (
              <BookmarkCheck className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;