import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/Providers/AuthProvider";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyArticles = () => {
    const { user } = useContext(AuthContext);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch("http://localhost:5000/News")
                .then((res) => res.json())
                .then((data) => {
                    const userArticles = data.filter(
                        (article) => article.AddedBy === user.email
                    );
                    setArticles(userArticles);
                });
        }
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won’t be able to recover this article!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            background: "#fefefe",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:5000/news/${id}`)
                    .then(() => {
                        setArticles((prev) => prev.filter((a) => a._id !== id));
                        Swal.fire("Deleted!", "Your article has been deleted.", "success");
                    })
                    .catch(() => {
                        Swal.fire("Error!", "Something went wrong.", "error");
                    });
            }
        });
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-10">


            <h2 className="text-4xl font-serif md:text-5xl font-extrabold mb-4 text-center drop-shadow-md">
                My <span className="text-green-600">Articles</span>
            </h2>

            {articles.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">
                    You haven’t posted any articles yet.
                </p>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <div
                            key={article._id}
                            className="bg-white shadow-lg rounded-2xl overflow-hidden border hover:shadow-2xl transition-all duration-300"
                        >
                            <img
                                src={article.image || "https://via.placeholder.com/400x200"}
                                alt={article.title}
                                className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300"
                            />
                            <div className="p-6 space-y-2">
                                <Link to={`/article/${article._id}`}>
                                    <h3 className="text-xl font-semibold text-green-600 hover:underline line-clamp-2 transition">
                                        {article.title}
                                    </h3>
                                </Link>
                                <p className="text-gray-600 text-sm line-clamp-3">
                                    {article.description}
                                </p>
                                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                                    <span>{article.date ? new Date(article.date).toLocaleDateString() : "10 / 10 / 10"}</span>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${article.status === "approved"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {article.status}
                                    </span>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="text-red-500 hover:text-red-700 text-lg"
                                        onClick={() => handleDelete(article._id)}
                                        title="Delete Article"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default MyArticles;
