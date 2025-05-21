import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Article } from '../types';
import { getArticleById, searchArticles } from '../data/mockArticles';

interface NewsContextType {
  savedArticles: Article[];
  saveArticle: (article: Article) => void;
  unsaveArticle: (articleId: string) => void;
  isArticleSaved: (articleId: string) => boolean;
  searchResults: Article[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export function NewsProvider({ children }: { children: ReactNode }) {
  const [savedArticles, setSavedArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('savedArticles');
    if (saved) {
      try {
        // We only store IDs in localStorage, so we need to fetch the full articles
        const savedIds: string[] = JSON.parse(saved);
        return savedIds.map(id => getArticleById(id)).filter(Boolean) as Article[];
      } catch (e) {
        console.error('Error parsing saved articles:', e);
        return [];
      }
    }
    return [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);

  useEffect(() => {
    if (searchTerm.trim()) {
      setSearchResults(searchArticles(searchTerm));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    // Only save the IDs to localStorage to keep it lightweight
    const articleIds = savedArticles.map(article => article.id);
    localStorage.setItem('savedArticles', JSON.stringify(articleIds));
  }, [savedArticles]);

  const saveArticle = (article: Article) => {
    if (!isArticleSaved(article.id)) {
      setSavedArticles(prev => [...prev, article]);
    }
  };

  const unsaveArticle = (articleId: string) => {
    setSavedArticles(prev => prev.filter(article => article.id !== articleId));
  };

  const isArticleSaved = (articleId: string) => {
    return savedArticles.some(article => article.id === articleId);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <NewsContext.Provider 
      value={{ 
        savedArticles, 
        saveArticle, 
        unsaveArticle, 
        isArticleSaved,
        searchResults,
        searchTerm,
        setSearchTerm,
        clearSearch
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
}