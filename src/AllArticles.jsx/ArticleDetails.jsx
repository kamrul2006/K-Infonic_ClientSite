import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaEye } from "react-icons/fa";

const ArticleDetails = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        const fetchAndUpdate = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/News/${id}`);
                setArticle(data);

                await axios.put(`http://localhost:5000/News/views/${id}`, {
                    viewCount: data.viewCount + 1,
                });

                const allArticles = await axios.get(`http://localhost:5000/News`);
                const filtered = allArticles.data
                    .filter(a => a.category === data.category && a._id !== data._id)
                    .slice(0, 4);
                setRelated(filtered);
            } catch (err) {
                console.error("Error fetching or updating article", err);
            }
        };

        fetchAndUpdate();
    }, [id]);

    if (!article) {
        return <div className="text-center py-10 text-gray-600">Loading...</div>;
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Article */}
            <div className="lg:col-span-2">
                <div className="relative mb-6">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-80 object-cover rounded-2xl shadow-lg"
                    />
                    <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-md text-sm shadow-md">
                        {article.category}
                    </div>
                </div>

                <h1 className="text-4xl font-extrabold text-gray-900 leading-snug mb-4">
                    {article.title}
                </h1>

                <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 mb-6">
                    <p>
                        Publisher:{" "}
                        <span className="text-green-600 font-semibold">{article.publisher}</span>
                    </p>
                    <p className="flex items-center gap-1">
                        <FaEye className="text-green-500" />
                        <span>{article.viewCount + 1} views</span>
                    </p>
                </div>

                <article className="text-lg leading-relaxed text-justify text-gray-800 space-y-6 bg-white rounded-xl p-6 shadow-md border">
                    <p>{article.description}</p>
                    <p>
                        Stay tuned for updates as this story develops. Our reporters are tracking this closely.
                    </p>
                </article>

                {/* Back Button */}
                <div className="mt-10">
                    <Link
                        to="/all-articles"
                        className="inline-flex items-center gap-2 text-green-600 hover:text-white border border-green-600 hover:bg-green-600 transition-all px-5 py-2 rounded-full font-medium shadow-sm"
                    >
                        <FaArrowLeft />
                        Back to All Articles
                    </Link>
                </div>
            </div>

            {/* Related Sidebar */}
            <aside className="space-y-6">
                <h2 className="text-2xl font-bold text-green-600">Related Articles</h2>
                {related.map(item => (
                    <Link
                        to={`/article/${item._id}`}
                        key={item._id}
                        className="flex gap-4 items-start bg-white rounded-xl border border-gray-100 hover:shadow-lg transition p-3"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex-1">
                            <h3 className="text-md font-semibold text-gray-800 mb-1 line-clamp-2">
                                {item.title}
                            </h3>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                <FaEye className="text-green-500" /> {item.viewCount} views
                            </p>
                        </div>
                    </Link>
                ))}
            </aside>
        </section>
    );
};

export default ArticleDetails;
