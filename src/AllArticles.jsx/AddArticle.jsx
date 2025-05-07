import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const tagOptions = [
    { value: "Politics", label: "Politics" },
    { value: "Technology", label: "Technology" },
    { value: "Sports", label: "Sports" },
    { value: "Business", label: "Business" },
    { value: "Science", label: "Science" },
    { value: "Inspiration", label: "Inspiration" },
];

const categoryOptions = [
    "Politics",
    "Technology",
    "Sports",
    "Business",
    "Science",
    "Inspiration",
];

const AddArticle = () => {
    const [publishers, setPublishers] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        publisher: "",
        tags: [],
        category: "",
        description: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5000/publishers")
            .then((res) => setPublishers(res.data))
            .catch((err) => console.error("Error fetching publishers:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const articleData = {
            ...formData,
            tags: formData.tags.map((tag) => tag.value),
            type: "general",
            status: "pending",
            viewCount: 0,
        };

        try {
            await axios.post("http://localhost:5000/News", articleData);
            Swal.fire({
                icon: "success",
                title: "Submitted!",
                text: "Article submitted for admin approval.",
                confirmButtonColor: "#d33",
            }).then(() => navigate("/all-articles"));
        } catch (err) {
            console.error("Submission error:", err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to submit article.",
                confirmButtonColor: "#d33",
            });
        }
    };

    return (
        <section className="max-w-3xl mx-auto px-6 py-10 bg-gradient-to-br from-green-50 via-white to-green-100 shadow-2xl rounded-2xl">
            <h2 className="text-4xl font-bold text-center text-green-600 mb-8 tracking-wide">
                Add New Article
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    type="text"
                    placeholder="Article Title"
                    className="w-full p-4 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                    requigreen
                />

                <input
                    type="text"
                    placeholder="Image URL"
                    className="w-full p-4 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.image}
                    onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                    }
                    requigreen
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                        className="w-full p-4 border border-green-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500"
                        value={formData.publisher}
                        onChange={(e) =>
                            setFormData({ ...formData, publisher: e.target.value })
                        }
                        requigreen
                    >
                        <option value="">Select Publisher</option>
                        {publishers.map((pub) => (
                            <option key={pub.id} value={pub.name}>
                                {pub.name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="w-full p-4 border border-green-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500"
                        value={formData.category}
                        onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                        }
                        requigreen
                    >
                        <option value="">Select Category</option>
                        {categoryOptions.map((cat, i) => (
                            <option key={i} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <Select
                    options={tagOptions}
                    isMulti
                    placeholder="Select tags..."
                    value={formData.tags}
                    onChange={(selected) =>
                        setFormData({ ...formData, tags: selected })
                    }
                    className="text-sm"
                />

                <textarea
                    rows="6"
                    placeholder="Write article description..."
                    className="w-full p-4 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    requigreen
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-lg shadow-lg"
                >
                    Submit Article
                </button>
            </form>
        </section>
    );
};

export default AddArticle;
