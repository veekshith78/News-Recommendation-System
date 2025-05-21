import { Link } from 'react-router-dom';
import { categories, getCategoryIcon } from '../../data/categories';

const CategoryList = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8 rounded-lg">
      <div className="container-custom">
        <h3 className="text-xl font-bold mb-5">Browse by Category</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.id);
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="flex items-center p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full flex items-center justify-center mr-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">{category.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;