import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { AuthContext } from '../Auth/Providers/AuthProvider';
import axios from 'axios';

const AllArticles = () => {
    const { user } = useContext(AuthContext);
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [publisherFilter, setPublisherFilter] = useState('');
    const [tagFilter, setTagFilter] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        fetch('https://k-info-nic-server.vercel.app/News')
            .then(res => res.json())
            .then(data => {
                const approved = data.filter(article => article.status === 'approved');
                setArticles(approved);
                setFilteredArticles(approved);
            });
    }, []);

    useEffect(() => {
        if (user?.email) {
            axios.get("https://k-info-nic-server.vercel.app/Users")
                .then(res => {
                    const found = res.data.find(item => item.email === user.email);
                    setIsSubscribed(found?.isSubscribed);
                })
                .catch(err => console.error(err));
        }
    }, [user]);

    useEffect(() => {
        let filtered = articles;

        if (searchTerm) {
            filtered = filtered.filter(article =>
                article.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (publisherFilter) {
            filtered = filtered.filter(article => article.publisher === publisherFilter);
        }

        if (tagFilter) {
            filtered = filtered.filter(article =>
                article.tags?.includes(tagFilter)
            );
        }

        setFilteredArticles(filtered);
    }, [searchTerm, publisherFilter, tagFilter, articles]);

    const uniquePublishers = [...new Set(articles.map(a => a.publisher))];
    const allTags = [...new Set(articles.flatMap(a => a.tags || []))];

    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            <div className="bg-green-50 pt-5 pb-2 rounded-2xl mb-5">
                <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-extrabold my-8">
                    Explore <span className="bg-green-700 text-white px-2 rounded-2xl">All Articles</span>
                </h2>

                <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center mb-5">
                    <div className="flex items-center bg-white border rounded-full px-4 py-2 shadow-md w-full sm:w-auto">
                        <FaSearch className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="outline-none w-full text-sm"
                        />
                    </div>

                    <select
                        className="border rounded-full px-10 py-2 text-sm w-full sm:w-auto"
                        value={publisherFilter}
                        onChange={e => setPublisherFilter(e.target.value)}
                    >
                        <option value="">All Publishers</option>
                        {uniquePublishers.map(pub => (
                            <option key={pub} value={pub}>{pub}</option>
                        ))}
                    </select>

                    <select
                        className="border rounded-full px-10 py-2 text-sm w-full sm:w-auto"
                        value={tagFilter}
                        onChange={e => setTagFilter(e.target.value)}
                    >
                        <option value="">All Tags</option>
                        {allTags.map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredArticles.map(article => {
                    const isPremium = article.type === 'premium';
                    const isAccessible = !isPremium || isSubscribed;

                    return (
                        <div
                            key={article._id}
                            className={`rounded-3xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 border ${isPremium
                                ? 'bg-gradient-to-br from-green-50 via-white to-green-100 border-green-500'
                                : 'bg-white border-gray-200'
                                }`}
                        >
                            <img
                                src={article.image}
                                alt={article.title}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-5 space-y-3">
                                <h3 className="text-lg font-bold leading-tight text-green-800 line-clamp-2 min-h-[52px]">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-gray-600">By {article.publisher}</p>
                                <p className="text-sm text-gray-700 line-clamp-3 min-h-[60px]">
                                    {article.description}
                                </p>

                                <Link
                                    to={isAccessible ? `/article/${article._id}` : "#"}
                                    className={`block mt-3 px-4 py-2 rounded-full text-center text-sm font-semibold transition duration-300 ${isAccessible
                                        ? 'bg-green-600 text-white hover:bg-green-700'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    onClick={e => {
                                        if (!isAccessible) e.preventDefault();
                                    }}
                                >
                                    {isAccessible ? "Details" : "Premium"}
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredArticles.length === 0 && (
                <p className="text-center text-gray-500 mt-6">No articles found.</p>
            )}
        </section>
    );
};

export default AllArticles;
