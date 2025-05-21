import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, User, Bookmark, BookmarkCheck, Share2 } from 'lucide-react';
import { getArticleById, getRelatedArticles } from '../data/mockArticles';
import { useNews } from '../contexts/NewsContext';
import { getCategoryIcon } from '../data/categories';
import { formatDate } from '../utils/formatters';
import ArticleCard from '../components/articles/ArticleCard';

const ArticlePage = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { saveArticle, unsaveArticle, isArticleSaved } = useNews();
  const [copied, setCopied] = useState(false);
  
  const article = articleId ? getArticleById(articleId) : undefined;
  const relatedArticles = article ? getRelatedArticles(article, 3) : [];
  
  const CategoryIcon = article ? getCategoryIcon(article.category) : null;

  useEffect(() => {
    if (article) {
      document.title = `${article.title} - NewsLens`;
    } else {
      document.title = 'Article Not Found - NewsLens';
    }
  }, [article]);

  if (!article) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleSaveToggle = () => {
    if (isArticleSaved(article.id)) {
      unsaveArticle(article.id);
    } else {
      saveArticle(article);
    }
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in">
      {/* Article Header */}
      <header className="bg-gray-100 dark:bg-gray-800 pt-10 pb-6">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Link
              to={`/category/${article.category}`}
              className="inline-flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-4"
            >
              {CategoryIcon && <CategoryIcon className="w-4 h-4 mr-1" />}
              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{article.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 mb-6 gap-y-2">
              <div className="flex items-center mr-6">
                <User className="w-4 h-4 mr-1" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center mr-6">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center mr-6">
                <Clock className="w-4 h-4 mr-1" />
                <span>{article.readTime} min read</span>
              </div>
              <span>{article.source}</span>
            </div>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 font-medium italic">
              {article.summary}
            </p>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="container-custom py-10">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Article Actions */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              <button
                onClick={handleSaveToggle}
                className="flex items-center px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isArticleSaved(article.id) ? (
                  <>
                    <BookmarkCheck className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-5 h-5 mr-2" />
                    <span>Save</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleShareClick}
                className="flex items-center px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Share2 className="w-5 h-5 mr-2" />
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Article Text */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6">{paragraph}</p>
            ))}
          </div>
          
          {/* Source Attribution */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-gray-600 dark:text-gray-400">
              Source: <span className="font-medium">{article.source}</span>
            </p>
            {article.url && article.url !== '#' && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                Read original article
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="bg-gray-100 dark:bg-gray-800 py-12">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;