import { FaBroadcastTower, FaBookOpen, FaGlobeAsia, FaPenNib, FaBullhorn, FaRegNewspaper } from 'react-icons/fa';
import CountUp from 'react-countup';

const publishers = [
    {
        id: 1,
        name: 'RedVision Media',
        articles: 3450,
        subscribers: 58000,
        icon: <FaBroadcastTower size={28} />,
    },
    {
        id: 2,
        name: 'Daily Insight',
        articles: 2980,
        subscribers: 42100,
        icon: <FaRegNewspaper size={28} />,
    },
    {
        id: 3,
        name: 'Global Chronicle',
        articles: 4100,
        subscribers: 67800,
        icon: <FaGlobeAsia size={28} />,
    },
    {
        id: 4,
        name: 'Echo Times',
        articles: 2750,
        subscribers: 30500,
        icon: <FaPenNib size={28} />,
    },
    {
        id: 5,
        name: 'BuzzWire News',
        articles: 3600,
        subscribers: 54000,
        icon: <FaBullhorn size={28} />,
    },
    {
        id: 6,
        name: 'Focus Digest',
        articles: 3120,
        subscribers: 46000,
        icon: <FaBookOpen size={28} />,
    },
];

const AllPublishers = () => {
    return (
        <section className="bg-gradient-to-b from-red-400 via-white to-red-400 text-white py-16 px-4 rounded-2xl mt-5">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-5xl font-extrabold mb-4 tracking-wide text-white drop-shadow-md">
                    Our <span className="text-red-500 bg-white px-2 rounded-2xl">Top Publishers</span>
                </h2>
                <p className="text-red-500 mb-12 text-lg max-w-2xl mx-auto">
                    Providing trusted and verified articles across multiple categories — real voices, real news.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {publishers.map(pub => (
                        <div
                            key={pub.id}
                            className="p-6 bg-red-950/60 backdrop-blur-md border border-red-700 rounded-2xl shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] transition-transform hover:-translate-y-2 duration-300"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-red-600 text-white rounded-full shadow-lg">
                                    {pub.icon}
                                </div>
                                <h3 className="text-xl font-bold tracking-wide">{pub.name}</h3>
                            </div>
                            <div className="text-left pl-2 text-red-200">
                                <p className="mb-1 text-sm">
                                    Articles: <span className="font-semibold text-white">
                                        <CountUp end={pub.articles} duration={2} />
                                    </span>
                                </p>
                                <p className="text-sm">
                                    Subscribers: <span className="font-semibold text-white">
                                        <CountUp end={pub.subscribers} duration={2} />
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllPublishers;
