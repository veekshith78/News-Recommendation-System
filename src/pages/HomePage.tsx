import { useEffect } from 'react';
import { getFeaturedArticles, getRecentArticles, getArticlesByCategory } from '../data/mockArticles';
import HeroSection from '../components/articles/HeroSection';
import CategorySection from '../components/sections/CategorySection';
import CategoryList from '../components/common/CategoryList';

const HomePage = () => {
  useEffect(() => {
    document.title = 'NewsLens - Smart News Recommendations';
  }, []);

  const featuredArticles = getFeaturedArticles();
  const recentArticles = getRecentArticles();
  const technologyArticles = getArticlesByCategory('technology');
  const businessArticles = getArticlesByCategory('business');

  return (
    <div className="min-h-screen animate-fade-in">
      <HeroSection featuredArticles={featuredArticles} />
      
      <div className="container-custom py-6">
        <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Stay informed with <span className="text-primary-600 dark:text-primary-400">personalized news</span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-xl">
              Get news recommendations tailored to your interests. Our smart algorithm learns from your reading habits to deliver content that matters to you.
            </p>
          </div>
          <button className="btn-primary whitespace-nowrap">
            Customize Your Feed
          </button>
        </div>
      </div>
      
      <CategorySection 
        title="Latest News" 
        articles={recentArticles} 
      />
      
      <CategoryList />
      
      <CategorySection 
        title="Technology" 
        articles={technologyArticles} 
        viewAllLink="/category/technology" 
      />
      
      <CategorySection 
        title="Business" 
        articles={businessArticles} 
        viewAllLink="/category/business" 
      />
    </div>
  );
};

export default HomePage;