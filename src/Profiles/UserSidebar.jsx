import { NavLink } from "react-router-dom";
import {
    FaUser,
    FaNewspaper,
    FaStar,
    FaCrown,
    FaSignOutAlt,
} from "react-icons/fa";

const UserSidebar = () => {
    const linkClasses = "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-100 text-gray-700 transition";

    return (
        <aside className="w-64 bg-white shadow-md border-r min-h-screen p-6 hidden md:block">
            <h2 className="text-2xl font-bold text-red-600 mb-8 text-center">User Panel</h2>

            <nav className="space-y-4">
                <NavLink
                    to="/user/profile"
                    className={({ isActive }) =>
                        `${linkClasses} ${isActive ? "bg-red-100 font-semibold" : ""}`
                    }
                >
                    <FaUser /> Profile
                </NavLink>

                <NavLink
                    to="/user/my-articles"
                    className={({ isActive }) =>
                        `${linkClasses} ${isActive ? "bg-red-100 font-semibold" : ""}`
                    }
                >
                    <FaNewspaper /> My Articles
                </NavLink>

                <NavLink
                    to="/user/reviews"
                    className={({ isActive }) =>
                        `${linkClasses} ${isActive ? "bg-red-100 font-semibold" : ""}`
                    }
                >
                    <FaStar /> My Reviews
                </NavLink>

                <NavLink
                    to="/user/subscription"
                    className={({ isActive }) =>
                        `${linkClasses} ${isActive ? "bg-red-100 font-semibold" : ""}`
                    }
                >
                    <FaCrown /> Subscription
                </NavLink>

                <NavLink
                    to="/logout"
                    className={linkClasses}
                >
                    <FaSignOutAlt /> Logout
                </NavLink>
            </nav>
        </aside>
    );
};

export default UserSidebar;
