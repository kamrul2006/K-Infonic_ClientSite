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
                const filtegreen = allArticles.data
                    .filter(a => a.category === data.category && a.id !== data.id)
                    .slice(0, 3);
                setRelated(filtegreen);
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
        <section className="max-w-5xl mx-auto px-4 py-12">
            {/* Main article */}
            <div className="relative mb-6">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-72 md:h-96 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-md text-sm shadow-md">
                    {article.category}
                </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 leading-snug mb-4">{article.title}</h1>

            <div className="flex flex-wrap justify-between items-center text-sm text-gray-500 mb-6">
                <p>
                    Publisher: <span className="text-green-600 font-semibold">{article.publisher}</span>
                </p>
                <p className="flex items-center gap-1">
                    <FaEye className="text-green-500" />
                    <span>{article.viewCount + 1} views</span>
                </p>
            </div>

            <article className="text-lg leading-relaxed text-justify text-gray-800 space-y-5">
                <p>{article.description}</p>
                <p>
                    Stay tuned for updates as this story develops. Our reporters are tracking this closely.
                </p>
            </article>

            {/* Back button */}
            <div className="mt-12 mb-10">
                <Link
                    to="/all-articles"
                    className="inline-flex items-center gap-2 text-green-600 hover:text-white border border-green-600 hover:bg-green-600 transition-all px-5 py-2 rounded-full font-medium shadow-sm"
                >
                    <FaArrowLeft />
                    Back to All Articles
                </Link>
            </div>

            {/* Related Articles */}
            {related.length > 0 && (
                <div className="mt-14">
                    <h2 className="text-2xl font-bold text-green-600 mb-6">Related Articles</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {related.map(item => (
                            <Link
                                to={`/article/${item.id}`}
                                key={item.id}
                                className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 border border-gray-100"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-40 w-full object-cover rounded-md mb-4"
                                />
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <FaEye className="text-green-500" /> {item.viewCount} views
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default ArticleDetails;
