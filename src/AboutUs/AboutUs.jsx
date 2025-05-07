const teamMembers = [
    {
        name: "Ayesha Rahman",
        role: "Editor-in-Chief",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Tariq Hasan",
        role: "Senior Reporter",
        image: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    {
        name: "Jannat Islam",
        role: "Digital Strategist",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
];

const AboutUs = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 py-16 mt-4 rounded-t-4xl bg-gradient-to-b from-green-100 to-white">
            {/* Header */}
            <div className="text-center mb-14">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                    About  <span className="text-green-600">K-InfoNic</span>
                </h2>

                <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                    K-InfoNic is your go-to platform for reliable, unbiased, and real-time news. We combine technology and journalism to bring truth closer to you.
                </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-10 mb-20">
                <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-2xl shadow-md border">
                    <h2 className="text-2xl font-semibold text-green-600 mb-2">🎯 Our Mission</h2>
                    <p className="text-gray-700">
                        Deliver accurate and ethical journalism that informs the public, empowers communities, and protects democracy.
                    </p>
                </div>
                <div className="bg-gradient-to-r from-white to-green-50 p-6 rounded-2xl shadow-md border">
                    <h2 className="text-2xl font-semibold text-green-600 mb-2">🌟 Our Vision</h2>
                    <p className="text-gray-700">
                        To become the most trusted news platform that fosters transparency and innovation in storytelling.
                    </p>
                </div>
            </div>

            {/* Team Section */}
            <div className="mb-20 text-center">
                <h2 className="text-3xl font-semibold text-green-600 mb-10">👥 Meet Our Team</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center border border-gray-100 hover:shadow-xl transition"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-28 h-28 rounded-full object-cover mb-4 shadow"
                            />
                            <h3 className="font-bold text-xl text-gray-800">{member.name}</h3>
                            <p className="text-sm text-green-500">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quote */}
            <div className="text-center bg-green-100 border-l-8 border-green-500 rounded-xl py-10 px-6">
                <p className="text-2xl italic text-green-700 max-w-4xl mx-auto leading-relaxed">
                    “A free press can be good or bad, but, most certainly, without freedom, the press will never be anything but bad.”
                </p>
                <p className="mt-4 text-sm text-gray-700">– Albert Camus</p>
            </div>
        </section>
    );
};

export default AboutUs;
