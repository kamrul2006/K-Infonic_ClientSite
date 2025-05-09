import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AuthContext } from "../Auth/Providers/AuthProvider";
import axios from "axios";
import KInfonicLoader from "../Components/Fixed/KInfonicLoader";
import logo from "../assets/reeej.png"

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axios.get("http://localhost:5000/Users")
                .then(res => {
                    const matchedUser = res.data.find(item => item.email === user.email);
                    setProfile(matchedUser);
                })
                .catch(err => console.error("Error fetching user profile:", err));
        }
    }, [user]);

    if (!profile) {
        return (
            <div className="text-center py-10 text-gray-600">
                <KInfonicLoader />
            </div>
        );
    }

    return (
        <section className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex flex-col lg:flex-row bg-gradient-to-r from-white to-green-50 rounded-3xl shadow-2xl overflow-hidden border border-green-100">

                {/* Left: Profile Info */}
                <div className="w-full lg:w-2/3 p-8 lg:p-12 space-y-6">
                    <div className="flex items-center gap-6">
                        <img
                            src={user.photoURL || "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_640.png"}
                            alt="User"
                            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">
                                {profile.name}
                                <span
                                    className={`ml-3 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${profile.isSubscribed
                                        ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                                        : "bg-gray-100 text-gray-600 border border-gray-300"
                                        }`}
                                >
                                    {profile.isSubscribed ? "Premium" : "Free"}
                                </span>
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">{profile.email}</p>
                        </div>
                    </div>

                    <div className="text-gray-700 space-y-1">
                        <p><strong>Phone:</strong> {profile.phone || 'Not mentioned'}</p>
                        <p className="italic">“{profile.bio || 'No bio added'}”</p>
                    </div>

                    <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition shadow-md">
                        <FaEdit /> Edit Profile
                    </button>
                </div>

                {/* Right: Branding or Logo Area */}
                <div className="w-full lg:w-1/3 bg-green-100 flex flex-col justify-center items-center text-center p-10">
                    <img
                        src={logo}
                        alt="Brand Logo"
                        className="w-20 lg:w-40 "
                    />
                    {/* <h3 className="text-xl font-bold text-green-800">K-Infonic Platform</h3> */}
                    <p className="text-gray-600 text-sm mt-2">
                        Your one-stop solution for staying informed, reviewing articles, and sharing your thoughts with the world.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default MyProfile;
