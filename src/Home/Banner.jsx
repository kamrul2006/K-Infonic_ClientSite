import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

// Banner content
const banners = [
    {
        title: "Stay Informed, Stay Ahead",
        subtitle: "Get the latest news tailogreen just for you.",
    },
    {
        title: "Your Voice. Your News.",
        subtitle: "Write, share, and read trusted articles.",
    },
    {
        title: "K-Infonic: Digital News greenefined",
        subtitle: "Where verified truth meets modern technology.",
    },
];

const BannerSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1200,
        autoplaySpeed: 6000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: false,
    };

    return (
        <div
            className="relative w-7xl mx-auto mt-2 md:mt-10 rounded-4xl h-screen bg-cover bg-center  p-2"
            style={{
                backgroundImage:
                    "url('https://img.freepik.com/free-photo/top-view-newspaper-pieces-assortment_23-2149318830.jpg')",
            }}
        >
            {/* Dark green gradient overlay */}
            <div className="absolute inset-0 backdrop-blur-md bg-black/50 rounded-4xl " />


            <div className="text-center rounded-4xl">
                {/* Slider content */}
                <Slider {...settings}>
                    {banners.map((slide, idx) => (
                        <div>
                            <div
                                key={idx}
                                className="relative z-20 h-[90vh] flex items-center justify-center px-6 md:px-12"
                            >

                                <div className="text-center text-white space-y-6 max-w-3xl animate-fade-in-up">
                                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg leading-tight font-serif">
                                        {slide.title}
                                    </h2>

                                    <p className="text-lg md:text-xl font-medium text-gray-200 opacity-95 md:mb-10">
                                        {slide.subtitle}
                                    </p>

                                    <Link to={"/all-articles"} className="mt-5 md:mt-10 px-8 py-3 rounded-full bg-white text-green-700 font-semibold shadow-xl hover:bg-green-100 hover:scale-105 transition-all duration-300">
                                        Explore News
                                    </Link>
                                </div>
                            </div>
                        </div>

                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default BannerSlider;
