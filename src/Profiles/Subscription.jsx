import { FaCheckCircle } from "react-icons/fa";

const plans = [
    {
        name: "Free",
        price: "$0",
        features: ["Read public articles", "Submit reviews", "Basic profile"],
        color: "border-gray-300 text-gray-700 bg-white",
    },
    {
        name: "Premium",
        price: "$9.99/mo",
        features: ["All Free features", "Post articles", "Priority support"],
        color: "border-yellow-400 text-yellow-800 bg-yellow-50",
    },
    {
        name: "Pro",
        price: "$19.99/mo",
        features: [
            "All Premium features",
            "Article analytics",
            "Team management",
            "Early access to new tools",
        ],
        color: "border-green-500 text-green-800 bg-green-50",
    },
];

const Subscription = () => {
    return (
        <section className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold text-center mb-10 text-green-700">
                Choose Your Plan
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                            className={`w-full py-2 px-4 rounded-lg font-semibold transition ${plan.name === "Free"
                                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                    : plan.name === "Premium"
                                        ? "bg-yellow-400 text-white hover:bg-yellow-500"
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
