import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container-custom py-20 text-center animate-fade-in">
      <h1 className="text-6xl font-bold mb-6">404</h1>
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;