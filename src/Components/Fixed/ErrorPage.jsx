import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-red-50 to-white dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 px-6">
            <div className="bg-white/90 dark:bg-zinc-800/80 backdrop-blur-md shadow-xl rounded-3xl p-8 md:p-12 text-center max-w-xl w-full">
                <div className="flex flex-col items-center space-y-4">
                    <FaExclamationTriangle className="text-red-600 text-6xl animate-pulse" />
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Page Not Found</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg">
                        Sorry, the page you're looking for doesn't exist, is under construction, or has been removed.
                    </p>
                    <Link
                        to="/"
                        className="mt-6 inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300 ease-in-out"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
