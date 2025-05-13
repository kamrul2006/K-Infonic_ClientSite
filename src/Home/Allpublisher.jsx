import { FaBroadcastTower, FaBookOpen, FaGlobeAsia, FaPenNib, FaBullhorn, FaRegNewspaper } from 'react-icons/fa';
import CountUp from 'react-countup';
import { Zoom } from 'react-awesome-reveal';

const publishers = [
    {
        id: 1,
        name: 'greenVision Media',
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
        <section className="bg-gradient-to-b from-green-100 to-white text-white py-16 px-4 rounded-2xl mt-5">

            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl text-center md:text-5xl font-serif font-extrabold mb-4 text-black lg:mb-6">
                    Our <span className="text-green-600">Top Publishers</span>
                </h2>


                <p className="text-green-500 mb-12 text-lg max-w-2xl mx-auto">
                    Providing trusted and verified articles across multiple categories — real voices, real news.
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {publishers.map(pub => (
                        <Zoom>
                            <div
                                key={pub.id}
                                className="p-6 bg-green-950/60 backdrop-blur-md border border-green-700 rounded-2xl shadow  transition-transform hover:-translate-y-2 duration-300"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-green-600 text-white rounded-full shadow-lg">
                                        {pub.icon}
                                    </div>
                                    <h3 className="text-xl font-bold tracking-wide">{pub.name}</h3>
                                </div>
                                <div className="text-left pl-2 text-green-200">
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
                        </Zoom>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AllPublishers;
