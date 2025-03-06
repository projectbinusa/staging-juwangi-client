import { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [kategori, setKategori] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:4322/api/categories");
            setCategories(res.data);
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    const addCategory = async () => {
        try {
            await axios.post("http://localhost:4322/api/categories", { kategori });
            setKategori("");
            fetchCategories();
        } catch (error) {
            console.error("Error adding category", error);
        }
    };

    const editCategory = async (id, kategori) => {
        setEditId(id);
        setKategori(kategori);
    };

    const updateCategory = async () => {
        try {
            await axios.put(`http://localhost:4322/api/categories/${editId}`, { kategori });
            setEditId(null);
            setKategori("");
            fetchCategories();
        } catch (error) {
            console.error("Error updating category", error);
        }
    };

    const deleteCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:4322/api/categories/${id}`);
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Manage Categories</h1>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    className="border p-2 w-full"
                    placeholder="Enter category"
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                />
                {editId ? (
                    <button onClick={updateCategory} className="bg-yellow-500 text-white p-2">Update</button>
                ) : (
                    <button onClick={addCategory} className="bg-blue-500 text-white p-2">Add</button>
                )}
            </div>
            <ul className="list-disc pl-5">
                {categories.map((cat) => (
                    <li key={cat.id} className="flex justify-between items-center p-2 border-b">
                        {cat.kategori}
                        <div>
                            <button onClick={() => editCategory(cat.id, cat.kategori)} className="text-yellow-500 mr-2">Edit</button>
                            <button onClick={() => deleteCategory(cat.id)} className="text-red-500">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
