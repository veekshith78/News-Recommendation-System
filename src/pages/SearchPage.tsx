import { useEffect } from 'react';
import { useNews } from '../contexts/NewsContext';
import { Search, X } from 'lucide-react';
import ArticleGrid from '../components/articles/ArticleGrid';

const SearchPage = () => {
  const { searchResults, searchTerm, setSearchTerm, clearSearch } = useNews();

  useEffect(() => {
    document.title = searchTerm ? `Search: ${searchTerm} - NewsLens` : 'Search - NewsLens';
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('searchQuery') as string;
    if (query.trim()) {
      setSearchTerm(query);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Search Articles</h1>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                name="searchQuery"
                defaultValue={searchTerm}
                placeholder="Search for topics, keywords, or phrases..."
                className="w-full pl-12 pr-12 py-4 rounded-lg text-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500 dark:text-gray-400" />
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {searchTerm ? (
          <>
            <h2 className="text-2xl font-bold mb-6">
              {searchResults.length > 0
                ? `Found ${searchResults.length} results for "${searchTerm}"`
                : `No results found for "${searchTerm}"`}
            </h2>
            <ArticleGrid articles={searchResults} />
            
            {searchResults.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try different keywords or check your spelling.
                </p>
                <button
                  onClick={clearSearch}
                  className="btn-secondary"
                >
                  Clear Search
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Enter a search term to find articles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;