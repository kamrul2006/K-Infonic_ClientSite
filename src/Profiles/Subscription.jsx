import { useContext, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../Auth/Providers/AuthProvider";

const Subscription = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axios.get("https://k-info-nic-server.vercel.app/Users")
                .then(res => {
                    const matchedUser = res.data.find(item => item.email === user.email);
                    setProfile(matchedUser);
                });
        }
    }, [user]);

    const handleSubscribe = () => {
        Swal.fire({
            title: "Subscribe to Pro Plan?",
            text: "You’ll be charged $19.99/month",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Pay Now",
            confirmButtonColor: "#10b981",
        }).then(result => {
            if (result.isConfirmed) {
                axios.patch(`https://k-info-nic-server.vercel.app/Users/${profile._id}`, { isSubscribed: true })
                    .then(() => {
                        Swal.fire("Success!", "You are now a Pro subscriber!", "success");
                        setProfile(prev => ({ ...prev, isSubscribed: true }));
                    })
                    .catch(() => {
                        Swal.fire("Error", "Subscription failed. Try again.", "error");
                    });
            }
        });
    };

    if (!profile) return null;

    if (profile.isSubscribed) {
        return (
            <section className="max-w-4xl mx-auto px-4 py-20">
                <div className="bg-green-100 border border-green-300 rounded-3xl p-8 text-center shadow-xl">
                    <h2 className="text-3xl font-bold text-green-700 mb-4">🎉 You’re a Pro Member!</h2>
                    <p className="text-green-800 mb-6">
                        Thanks for subscribing! Enjoy unlimited features, analytics, and early access to tools.
                    </p>
                    <div className="inline-block px-6 py-2 bg-green-600 text-white rounded-full font-semibold shadow hover:bg-green-700 transition">
                        Active Subscription
                    </div>
                </div>
            </section>
        );
    }

    const plans = [
        {
            name: "Free",
            price: "$0",
            features: ["Read public articles", "Submit reviews", "Basic profile"],
            color: "border-gray-300 text-gray-700 bg-white",
        },
        {
            name: "Pro",
            price: "$19.99/mo",
            features: [
                "All Free features",
                "Post articles",
                "Priority support",
                "Analytics & early tools"
            ],
            color: "border-green-500 text-green-800 bg-green-50",
        },
    ];

    return (
        <section className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold text-center mb-10 text-green-700">Choose Your Plan</h2>

            <div className="grid gap-8 sm:grid-cols-2">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`rounded-2xl border p-8 shadow-lg hover:shadow-xl transition-all ${plan.color}`}
                    >
                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                        <p className="text-3xl font-extrabold mb-4">{plan.price}</p>
                        <ul className="space-y-2 mb-6">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm">
                                    <FaCheckCircle className="text-green-600" /> {feature}
                                </li>
                            ))}
                        </ul>
                        <button
                            disabled={plan.name === "Free"}
                            onClick={handleSubscribe}
                            className={`w-full py-2 px-4 rounded-lg font-semibold transition ${plan.name === "Free"
                                ? "bg-gray-200 text-gray-800 cursor-not-allowed"
                                : "bg-green-600 text-white hover:bg-green-700"
                                }`}
                        >
                            {plan.name === "Free" ? "Current Plan" : "Subscribe Now"}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Subscription;
