import { useEffect, useState } from "react";
import axios from "axios";
import { FaNewspaper, FaUsers, FaEye, FaCommentDots } from "react-icons/fa";

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
                    axios.get("http://localhost:5000/News"),
                    axios.get("http://localhost:5000/users"),
                    axios.get("http://localhost:5000/reviews"),
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

    const cards = [
        {
            label: "Total Articles",
            value: stats.articles,
            icon: <FaNewspaper className="text-3xl text-red-500" />,
        },
        {
            label: "Total Views",
            value: stats.views,
            icon: <FaEye className="text-3xl text-red-500" />,
        },
        {
            label: "Total Users",
            value: stats.users,
            icon: <FaUsers className="text-3xl text-red-500" />,
        },
        {
            label: "Total Reviews",
            value: stats.reviews,
            icon: <FaCommentDots className="text-3xl text-red-500" />,
        },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-10">📊 Dashboard Overview</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-white shadow-md p-6 rounded-xl border hover:shadow-lg transition">
                        <div className="flex items-center gap-4">
                            {card.icon}
                            <div>
                                <p className="text-gray-500 text-sm">{card.label}</p>
                                <h2 className="text-xl font-bold text-gray-800">{card.value}</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Dashboard;
