import { Article } from '../../types';
import ArticleCard from './ArticleCard';

interface ArticleGridProps {
  articles: Article[];
  columns?: number;
}

const ArticleGrid = ({ articles, columns = 3 }: ArticleGridProps) => {
  const columnClass = columns === 1 
    ? 'grid-cols-1' 
    : columns === 2 
      ? 'grid-cols-1 md:grid-cols-2' 
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600 dark:text-gray-400">No articles found.</p>
      </div>
    );
  }

  return (
    <div className={`grid ${columnClass} gap-6`}>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleGrid;