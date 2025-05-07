import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const tagOptions = [
    { value: "Politics", label: "Politics" },
    { value: "Technology", label: "Technology" },
    { value: "Sports", label: "Sports" },
    { value: "Business", label: "Business" },
    { value: "Science", label: "Science" },
    { value: "Inspiration", label: "Inspiration" },
];

const AddArticle = () => {
    const [publishers, setPublishers] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        publisher: "",
        tags: [],
        description: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/publishers")
            .then(res => setPublishers(res.data))
            .catch(err => console.error("Error fetching publishers:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const articleData = {
            ...formData,
            tags: formData.tags.map(tag => tag.value),
            type: "general",
            status: "pending",
            viewCount: 0
        };

        try {
            await axios.post("http://localhost:5000/News", articleData);
            alert("Article submitted for approval.");
            navigate("/all-articles");
        } catch (err) {
            console.error("Submission error:", err);
            alert("Failed to submit article.");
        }
    };

    return (
        <section className="max-w-3xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Add New Article</h2>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md border border-red-200">
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full p-3 border rounded-lg"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    required
                />

                <input
                    type="text"
                    placeholder="Image URL"
                    className="w-full p-3 border rounded-lg"
                    value={formData.image}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                    required
                />

                <select
                    className="w-full p-3 border rounded-lg"
                    value={formData.publisher}
                    onChange={e => setFormData({ ...formData, publisher: e.target.value })}
                    required
                >
                    <option value="">Select Publisher</option>
                    {publishers.map(pub => (
                        <option key={pub.id} value={pub.name}>{pub.name}</option>
                    ))}
                </select>

                <Select
                    options={tagOptions}
                    isMulti
                    placeholder="Select tags"
                    value={formData.tags}
                    onChange={selected => setFormData({ ...formData, tags: selected })}
                />

                <textarea
                    rows="6"
                    placeholder="Description"
                    className="w-full p-3 border rounded-lg"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
                >
                    Submit Article
                </button>
            </form>
        </section>
    );
};

export default AddArticle;
