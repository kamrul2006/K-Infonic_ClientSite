import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AllArticles = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [publisherFilter, setPublisherFilter] = useState('');
    const [tagFilter, setTagFilter] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/News')
            .then(res => res.json())
            .then(data => {
                // const approved = data.filter(article => article.status === 'approved');
                const approved = data;
                setArticles(approved);
                setFilteredArticles(approved);
            });
    }, []);

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
            {/* Stylish Responsive Heading */}
            <h2 className="text-center text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600 text-transparent bg-clip-text drop-shadow-lg animate-gradient">
                Explore Approved Articles
                <div className="w-24 h-1 bg-green-500 mx-auto mt-3 rounded-full" />
            </h2>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center mb-10">
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

            {/* Articles Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map(article => {
                    const isPremium = article.type === 'premium';

                    return (
                        <div
                            key={article._id}
                            className={`rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 shadow-lg border ${isPremium
                                ? 'bg-gradient-to-tr from-black via-green-900 to-black text-white border-green-600 '
                                : 'bg-white text-gray-800 border-green-200'
                                }`}
                        >
                            <img
                                src={article.image}
                                alt={article.title}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-4 space-y-2">
                                <h3 className={`text-xl font-bold leading-snug ${isPremium ? 'text-green-400' : 'text-gray-800'}`}>
                                    {article.title}
                                </h3>
                                <p className={`text-sm ${isPremium ? 'text-green-200' : 'text-gray-600'}`}>
                                    By {article.publisher}
                                </p>
                                <p className={`line-clamp-3 text-sm ${isPremium ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {article.description}
                                </p>


                                <Link
                                    to={`/article/${article._id}`}
                                    className={`inline-block mt-3 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isPremium
                                        ? 'bg-white text-green-700 hover:bg-green-100 btn btn-disabled'
                                        : 'bg-green-600 text-white hover:bg-green-700'
                                        }`}
                                >
                                    Details
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
