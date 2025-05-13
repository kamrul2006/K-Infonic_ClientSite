import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../Auth/Providers/AuthProvider";
import Marquee from "react-fast-marquee";

const ReaderReview = () => {
    const { user } = useContext(AuthContext);

    const [reviews, setReviews] = useState([]);
    const [reviewInput, setReviewInput] = useState({
        name: "",
        comment: "",
        rating: 0,
    });

    useEffect(() => {
        axios
            .get("https://k-info-nic-server.vercel.app/reviews")
            .then((res) => setReviews(res.data))
            .catch((err) => console.error("Error loading reviews:", err));
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
            Swal.fire("Oops!", "All fields including rating are required.", "warning");
            return;
        }

        try {
            await axios.post("https://k-info-nic-server.vercel.app/reviews", {
                ...reviewInput,
                date: new Date().toISOString(),
                reviewBy: user.email,
            });

            Swal.fire("Thank You!", "Your review has been submitted.", "success");

            setReviewInput({ name: "", comment: "", rating: 0 });

            const { data } = await axios.get("https://k-info-nic-server.vercel.app/reviews");
            setReviews(data);
        } catch (err) {
            Swal.fire("Error", "Failed to submit review.", "error");
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-4 py-12 bg-gradient-to-b from-green-100 to-white">
            <h2 className="text-4xl font-serif text-center md:text-5xl font-extrabold mb-8">
                Reader <span className="text-green-600">Reviews</span>
            </h2>

            {/* Review Form */}
            <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-white p-6 rounded-xl shadow-lg border border-green-100 mb-14 max-w-3xl mx-auto"
            >
                <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={reviewInput.name}
                    onChange={(e) => setReviewInput({ ...reviewInput, name: e.target.value })}
                />

                <textarea
                    rows="4"
                    placeholder="Your Comment"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={reviewInput.comment}
                    onChange={(e) => setReviewInput({ ...reviewInput, comment: e.target.value })}
                ></textarea>

                <div className="flex items-center space-x-2">
                    <label className="text-gray-700 font-medium">Rating:</label>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            type="button"
                            key={star}
                            onClick={() => handleRatingChange(star)}
                            className={`text-2xl transition ${reviewInput.rating >= star ? "text-yellow-400" : "text-gray-300"
                                }`}
                        >
                            ★
                        </button>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition font-semibold"
                >
                    Submit Review
                </button>
            </form>

            {/* Review Marquee */}
            <div className="mb-6">
                {reviews.length === 0 ? (
                    <p className="text-center text-gray-500">No reviews yet. Be the first!</p>
                ) : (
                    <Marquee pauseOnHover speed={50} gradient={false}>
                        {reviews.map((review, idx) => (
                            <div
                                key={idx}
                                className="bg-white border border-green-100 shadow-md rounded-xl p-5 m-3 min-w-[300px] max-w-xs flex-shrink-0"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold text-green-600 text-lg">{review.name}</h3>
                                    <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                                </div>
                                <p className="italic text-gray-700 mb-3">"{review.comment}"</p>
                                <div className="text-yellow-400">
                                    {Array.from({ length: review.rating }, (_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                    {Array.from({ length: 5 - review.rating }, (_, i) => (
                                        <span key={i}>☆</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </Marquee>
                )}
            </div>
        </section>
    );
};

export default ReaderReview;
