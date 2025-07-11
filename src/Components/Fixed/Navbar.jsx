import { useContext, useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/reeee.png';
import { AuthContext } from '../../Auth/Providers/AuthProvider';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    const { user, UserSignOut } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        if (user?.email) {
            fetch("https://k-info-nic-server.vercel.app/Users")
                .then(res => res.json())
                .then((data => {
                    const matchedUser = data.find(u => u.email === user.email);
                    if (matchedUser?.role === 'admin') {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                }))
                .catch(err => {
                    console.error('Failed to fetch user role:', err);
                    setIsAdmin(false);
                });
        }
    }, [user]);

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
            <li>
                <NavLink to="/AboutUs" className={({ isActive }) => `${navLinkClasses} ${activeLinkStyle({ isActive })}`}>
                    About Us
                </NavLink>
            </li>

            {user && isAdmin && (
                <li>
                    <NavLink to="/profilePage/dashboard" className={({ isActive }) => `${navLinkClasses} ${activeLinkStyle({ isActive })}`}>
                        Dashboard
                    </NavLink>
                </li>
            )}

            {user && !isAdmin && (
                <>
                    <li>
                        <NavLink to="/profilePage/profile" className={({ isActive }) => `${navLinkClasses} ${activeLinkStyle({ isActive })}`}>
                            My Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profilePage/user/subscription" className={({ isActive }) => `${navLinkClasses} ${activeLinkStyle({ isActive })}`}>
                            Subscription
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <nav className="bg-green-200/50 dark:bg-zinc-900 backdrop-blur-xl shadow-md sticky top-0 z-50 border-b border-b-neutral-300 dark:border-zinc-700">
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="K-Infonic" className="dark:bg-white/50 rounded-2xl w-12 md:w-20 object-contain" />
                </Link>

                <ul className="hidden font-bold md:flex items-center space-x-6">{navLinks}</ul>

                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <Link to={isAdmin ? "/profilePage/dashboard" : "/profilePage/profile"}>
                                <img
                                    src={user.photoURL || "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_640.png"}
                                    alt={user.displayName}
                                    className="rounded-full w-10 h-10 border border-green-500 hover:w-11 hover:border-2 transition-all"
                                />
                            </Link>
                            <button
                                onClick={UserSignOut}
                                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded hover:opacity-90 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-green-600 hover:underline transition">
                                Login
                            </Link>
                            <Link to="/register" className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <button onClick={toggleMenu} className="md:hidden text-2xl text-gray-800 dark:text-gray-100 z-50">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

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
                                <Link to={isAdmin ? "/dashboard" : "/profilePage/profile"}>
                                    <button className="mt-2 text-green-600 hover:underline">
                                        Go to {isAdmin ? "Dashboard" : "Profile"}
                                    </button>
                                </Link>
                                <button
                                    onClick={UserSignOut}
                                    className="mt-2 text-green-600 hover:underline block"
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
