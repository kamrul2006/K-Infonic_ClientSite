import { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/reeee.png';
import { AuthContext } from '../../Auth/Providers/AuthProvider';

const Navbar = ({ isAdmin }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    const { user, UserSignOut } = useContext(AuthContext)

    const navLinkClasses =
        'transition duration-300 relative text-base font-medium px-2 py-1 hover:text-green-500';

    const activeLinkStyle = ({ isActive }) =>
        isActive
            ? 'text-green-600 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-green-600'
            : 'text-gray-800 dark:text-gray-100';

    const navLinks = (
        <>
            <li>
                <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${activeLinkStyle({ isActive })}`}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/add-article" className={({ isActive }) => `${navLinkClasses} ${activeLinkStyle({ isActive })}`}>
                    Add Articles
                </NavLink>
            </li>
            <li>
                <NavLink to="/all-articles" className={({ isActive }) => `${navLinkClasses} ${activeLinkStyle({ isActive })}`}>
                    All Articles
                </NavLink>
            </li>
            {/* <li>
                <NavLink to="/subscription" className={({ isActive }) => `${navLinkClasses} ${activeLinkStyle({ isActive })}`}>
                    Subscription
                </NavLink>
            </li> */}
            <li>
                <NavLink to="/AboutUs" className={({ isActive }) => `${navLinkClasses} ${activeLinkStyle({ isActive })}`}>
                    About Us
                </NavLink>
            </li>

            {user && (
                <li>
                    <NavLink to="/dashboard" className={({ isActive }) => `${navLinkClasses} ${activeLinkStyle({ isActive })}`}>
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <nav className="bg-green-200/50 dark:bg-zinc-900 backdrop-blur-xl shadow-md sticky top-0 z-50 border-b border-b-neutral-300 dark:border-zinc-700  ">
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="K-Infonic" className="dark:bg-white/50 rounded-2xl w-12 md:w-20  object-contain" />
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden font-bold md:flex items-center space-x-6">{navLinks}</ul>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <FaUserCircle className="text-2xl text-gray-700 dark:text-gray-300" />
                            <button
                                onClick={UserSignOut}
                                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded hover:opacity-90 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-green-600 hover:underline transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} className="md:hidden text-2xl text-gray-800 dark:text-gray-100">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>


            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-zinc-900 px-4 pb-4 border-t border-gray-100 dark:border-zinc-700">
                    <ul className="flex flex-col gap-4">{navLinks}</ul>
                    <div className="mt-4">
                        {user ? (
                            <>
                                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                                    <FaUserCircle className="text-xl" />
                                    <span>{user.displayName}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="mt-2 text-green-600 hover:underline"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block text-green-600 hover:underline">
                                    Login
                                </Link>

                                <Link to="/register" className="block text-green-600 hover:underline">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
