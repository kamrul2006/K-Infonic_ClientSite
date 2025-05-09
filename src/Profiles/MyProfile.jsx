import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { AuthContext } from "../Auth/Providers/AuthProvider";
import axios from "axios";
import KInfonicLoader from "../Components/Fixed/KInfonicLoader";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null); // use null initially

    // console.log(user)

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
        <section className="max-w-5xl mx-auto p-6 md:p-10">
            <div className="bg-gradient-to-r from-green-100 via-white to-green-50 border border-green-200 shadow-xl lg:h-[500px] rounded-3xl overflow-hidden">
                <div className="grid md:grid-cols-3 gap-6 items-center p-6 md:p-10">
                    {/* Profile Image */}
                    <div className="flex justify-center md:justify-start">
                        <img
                            src={user.photoURL ? user.photoURL : "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_640.png"}
                            alt="User"
                            className="w-36 h-36 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                    </div>

                    {/* Profile Info */}
                    <div className="md:col-span-2 text-center md:text-left space-y-2">
                        <h2 className="text-3xl font-bold text-gray-800">
                            {profile.name}
                            <span
                                className={`ml-3 text-sm font-medium px-3 py-1 rounded-full ${profile.isSubscribed
                                    ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                                    : "bg-gray-100 text-gray-600 border border-gray-300"
                                    }`}
                            >
                                {profile.isSubscribed ? 'Premium' : 'Free'}
                            </span>
                        </h2>
                        <p className="text-gray-600">
                            <strong>Email:</strong> {profile.email}
                        </p>
                        <p className="text-gray-600">
                            <strong>Phone:</strong> {profile.phone ? profile.phone : 'Not mentioned'}
                        </p>
                        <p className="text-gray-700 italic">“{profile.bio ? profile.bio : 'NO BIO ADDED'}”</p>

                        <button className="mt-4 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition shadow-md">
                            <FaEdit /> Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyProfile;
