import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaTrashAlt, FaUserShield, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../Auth/Providers/AuthProvider";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("https://k-info-nic-server.vercel.app/Users");
            setUsers(res.data);
        } catch (err) {
            console.error("Failed to fetch users", err);
        }
    };

    const handleMakeAdmin = async (id) => {
        try {
            const res = await axios.patch(`https://k-info-nic-server.vercel.app/Users/admin/${id}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "User promoted to Admin!", "success");
                fetchUsers();
            }
        } catch (err) {
            Swal.fire("Error", "Could not promote user", "error");
        }
    };

    const handleRemoveAdmin = async (id) => {
        try {
            const res = await axios.patch(`https://k-info-nic-server.vercel.app/Users/remove-admin/${id}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "Admin rights removed!", "success");
                fetchUsers();
            }
        } catch (err) {
            Swal.fire("Error", "Could not remove admin rights", "error");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`https://k-info-nic-server.vercel.app/Users/${id}`);
                Swal.fire("Deleted!", "User has been deleted.", "success");
                fetchUsers();
            } catch (err) {
                Swal.fire("Error", "Failed to delete user", "error");
            }
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold text-green-600 mb-6"> All Users</h2>

            <div className="overflow-x-auto shadow-lg rounded-xl border bg-white">
                <table className="min-w-full text-left">
                    <thead className="bg-green-100 text-green-800">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-700">
                        {users.map((user, index) => (
                            <tr key={user._id} className="border-t">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4 font-medium">{user.name || "N/A"}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4 capitalize">{user.role || "user"}</td>
                                <td className="px-6 py-4 flex gap-2 items-center">
                                    {user.email !== currentUser?.email && (
                                        <>
                                            {user.role !== "admin" ? (
                                                <button
                                                    onClick={() => handleMakeAdmin(user._id)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
                                                    title="Make Admin"
                                                >
                                                    <FaUserShield />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleRemoveAdmin(user._id)}
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full"
                                                    title="Remove Admin"
                                                >
                                                    <FaUserTimes />
                                                </button>
                                            )}

                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                                                title="Delete User"
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AllUsers;
