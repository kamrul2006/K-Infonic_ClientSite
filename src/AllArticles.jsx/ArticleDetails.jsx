import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaEye } from "react-icons/fa";

const ArticleDetails = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchAndUpdate = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/News/${id}`);
                setArticle(data);

                await axios.put(`http://localhost:5000/News/views/${id}`, {
                    viewCount: data.viewCount + 1,
                });
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
            {/* Image banner */}
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

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 leading-snug mb-4">
                {article.title}
            </h1>

            {/* Publisher and meta info */}
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

            {/* Description */}
            <article className="text-lg leading-relaxed text-justify text-gray-800 space-y-5">
                <p>{article.description}</p>
                {/* Add more dummy or dynamic content here if needed */}
                <p>
                    Stay tuned for updates as this story develops. Our reporters are
                    tracking this closely.
                </p>
            </article>

            {/* Back button */}
            <div className="mt-12">
                <Link
                    to="/all-articles"
                    className="inline-flex items-center gap-2 text-green-600 hover:text-white border border-green-600 hover:bg-green-600 transition-all px-5 py-2 rounded-full font-medium shadow-sm"
                >
                    <FaArrowLeft />
                    Back to All Articles
                </Link>
            </div>
        </section>
    );
};

export default ArticleDetails;
