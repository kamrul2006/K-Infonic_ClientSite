import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrashAlt, FaGem, FaCheck, FaUndo } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllArticlesAdmin = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const res = await axios.get("https://k-info-nic-server.vercel.app/News");
            setArticles(res.data);
        } catch (err) {
            console.error("Failed to fetch articles", err);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You are deleting this article!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`https://k-info-nic-server.vercel.app/News/${id}`);
                Swal.fire("Deleted!", "Article has been deleted.", "success");
                fetchArticles();
            } catch (err) {
                Swal.fire("Error", "Failed to delete article", "error");
            }
        }
    };

    const handleMakePremium = async (id) => {
        try {
            const res = await axios.patch(`https://k-info-nic-server.vercel.app/News/premium/${id}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "Article marked as Premium!", "success");
                fetchArticles();
            }
        } catch (err) {
            Swal.fire("Error", "Could not make premium", "error");
        }
    };

    const handleMakeGeneral = async (id) => {
        try {
            const res = await axios.patch(`https://k-info-nic-server.vercel.app/News/general/${id}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "Article is now General!", "success");
                fetchArticles();
            }
        } catch (err) {
            Swal.fire("Error", "Could not make general", "error");
        }
    };

    const handleApprove = async (id) => {
        try {
            const res = await axios.patch(`https://k-info-nic-server.vercel.app/News/approve/${id}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "Article approved!", "success");
                fetchArticles();
            }
        } catch (err) {
            Swal.fire("Error", "Could not approve article", "error");
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-4xl font-extrabold text-green-700 mb-8 tracking-tight font-serif">  <span className="text-black">Manage</span> All Articles</h2>

            <div className="overflow-x-auto bg-white border rounded-xl shadow-lg transition duration-300 ease-in-out">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-gradient-to-r from-green-100 via-white to-green-100 text-green-800 uppercase text-sm font-semibold tracking-wide">
                        <tr>
                            <th className="px-6 py-4">#</th>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Publisher</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 font-medium">
                        {articles.map((article, index) => (
                            <tr
                                key={article._id}
                                className="border-t hover:bg-green-50 transition duration-300"
                            >
                                <td className="px-6 py-4">{index + 1}</td>

                                <td className="px-6 py-4 text-blue-600 font-semibold hover:underline">
                                    <Link to={`/article/${article._id}`}>
                                        {article.title}
                                    </Link>
                                </td>

                                <td className="px-6 py-4">{article.publisher || "N/A"}</td>

                                <td className="px-6 py-4 space-x-2">
                                    {article.status === "pending" ? (
                                        <span className="bg-yellow-200 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                            Pending
                                        </span>
                                    ) : (
                                        <span className="bg-green-200 text-green-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                            Approved
                                        </span>
                                    )}
                                    {article.isPremium && (
                                        <span className="bg-gradient-to-r from-purple-300 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                            Premium
                                        </span>
                                    )}
                                </td>

                                <td className="px-6 py-4 flex flex-wrap gap-2 items-center">
                                    {article.status === "pending" && (
                                        <button
                                            onClick={() => handleApprove(article._id)}
                                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md transition"
                                            title="Approve Article"
                                        >
                                            <FaCheck />
                                        </button>
                                    )}

                                    {article.status === "approved" && (
                                        article.type === "premium" ? (
                                            <button
                                                onClick={() => handleMakeGeneral(article._id)}
                                                className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full shadow-md transition"
                                                title="Make General"
                                            >
                                                <FaUndo />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleMakePremium(article._id)}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full shadow-md transition"
                                                title="Make Premium"
                                            >
                                                <FaGem />
                                            </button>
                                        )
                                    )}

                                    <button
                                        onClick={() => handleDelete(article._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition"
                                        title="Delete Article"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AllArticlesAdmin;
