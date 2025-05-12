import { NavLink } from "react-router-dom";
import {
    FaUser,
    FaNewspaper,
    FaStar,
    FaCrown,
    FaSignOutAlt,
    FaBars,
    FaTimes,
} from "react-icons/fa";
import { useContext, useState } from "react";
import { BiHome } from "react-icons/bi";
import { AuthContext } from "../Auth/Providers/AuthProvider";

const UserSidebar = () => {
    const { user, UserSignOut } = useContext(AuthContext)

    const [open, setOpen] = useState(false);
    const linkClasses =
        "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-100 text-gray-700 transition duration-200";

    const links = [
        { to: "/", label: "Back to Home Page", icon: <BiHome /> },
        { to: "/profilePage/profile", label: "Profile", icon: <FaUser /> },
        { to: "/profilePage/user/my-articles", label: "My Articles", icon: <FaNewspaper /> },
        { to: "/profilePage/user/reviews", label: "My Reviews", icon: <FaStar /> },
        { to: "/profilePage/user/subscription", label: "Subscription", icon: <FaCrown /> },
        // { to: "/logout", label: "Logout", icon: <FaSignOutAlt /> },
    ];

    return (
        <div className="sticky top-0 z-50">
            {/* Mobile Navbar */}
            <div className="md:hidden bg-white shadow px-4 py-3 flex justify-between items-center">
                <h2 className="text-xl hidden md:block font-bold text-green-600">User Panel</h2>
                <button onClick={() => setOpen(!open)}>
                    {open ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed md:static top-0 left-0 h-screen z-40 transform ${open ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 transition-transform duration-300 bg-white w-64 shadow-md border-r p-6`}
            >
                <h2 className="text-2xl font-bold text-green-600 mb-8 hidden md:block text-center">
                    User Panel
                </h2>

                <nav className="space-y-4">
                    {links.map(({ to, label, icon }) => (

                        <NavLink
                            key={to}
                            to={to}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `${linkClasses} ${isActive ? "bg-green-100 font-semibold" : ""}`
                            }
                        >
                            {icon} {label}
                        </NavLink>

                    ))}
                </nav>

                <button onClick={UserSignOut} className="text-center btn w-full mx-auto mt-4">
                    <FaSignOutAlt />     Log Out
                </button>
            </aside>

            {/* Overlay for mobile menu */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                ></div>
            )}
        </div>
    );
};

export default UserSidebar;
