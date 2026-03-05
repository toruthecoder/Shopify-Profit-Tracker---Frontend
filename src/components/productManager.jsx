import { useState, useEffect } from "react";

export default function ProductManager({ onClose, editData, refreshProducts }) {
    const [form, setForm] = useState({
        title: "",
        body_html: "",
        vendor: "",
        price: "",
    });

    const [productId, setProductId] = useState("");

    const API = `${import.meta.env.VITE_BACKEND_URL}/api/products`;

    useEffect(() => {
        if (editData) {
            setForm({
                title: editData.title || "",
                vendor: editData.vendor || "",
                price: "",
                body_html: "",
            });
            setProductId(editData.id);
        }
    }, [editData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        try {
            await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            alert("Product Created");
            refreshProducts();
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdate = async () => {
        try {
            await fetch(`${API}/${productId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            alert("Product Updated");
            refreshProducts();
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="relative">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-0 right-0 text-red-500 font-bold"
            >
                ✕
            </button>

            <h2 className="mb-4 text-lg font-semibold">
                {editData ? "Update Product" : "Add Product"}
            </h2>

            <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className="bg-gray-100 w-full h-9 pl-2 mb-3 rounded"
            />

            <input
                type="text"
                name="vendor"
                placeholder="Vendor"
                value={form.vendor}
                onChange={handleChange}
                className="bg-gray-100 w-full h-9 pl-2 mb-3 rounded"
            />

            <input
                type="text"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="bg-gray-100 w-full h-9 pl-2 mb-3 rounded"
            />

            <textarea
                name="body_html"
                placeholder="Description"
                value={form.body_html}
                onChange={handleChange}
                className="bg-gray-100 w-full h-20 pl-2 mb-4 rounded"
            />

            {editData ? (
                <button
                    onClick={handleUpdate}
                    className="bg-green-500 w-full h-9 text-white rounded"
                >
                    Update Product
                </button>
            ) : (
                <button
                    onClick={handleCreate}
                    className="bg-green-500 w-full h-9 text-white rounded"
                >
                    Create Product
                </button>
            )}
        </div>
    );
}