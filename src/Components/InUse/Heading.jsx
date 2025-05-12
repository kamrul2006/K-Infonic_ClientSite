import { FaFacebookF, FaTwitter, FaYoutube, FaSearch } from 'react-icons/fa';
import logo from '../../assets/reeej.png';
import Marquee from "react-fast-marquee";


const Header = () => {
    const today = new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <header className="w-full  border-b border-gray-200 px-4 py-2">

            <div className="max-w-7xl mx-auto flex items-center justify-between">


                {/* left  - Logo */}
                <div className=" text-md md:text-4xl font-bold text-gray-900 tracking-wide py-3 flex items-center justify-center  md:gap-2">
                    <span className="text-gray-500">The</span>
                    <img src={logo} alt="K-Infonic" className="dark:bg-white/50 rounded-2xl md:w-56 w-20  object-contain" />
                </div>

                <div className=' hidden md:flex border border-green-400 '>
                    <div className='bg-green-500  px-2 py-2'>
                        Top news
                    </div>

                    <div className='max-w-2xl hidden md:block bg-green-50 py-2 '>
                        <Marquee className='gap-5'>
                            <p className='text-green-500'>
                                Govt of Bangladesh bans Awami League's all kind of political activities.
                            </p>
                            <p className='ml-5 '>
                                Govt issues ordinance amending Anti-Terrorism Act.
                            </p>
                        </Marquee>
                    </div>
                </div>

                {/* right - Social Icons + Date */}

                <div className='flex flex-col items-center justify-center gap-3 text-xs md:text-base'>

                    <div className="hidden md:flex items-center gap-4 text-gray-700">
                        <FaFacebookF className="hover:text-green-600 cursor-pointer" />
                        <FaTwitter className="hover:text-green-600 cursor-pointer" />
                        <FaYoutube className="hover:text-green-600 cursor-pointer" />
                    </div>

                    <span className="md:text-sm text-xs  text-gray-500">{today}</span>
                </div>


            </div>
        </header>
    );
};

export default Header;
