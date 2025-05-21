import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticlesByCategory } from '../data/mockArticles';
import { categories, getCategoryIcon } from '../data/categories';
import ArticleGrid from '../components/articles/ArticleGrid';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const category = categories.find(c => c.id === categoryId);
  const articles = categoryId ? getArticlesByCategory(categoryId) : [];
  const Icon = categoryId ? getCategoryIcon(categoryId) : null;

  useEffect(() => {
    if (category) {
      document.title = `${category.name} News - NewsLens`;
    }
  }, [category]);

  if (!category) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The category you're looking for doesn't exist.
        </p>
        <a href="/" className="btn-primary">
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="container-custom">
          <div className="flex items-center space-x-4 mb-6">
            {Icon && (
              <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
            )}
            <h1 className="text-3xl font-bold">{category.name}</h1>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
            {category.description}
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <h2 className="text-2xl font-bold mb-8">Latest in {category.name}</h2>
        
        <ArticleGrid articles={articles} />

        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No articles found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;