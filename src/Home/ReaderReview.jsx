import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const ReaderReview = () => {
    const [reviews, setReviews] = useState([]);
    const [reviewInput, setReviewInput] = useState({
        name: "",
        comment: "",
        rating: 0,
    });

    // Fetch reviews on mount
    useEffect(() => {
        axios.get("http://localhost:5000/reviews")
            .then(res => setReviews(res.data))
            .catch(err => console.error("Error loading reviews:", err));
    }, []);

    const handleRatingChange = (rating) => {
        setReviewInput({ ...reviewInput, rating });
    };

    const formatDate = (isoString) => {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(isoString).toLocaleDateString(undefined, options);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, comment, rating } = reviewInput;

        if (!name || !comment || rating < 1) {
            Swal.fire("Oops!", "All fields including rating are requigreen.", "warning");
            return;
        }

        try {
            await axios.post("http://localhost:5000/reviews", {
                ...reviewInput,
                date: new Date().toISOString(),
            });
            Swal.fire("Thank You!", "Your review has been submitted.", "success");

            setReviewInput({ name: "", comment: "", rating: 0 });
            const { data } = await axios.get("http://localhost:5000/reviews");
            setReviews(data);
        } catch (err) {
            Swal.fire("Error", "Failed to submit review.", "error");
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-12 bg-gradient-to-b from-green-100 to-white">
            <h2 className="text-4xl text-center md:text-5xl font-extrabold mb-4 lg:mb-6">
                Reader <span className="text-green-600">Reviews</span>
            </h2>

            {/* Review Form */}
            <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl shadow-lg border border-green-100 mb-10">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 border rounded-lg"
                    value={reviewInput.name}
                    onChange={(e) => setReviewInput({ ...reviewInput, name: e.target.value })}
                />
                <textarea
                    rows="4"
                    placeholder="Your Comment"
                    className="w-full p-3 border rounded-lg"
                    value={reviewInput.comment}
                    onChange={(e) => setReviewInput({ ...reviewInput, comment: e.target.value })}
                ></textarea>

                {/* Star Rating */}
                <div className="flex items-center space-x-2">
                    <label className="text-gray-700 font-medium">Rating:</label>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            type="button"
                            key={star}
                            onClick={() => handleRatingChange(star)}
                            className={`text-2xl ${reviewInput.rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                        >
                            ★
                        </button>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
                >
                    Submit Review
                </button>
            </form>

            {/* Display Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.length === 0 ? (
                    <p className="text-center text-gray-500 col-span-full">No reviews yet. Be the first!</p>
                ) : (
                    reviews.map((review, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow border border-green-100 p-5 space-y-3">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-lg text-green-600">{review.name}</h3>
                                <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                            </div>
                            <p className="italic text-gray-700">"{review.comment}"</p>
                            <div className="text-yellow-400">
                                {Array.from({ length: review.rating }, (_, i) => (
                                    <span key={i}>★</span>
                                ))}
                                {Array.from({ length: 5 - review.rating }, (_, i) => (
                                    <span key={i}>☆</span>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default ReaderReview;
