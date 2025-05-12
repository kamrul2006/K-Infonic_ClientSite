import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const NewsSidebar = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        axios.get("https://k-info-nic-server.vercel.app/News")
            .then(res => {
                const approvedNews = res.data
                    .filter(item => item.status === "approved")
                    .sort((a, b) => b.viewCount - a.viewCount)
                    .slice(0, 6); // Top 5 trending
                setNews(approvedNews);
            })
            .catch(err => console.error("Error fetching news for sidebar:", err));
    }, []);

    return (
        <aside className="bg-white rounded-xl pl-4 py-4 h-screen w-full hidden lg:block">
            <h2 className="text-xl font-serif font-bold text-green-600 mb-4 border-b pb-2">
                Trending News
            </h2>

            <ul className="space-y-4 px-4">
                {news.map(article => (
                    <li key={article._id} className="flex items-start gap-3">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-16 h-16 object-cover rounded-md shadow"
                        />
                        <div>
                            <Link to={`/article/${article._id}`}>
                                <h3 className="text-sm font-semibold text-gray-800 hover:text-green-600 line-clamp-2">
                                    {article.title}
                                </h3>
                            </Link>
                            <p className="text-xs text-gray-500">{article.publisher}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default NewsSidebar;
