import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editProduct, setEditProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    shipping: false,
  });
  const location = useLocation();

  // Fetch categories and products on mount
  useEffect(() => {
    fetchCategories();
    // if navigated here with product in state, prefill for edit
    if (location?.state?.product) {
      const p = location.state.product;
      setEditId(p._id);
      setEditProduct({
        name: p.name || "",
        description: p.description || "",
        price: p.price || "",
        category: p.category?._id || p.category || "",
        quantity: p.quantity || p.qty || "",
        shipping: !!p.shipping,
      });
    }
    // eslint-disable-next-line
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      setCategories(data.category || []);
    } catch (err) {
      setError("Failed to load categories");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);
      if (photo) formData.append("photo", photo);

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(data.message || "Product created");
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setQuantity("");
      setShipping(false);
      setPhoto(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error creating product");
    }
  };

  const handleEdit = (prod) => {
    setEditId(prod._id);
    setEditProduct({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      category: prod.category?._id || prod.category,
      quantity: prod.quantity,
      shipping: !!prod.shipping,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const formData = new FormData();
      Object.entries(editProduct).forEach(([key, val]) =>
        formData.append(key, val)
      );
      if (photo) formData.append("photo", photo);
      const { data } = await axios.put(
        `/api/v1/product/update-product/${editId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(data.message || "Product updated");
      setEditId(null);
      setEditProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        shipping: false,
      });
      setPhoto(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating product");
    }
  };

  return (
    <div className="bg-white rounded-xl  p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Create Product
          </h2>
          <p className="text-base text-gray-500 mt-1">
            Add or edit products for your store.
          </p>
        </div>
      </div>

      <form
        onSubmit={editId ? handleEditSubmit : handleSubmit}
        className="space-y-4 mb-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-0 focus:border-black"
            placeholder="Product Name"
            name="name"
            value={editId ? editProduct.name : name}
            onChange={
              editId ? handleEditChange : (e) => setName(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-0 focus:border-black"
            placeholder="Short description"
            name="description"
            value={editId ? editProduct.description : description}
            onChange={
              editId ? handleEditChange : (e) => setDescription(e.target.value)
            }
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-0 focus:border-black"
              placeholder="Price"
              name="price"
              value={editId ? editProduct.price : price}
              onChange={
                editId ? handleEditChange : (e) => setPrice(e.target.value)
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-0 focus:border-black"
              name="category"
              value={editId ? editProduct.category : category}
              onChange={
                editId ? handleEditChange : (e) => setCategory(e.target.value)
              }
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm shadow-sm focus:ring-0 focus:border-black"
              placeholder="Quantity"
              name="quantity"
              value={editId ? editProduct.quantity : quantity}
              onChange={
                editId ? handleEditChange : (e) => setQuantity(e.target.value)
              }
              required
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="shipping"
            checked={editId ? editProduct.shipping : shipping}
            onChange={
              editId ? handleEditChange : (e) => setShipping(e.target.checked)
            }
            className="w-4 h-4 text-black"
          />
          <span className="text-sm text-gray-700">Shipping Available</span>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image
          </label>
          <div className="border border-dashed border-gray-200 rounded-md p-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="text-sm"
            />
            {photo && (
              <img
                src={URL.createObjectURL(photo)}
                alt="Preview"
                className="mt-3 rounded-md max-h-40 w-full object-contain"
              />
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-lg font-medium"
          >
            {editId ? "Update" : "Create"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setEditProduct({
                  name: "",
                  description: "",
                  price: "",
                  category: "",
                  quantity: "",
                  shipping: false,
                });
                setPhoto(null);
              }}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>

        {message && (
          <div className="mt-1 text-sm text-green-700 bg-green-50 p-3 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="mt-1 text-sm text-red-700 bg-red-50 p-3 rounded">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateProduct;
