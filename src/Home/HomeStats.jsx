import { FaUsers, FaGlobe, FaNewspaper, FaBolt } from 'react-icons/fa';
import CountUp from 'react-countup';
import { Slide } from 'react-awesome-reveal';

const stats = [
    {
        id: 1,
        icon: <FaUsers size={28} />,
        title: 'Active Users',
        value: 35200,
        suffix: '+',
        color: 'from-green-500 to-green-700',
    },
    {
        id: 2,
        icon: <FaNewspaper size={28} />,
        title: 'Articles Published',
        value: 1150,
        suffix: '+',
        color: 'from-green-400 to-green-600',
    },
    {
        id: 3,
        icon: <FaGlobe size={28} />,
        title: 'Global Reach',
        value: 75,
        suffix: '+ Countries',
        color: 'from-green-500 to-green-800',
    },
    {
        id: 4,
        icon: <FaBolt size={28} />,
        title: 'Premium Members',
        value: 12000,
        suffix: '+',
        color: 'from-green-300 to-green-500',
    },
];

const HomeStats = () => {
    return (
        <section className="bg-gradient-to-b from-green-950 via-green-900 to-green-800 py-16 px-4 md:rounded-2xl md:mt-5">
            <div className="max-w-7xl mx-auto text-center text-white">
                <h2 className="text-4xl font-serif md:text-5xl font-extrabold mb-4 drop-shadow-md">
                    Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-green-500">Statistics</span>
                </h2>
                <p className="text-green-200 mb-12 max-w-xl mx-auto text-lg">
                    See how we’re growing and connecting readers around the world.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map(stat => (
                        <Slide>
                            <div
                                key={stat.id}
                                className={`p-6 rounded-2xl shadow-lg bg-gradient-to-br ${stat.color} text-white transform hover:scale-105 transition-all duration-300`}
                            >
                                <div className="flex items-center justify-center mb-4">
                                    {stat.icon}
                                </div>
                                <h3 className="text-3xl font-bold mb-1">
                                    <CountUp end={stat.value} duration={2} separator="," /> {stat.suffix}
                                </h3>
                                <p className="text-sm font-medium">{stat.title}</p>
                            </div>
                        </Slide>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeStats;
