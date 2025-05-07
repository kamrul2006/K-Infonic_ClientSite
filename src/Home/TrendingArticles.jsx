import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const TrendingArticles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/News")
            .then(res => res.json())
            .then(data => {
                const sorted = [...data].sort((a, b) => b.viewCount - a.viewCount);
                setArticles(sorted.slice(0, 7)); // top 5 trending
            });
    }, []);

    return (
        <div className="bg-green-100 mt-5 rounded-2xl py-10 px-4 md:px-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-8">
                🔥 Trending Articles
            </h2>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {articles.map(article => (
                    <SwiperSlide key={article.id}>
                        <div className="bg-white  shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                            <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <span className="text-xs text-green-500 uppercase font-bold">{article.category}</span>

                                <h3 className="text-lg font-semibold mt-1 h-[55px]">{article.title}</h3>

                                <p className="text-sm text-gray-600 mt-2 h-[50px]">{article.description.slice(0, 50)}...</p>

                                <div className="mt-4 text-sm text-gray-500 flex justify-between">
                                    <span>{article.publisher}</span>
                                    <span>👁 {article.viewCount}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <button className="btn mt-5 mx-auto rounded-2xl bg-green-500 flex items-center justify-center">
                <Link to={'/all-articles'}>
                    See All Articles
                </Link>
            </button>
        </div>
    );
};

export default TrendingArticles;
