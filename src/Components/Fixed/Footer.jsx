import { Link } from 'react-router-dom';
import logo from '../../assets/reeek.png';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaRegEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-green-100 mt-5 dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* About */}
                <div>
                    <img src={logo} alt="K-Infonic" className="dark:bg-white/50 rounded-2xl w-20 " />
                    <p className="text-sm leading-6">
                        K-Infonic is your go-to digital newspaper for reliable, fast, and in-depth reporting on national and global affairs.
                        We believe in the voice of digital truth.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-lg font-semibold text-green-600 mb-3">Quick Links</h2>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-green-600 transition">Home</Link></li>
                        <li><Link to="/all-articles" className="hover:text-green-600 transition">All Articles</Link></li>
                        <li><Link to="/add-article" className="hover:text-green-600 transition">Add Article</Link></li>
                        <li><Link to="/subscription" className="hover:text-green-600 transition">Subscription</Link></li>
                        <li><Link to="/about" className="hover:text-green-600 transition">About Us</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h2 className="text-lg font-semibold text-green-600 mb-3">Contact Us</h2>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-green-500" />
                            123 Digital News Ave, Dhaka , BanglaDesh.
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPhoneAlt className="text-green-500" />
                            +880 1234-567890
                        </li>
                        <li className="flex items-center gap-2">
                            <FaRegEnvelope className="text-green-500" />
                            contact@k-infonic.com
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-green-600 text-white text-sm py-4 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
                    <p>© {new Date().getFullYear()} K-Infonic. All rights reserved.</p>

                    <p className='text-xs text-green-100 opacity-30 font-serif italic'>A Product by K-Web Tec</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-gray-200 transition"><FaFacebookF /></a>
                        <a href="#" className="hover:text-gray-200 transition"><FaTwitter /></a>
                        <a href="#" className="hover:text-gray-200 transition"><FaInstagram /></a>
                        <a href="#" className="hover:text-gray-200 transition"><FaLinkedin /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
