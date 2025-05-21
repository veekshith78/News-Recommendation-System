import { useEffect } from 'react';
import { useNews } from '../contexts/NewsContext';
import ArticleGrid from '../components/articles/ArticleGrid';
import { Bookmark } from 'lucide-react';

const SavedArticlesPage = () => {
  const { savedArticles } = useNews();

  useEffect(() => {
    document.title = 'Saved Articles - NewsLens';
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="container-custom">
          <div className="flex items-center space-x-4 mb-2">
            <Bookmark className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <h1 className="text-3xl font-bold">Saved Articles</h1>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Your personal collection of saved articles for later reading.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        {savedArticles.length > 0 ? (
          <ArticleGrid articles={savedArticles} />
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 dark:bg-gray-800 inline-flex p-6 rounded-full mb-4">
              <Bookmark className="w-10 h-10 text-gray-500 dark:text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No saved articles yet</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
              When you find articles you want to read later, save them by clicking the bookmark icon.
            </p>
            <a href="/" className="btn-primary">
              Browse Articles
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedArticlesPage;