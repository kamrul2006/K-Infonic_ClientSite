import { ImNewspaper } from "react-icons/im";

const KInfonicLoader = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-white dark:bg-black">
            <div className="flex flex-col items-center justify-center space-y-6">
                {/* Spinning ring */}
                <div className="w-20 h-20 border-4 border-t-transparent border-green-500 rounded-full animate-spin relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <ImNewspaper className="text-3xl text-green-600 animate-pulse" />
                    </div>
                </div>

                {/* Brand title */}
                <h1 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-500 tracking-wide">
                    K-Infonic
                </h1>

                {/* Tagline */}
                <p className="text-gray-600 dark:text-gray-300 text-sm tracking-widest animate-bounce">
                    Loading Digital Truth...
                </p>
            </div>
        </div>
    );
};

export default KInfonicLoader;
