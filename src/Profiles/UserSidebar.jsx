import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    FaUser,
    FaNewspaper,
    FaStar,
    FaCrown,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaUsers,
    FaThLarge,
} from "react-icons/fa";
import { BiHome } from "react-icons/bi";
import { AuthContext } from "../Auth/Providers/AuthProvider";

const UserSidebar = () => {
    const { user: authUser, UserSignOut } = useContext(AuthContext);
    const [sidebarUser, setSidebarUser] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (authUser?.email) {
            fetch("http://localhost:5000/Users")
                .then((res) => res.json())
                .then((data) => {
                    const matchedUser = data.find(u => u.email === authUser.email);
                    setSidebarUser(matchedUser);
                })
                .catch(err => {
                    console.error("Failed to fetch user:", err);
                });
        }
    }, [authUser]);

    const linkClasses =
        "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-100 text-gray-700 transition-all font-medium";

    const adminLinks = [
        { to: "/", label: "Back to Home Page", icon: <BiHome /> },
        { to: "/profilePage/dashboard", label: "Dashboard", icon: <FaThLarge /> },
        { to: "/profilePage/users", label: "All Users", icon: <FaUsers /> },
        { to: "/profilePage/articles", label: "All Articles", icon: <FaNewspaper /> },
    ];

    const userLinks = [
        { to: "/", label: "Back to Home Page", icon: <BiHome /> },
        { to: "/profilePage/profile", label: "Profile", icon: <FaUser /> },
        { to: "/profilePage/user/my-articles", label: "My Articles", icon: <FaNewspaper /> },
        { to: "/profilePage/user/reviews", label: "My Reviews", icon: <FaStar /> },
        { to: "/profilePage/user/subscription", label: "Subscription", icon: <FaCrown /> },
    ];

    const currentLinks = sidebarUser?.role === "admin" ? adminLinks : userLinks;

    return (
        <div className="sticky top-0 z-50">
            {/* Mobile Navbar */}
            <div className="md:hidden bg-white shadow px-4 py-3 flex justify-between items-center">
                <h2 className="text-lg font-bold text-green-600">User Panel</h2>
                <button onClick={() => setOpen(!open)} className="text-gray-700">
                    {open ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed md:static top-0 left-0 h-screen z-40 transform ${open ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 transition-transform duration-300 bg-white w-64 shadow-lg border-r p-6`}
            >
                <h2 className="text-2xl font-extrabold text-green-600 mb-10 hidden md:block text-center">
                    {sidebarUser?.role === "admin" ? "Admin Panel" : "User Panel"}
                </h2>

                <nav className="space-y-3">
                    {currentLinks.map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `${linkClasses} ${isActive ? "bg-green-100 font-semibold" : ""}`
                            }
                        >
                            {icon}
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>

                <button
                    onClick={UserSignOut}
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all shadow-md"
                >
                    <FaSignOutAlt />
                    Log Out
                </button>
            </aside>

            {/* Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                ></div>
            )}
        </div>
    );
};

export default UserSidebar;
