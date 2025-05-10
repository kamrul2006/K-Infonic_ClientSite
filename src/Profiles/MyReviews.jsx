import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/Providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import gif from "../assets/nodata.gif"


const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axios.get("http://localhost:5000/Reviews")
                .then(res => {
                    const userReviews = res.data.filter(review => review.reviewBy === user.email);
                    setReviews(userReviews);
                })
                .catch(err => console.error("Failed to load reviews:", err));
        }
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This review will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/Reviews/${id}`)
                    .then(() => {
                        setReviews(prev => prev.filter(review => review._id !== id));
                        Swal.fire("Deleted!", "Your review has been deleted.", "success");
                    })
                    .catch(() => {
                        Swal.fire("Error!", "Something went wrong.", "error");
                    });
            }
        });
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">

                <h2 className="text-4xl font-serif md:text-5xl font-extrabold mb-4 text-center drop-shadow-md lg:mb-6">
                    My <span className="text-green-600">Reviews</span>
                </h2>

                <p className="text-gray-500 mt-2">Here are all your personal thoughts and ratings</p>
            </div>

            {reviews.length === 0 ? (
                <div>
                    <p className="text-center text-gray-500 text-lg">You haven’t written any reviews yet.</p>
                    <img src={gif} alt="No data Found" className="mx-auto w-1/3 rounded-4xl" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg rounded-3xl p-6 flex flex-col justify-between hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold">
                                    {review.rating}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{review.title}</h3>
                                    <span className="text-xs text-gray-400">
                                        {new Date(review.date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm flex-1 line-clamp-4">{review.comment}</p>

                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={() => handleDelete(review._id)}
                                    className="text-red-500 hover:text-red-700 transition"
                                    title="Delete Review"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default MyReviews;
