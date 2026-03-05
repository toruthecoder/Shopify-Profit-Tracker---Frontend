import { useState } from 'react'

export default function ProductManager() {
    const [form, setForm] = useState({
        title: "",
        body_html: "",
        vendor: "",
        price: ""
    });

    const [productId, setProductId] = useState("");

    const API = `${import.meta.env.VITE_BACKEND_URL}/api/products`;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        try {
            const res = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            console.log("Created:", data);
            alert("Product Created");
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdate = async () => {
        if (!productId) return alert("Enter Product ID");

        try {
            const res = await fetch(`${API}/${productId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            console.log("Updated:", data);
            alert("Product Updated");
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        if (!productId) return alert("Enter Product ID");

        try {
            const res = await fetch(`${API}/${productId}`, {
                method: "DELETE",
            });

            const data = await res.json();
            console.log("Deleted:", data);
            alert("Product Deleted");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='p-5 max-w-125 bg-white mt-30 rounded'>

            <h2 className='mb-4'>Shopify Product Manager</h2>

            <label htmlFor="title"> ADD TITLE</label>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className='bg-gray-100 w-110 h-8 pl-2 mb-4'
            />
            <br />

            <label htmlFor="vendor"> ADD Vendor</label>
            <input
                type="text"
                name="vendor"
                placeholder="Vendor"
                value={form.vendor}
                onChange={handleChange}
                className='bg-gray-100 w-110 h-8 pl-2 mb-4'
            />
            <br />

            <label htmlFor="Price"> ADD Price</label>
            <input
                type="text"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className='bg-gray-100 w-110 h-8 pl-2'
            />
            <br /><br />

            <label htmlFor="Desc"> ADD Description</label>
            <textarea
                name="body_html"
                placeholder="Description"
                value={form.body_html}
                onChange={handleChange}
                className='bg-gray-100 w-110 h-8 pl-2'
            />
            <br /><br />

            <button onClick={handleCreate} className='bg-green-400 w-110 h-8 pl-2 mb-4 text-white rounded'>Create Product</button>

            <hr />

            <input
                type="text"
                placeholder="Product ID (for update/delete)"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className='bg-gray-100 w-110 h-8 pl-2 mt-4'
            />
            <br /><br />
            <div className='flex items-center justify-center'>
                <button onClick={handleUpdate} className='bg-green-400 w-50 h-8 pl-2 my-4 text-white rounded'>Update Product</button>
                <button onClick={handleDelete} style={{ marginLeft: "10px" }} className='bg-red-400 w-50 h-8 pl-2 my-4 text-white rounded'>
                    Delete Product
                </button>
            </div>
        </div>
    );
}