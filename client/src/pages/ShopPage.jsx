import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import axios from "axios";
import Layout from "../components/Layout/Layout.jsx";
import Filters from "../components/Filter";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileFilterSection, setMobileFilterSection] = useState(null);
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/v1/product/get-products");
        console.log(data);
        setProducts(data.products || []);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Get product image URL from backend endpoint
  console.log("products", products);

  const getImageUrl = (photo) => {
    if (!photo || !photo.data || !photo.data.data) return "";
    const uint8Array = new Uint8Array(photo.data.data);
    const blob = new Blob([uint8Array], {
      type: photo.contentType,
    });
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  };

  // Deterministic discount for a few products based on id hash
  const getDiscount = (prod) => {
    if (!prod || !prod._id) return 0;
    const hash = prod._id.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
    if (hash % 11 === 0) return 25;
    if (hash % 7 === 0) return 20;
    if (hash % 5 === 0) return 15;
    if (hash % 3 === 0) return 10;
    return 0;
  };

  // Filter products by selected categories and price
  const filteredProducts = products.filter((prod) => {
    let categoryMatch = true;
    let priceMatch = true;
    if (selectedCategories.length > 0) {
      categoryMatch = selectedCategories.includes(
        prod.category?._id || prod.category
      );
    }
    if (selectedPrice) {
      const [min, max] = selectedPrice.split("-").map(Number);
      priceMatch = prod.price >= min && prod.price <= max;
    }
    return categoryMatch && priceMatch;
  });

  // Pagination (moved after filteredProducts to avoid early reference)
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / productsPerPage)
  );

  // Reset page when filters change
  useEffect(() => setCurrentPage(1), [selectedCategories, selectedPrice]);

  const productsToShow = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <Layout>
      <div className="max-w-7xl  mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 ">
          {/* Filters sidebar (hidden on md and smaller) */}
          <aside className="hidden lg:block lg:col-span-1 mt-7">
            <div className="bg-white rounded-xl shadow-xl p-6 lg:mt-6">
              <Filters
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}
              />
            </div>
          </aside>

          {/* Products */}
          <main className="lg:col-span-3">
            {/* Mobile filter button (visible on md and smaller) placed next to heading */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">All Products</h2>

              {/* single mobile filter button (md and smaller) placed adjacent to heading */}
              <div className="lg:hidden">
                <button
                  className="text-sm px-3 py-2 bg-white text-black border border-black rounded-md"
                  onClick={() => {
                    // open both sections in mobile dropdown
                    setMobileFilterSection(null);
                    setMobileFilterOpen((v) => !v);
                  }}
                >
                  Filters
                </button>
              </div>
            </div>

            {/* Mobile filter dropdown (shows both Category and Price) */}
            {mobileFilterOpen && (
              <div className="mb-4 lg:hidden">
                <div className="mt-1 bg-white rounded-lg shadow-lg p-4">
                  <div className="flex justify-end">
                    <button
                      className="text-sm text-gray-500"
                      onClick={() => setMobileFilterOpen(false)}
                      aria-label="Close filters"
                    >
                      ✕
                    </button>
                  </div>
                  <Filters
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    selectedPrice={selectedPrice}
                    setSelectedPrice={setSelectedPrice}
                    openSection={null}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="mb-4 text-red-600 bg-red-50 p-3 rounded">
                {error}
              </div>
            )}

            {loading ? (
              <div className="w-full py-12 flex items-center justify-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="w-full py-12 flex flex-col items-center justify-center">
                <p className="mt-4 text-lg text-gray-600">
                  No products match your filters.
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedPrice("");
                    }}
                    className="px-4 py-2 bg-black text-white rounded-md"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productsToShow.map((prod) => (
                    <div key={prod._id} className="w-full">
                      <div className="bg-white rounded-xl shadow-xl hover:shadow-lg transition h-full flex flex-col">
                        <div className="overflow-hidden rounded-t-xl relative">
                          <img
                            src={getImageUrl(prod.photo)}
                            alt={prod.name}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://via.placeholder.com/400x300?text=No+Image";
                            }}
                          />
                          {(() => {
                            const d = getDiscount(prod);
                            return d > 0 ? (
                              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-lg">
                                -{d}% OFF
                              </div>
                            ) : null;
                          })()}
                        </div>
                        <div className="p-3 flex-1 flex flex-col">
                          <div>
                            <div className="flex items-start justify-between">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {prod.name}
                              </h3>
                              <div className="text-lg font-semibold text-gray-900">
                                {typeof prod.price !== "undefined"
                                  ? `₹${prod.price}`
                                  : ""}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500">
                              {prod.category?.name || "-"}
                            </p>
                            <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                              {prod.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {prod.shipping
                                ? "Shipping Available"
                                : "No Shipping"}
                            </p>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-3">
                            <button
                              onClick={() =>
                                navigate(`/product/${prod.slug || prod._id}`)
                              }
                              className="text-sm px-2 py-2.5 bg-white text-black border border-black rounded-md font-medium hover:bg-gray-50"
                            >
                              View More
                            </button>

                            {cart &&
                            cart.find((item) => item._id === prod._id) ? (
                              <button
                                disabled
                                className="text-sm px-3 py-2.5 bg-gray-300 text-gray-700 rounded-md font-medium"
                              >
                                Added in Cart
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setCart((prev) => {
                                    const exists = prev.find(
                                      (item) => item._id === prod._id
                                    );
                                    if (exists) return prev;
                                    return [...prev, { ...prod, quantity: 1 }];
                                  });
                                }}
                                className="text-sm px-3 py-2.5 bg-black text-white rounded-md font-medium hover:bg-gray-900"
                              >
                                Add to Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 min-h-[56px] flex items-center justify-center">
                  {filteredProducts.length > productsPerPage ? (
                    <nav
                      className="flex items-center justify-center"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                        className="px-3 py-2 border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Prev
                      </button>

                      <div className="flex items-center gap-2 mx-3">
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((num) => (
                          <button
                            key={num}
                            onClick={() => setCurrentPage(num)}
                            className={`px-3 py-2 rounded-md ${
                              currentPage === num
                                ? "bg-black text-white"
                                : "bg-white"
                            }`}
                            aria-current={
                              currentPage === num ? "page" : undefined
                            }
                          >
                            {num}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </nav>
                  ) : (
                    <div className="w-full" />
                  )}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
