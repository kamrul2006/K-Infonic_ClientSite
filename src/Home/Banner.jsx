import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const BannerSlider = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch("https://k-info-nic-server.vercel.app/News")
            .then((res) => res.json())
            .then((data) => {
                const approvedArticles = data
                    .filter((item) => item.status === "approved")
                    .sort((a, b) => b.id - a.id)
                    .slice(0, 4);
                setArticles(approvedArticles);
            })
            .catch((error) => console.error("Error fetching news:", error));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1200,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: false,
    };

    return (
        <div className="relative mx-auto h-[450px] lg:h-[550px] p-2 rounded-3xl overflow-hidden">
            <Slider {...settings}>
                {articles.map((article) => (
                    <div key={article._id}>
                        <div
                            className="relative h-[450px] lg:h-[550px] bg-cover bg-center rounded-3xl flex items-center justify-center px-6 md:px-12"
                            style={{
                                backgroundImage: `url(${article.image})`,
                                backgroundSize: "cover",
                            }}
                        >
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/70 rounded-3xl" />

                            {/* Content */}
                            <div className="relative z-10 text-center text-white space-y-6 max-w-3xl animate-fade-in-up">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight drop-shadow-lg leading-tight font-serif">
                                    {article.title}
                                </h2>
                                <p className="md:text-xl h-[50px] overflow-hidden font-medium text-gray-200 opacity-95 md:mb-10">
                                    {article.description}
                                </p>
                                <Link
                                    to="/all-articles"
                                    className="mt- md:mt-10 px-4 md:px-8 md:py-3 py-1 rounded-full text-white bg-green-700 font-semibold shadow-xl hover:bg-green-100 hover:text-green-800 hover:scale-105 transition-all duration-300"
                                >
                                    Explore News
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default BannerSlider;
