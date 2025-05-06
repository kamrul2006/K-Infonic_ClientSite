import { Link } from "react-router-dom";
import { FaCheck, FaTimes, FaCrown } from "react-icons/fa";

const plans = [
    {
        id: "free",
        name: "Free",
        price: "0",
        period: "/mo",
        accent: "border-gray-300",
        btnStyle: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        features: [
            { label: "Read general articles", included: true },
            { label: "Limited daily reads", included: true },
            { label: "Comment on articles", included: false },
            { label: "Ad‑free experience", included: false },
            { label: "Access premium content", included: false },
        ],
    },
    {
        id: "premium",
        name: "Premium",
        price: "6.99",
        period: "/mo",
        accent: "border-green-600 shadow-[0_0_20px_rgba(220,38,38,0.5)]",
        btnStyle:
            "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl",
        features: [
            { label: "Read ALL articles (premium + general)", included: true },
            { label: "Unlimited daily reads", included: true },
            { label: "Comment & react on posts", included: true },
            { label: "100 % ad‑free experience", included: true },
            { label: "Early‑access newsletters", included: true },
        ],
    },
];

const Plans = () => {
    return (
        <section className="bg-gradient-to-b from-green-100 to-white py-16 px-4 mt-5 rounded-2xl ">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Choose Your <span className="text-green-600">Plan</span>
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto mb-12">
                    Enjoy the essentials for free or unlock every feature with Premium.
                </p>

                <div className="grid gap-8 sm:grid-cols-2">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative rounded-2xl border ${plan.accent} bg-white p-8 transition-transform hover:-translate-y-2`}
                        >
                            {plan.id === "premium" && (
                                <FaCrown className="absolute -top-5 right-6 text-green-600 text-3xl" />
                            )}

                            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                            <div className="text-4xl font-extrabold mb-6">
                                {plan.price === "0" ? (
                                    "Free"
                                ) : (
                                    <>
                                        ${plan.price}
                                        <span className="text-lg font-medium text-gray-500">
                                            {plan.period}
                                        </span>
                                    </>
                                )}
                            </div>

                            <ul className="space-y-3 text-left mb-8">
                                {plan.features.map((f) => (
                                    <li key={f.label} className="flex items-center gap-3">
                                        {f.included ? (
                                            <FaCheck className="text-green-500" />
                                        ) : (
                                            <FaTimes className="text-gray-400" />
                                        )}
                                        <span
                                            className={`${f.included ? "text-gray-800" : "text-gray-400 line-through"
                                                }`}
                                        >
                                            {f.label}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to="/subscription"
                                className={`inline-block w-full text-center rounded-full py-3 font-semibold transition ${plan.btnStyle}`}
                            >
                                {plan.id === "free" ? "Stay Free" : "Go Premium"}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Plans;
