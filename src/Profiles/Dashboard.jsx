import { useEffect, useState } from "react";
import axios from "axios";
import { FaNewspaper, FaUsers, FaEye, FaCommentDots } from "react-icons/fa";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const Dashboard = () => {
    const [stats, setStats] = useState({
        articles: 0,
        views: 0,
        users: 0,
        reviews: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [articlesRes, usersRes, reviewsRes] = await Promise.all([
                    axios.get("https://k-info-nic-server.vercel.app/News"),
                    axios.get("https://k-info-nic-server.vercel.app/users"),
                    axios.get("https://k-info-nic-server.vercel.app/reviews"),
                ]);

                const totalViews = articlesRes.data.reduce((acc, cur) => acc + (cur.viewCount || 0), 0);

                setStats({
                    articles: articlesRes.data.length,
                    views: totalViews,
                    users: usersRes.data.length,
                    reviews: reviewsRes.data.length,
                });
            } catch (err) {
                console.error("Error loading dashboard stats", err);
            }
        };

        fetchStats();
    }, []);

    const pieData = [
        { name: "Articles", value: stats.articles },
        { name: "Views", value: stats.views },
        { name: "Users", value: stats.users },
        { name: "Reviews", value: stats.reviews },
    ];

    const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"];

    const cards = [
        {
            label: "Total Articles",
            value: stats.articles,
            icon: <FaNewspaper className="text-4xl text-green-500" />,
            bg: "from-green-200 to-green-100",
        },
        {
            label: "Total Views",
            value: stats.views,
            icon: <FaEye className="text-4xl text-blue-500" />,
            bg: "from-blue-200 to-blue-100",
        },
        {
            label: "Total Users",
            value: stats.users,
            icon: <FaUsers className="text-4xl text-yellow-500" />,
            bg: "from-yellow-200 to-yellow-100",
        },
        {
            label: "Total Reviews",
            value: stats.reviews,
            icon: <FaCommentDots className="text-4xl text-red-500" />,
            bg: "from-red-200 to-red-100",
        },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-10"> Dashboard Overview</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {cards.map((card, idx) => (
                    <div
                        key={idx}
                        className={`bg-gradient-to-br ${card.bg} p-6 rounded-2xl shadow-lg backdrop-blur-md border border-gray-200 hover:scale-105 transition-transform duration-300`}
                    >
                        <div className="flex items-center gap-4">
                            {card.icon}
                            <div>
                                <p className="text-gray-600 text-sm">{card.label}</p>
                                <h2 className="text-2xl font-extrabold text-gray-800">{card.value}</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md border max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold text-center mb-6 text-green-600"> Stats Pie Chart</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};

export default Dashboard;
