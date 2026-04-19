import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import axios from "axios";

const PaymentPage = () => {
  const [selected, setSelected] = useState("COD");
  const [orderPlacedId, setOrderPlacedId] = useState(null);

  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [auth] = useAuth();

  const PLATFORM_FEE = 30;
  const DELIVERY_CHARGE = 50;

  const getSubtotal = () =>
    cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const getTotal = () =>
    cart.length === 0 ? 0 : getSubtotal() + PLATFORM_FEE + DELIVERY_CHARGE;

  const handlePlaceOrder = async () => {
    const orderId = `OD${Date.now()}${Math.floor(Math.random() * 1000)}`;

    const items = cart.map((item) => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
    }));

    try {
      await axios.post(
        "/api/v1/order/place",
        {
          orderId,
          items,
          subtotal: getSubtotal(),
          platformFee: PLATFORM_FEE,
          deliveryCharge: DELIVERY_CHARGE,
          total: getTotal(),
          paymentMethod: selected,
        },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );

      setCart([]);
      localStorage.removeItem("cart");
      setOrderPlacedId(orderId);
    } catch (err) {
      alert("Order placement failed. Please try again.");
    }
  };

  return (
    <Layout title={"Select Payment Method"}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-3xl font-bold mb-6">Checkout</div>

        {orderPlacedId ? (
          /* ✅ ORDER SUCCESS */
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                ✓
              </div>

              <h2 className="text-2xl font-semibold mb-2">Order Placed!</h2>
              <p className="text-gray-600 mb-4">
                Thanks for shopping with Elegant
              </p>

              <div className="mt-4">
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="text-xl font-bold break-words">{orderPlacedId}</p>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate("/dashboard/user/orders")}
                  className="px-6 py-3 bg-black text-white rounded-lg font-semibold"
                >
                  View Orders
                </button>
                <button
                  onClick={() => {
                    setOrderPlacedId(null);
                    navigate("/");
                  }}
                  className="px-6 py-3 border rounded-lg"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ✅ CHECKOUT */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-xl p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Choose Payment Method
                </h3>

                <label className="flex items-center gap-3 p-3 border rounded-md mb-3">
                  <input
                    type="radio"
                    checked={selected === "COD"}
                    onChange={() => setSelected("COD")}
                  />
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-xs text-gray-500">
                      Pay when you receive
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border rounded-md opacity-60">
                  <input type="radio" disabled />
                  <div>
                    <p className="font-medium">Online Payment</p>
                    <p className="text-xs text-gray-500">Coming soon</p>
                  </div>
                </label>

                <button
                  onClick={handlePlaceOrder}
                  disabled={cart.length === 0}
                  className="mt-4 w-full bg-black text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                >
                  Place Order
                </button>
              </div>
            </div>

            {/* Right - Invoice */}
            <div>
              <div className="bg-white rounded-xl shadow-xl p-6">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold">Elegant</h2>
                  <p className="text-xs text-gray-500">Order Summary</p>
                </div>

                <hr className="mb-4" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Items</span>
                    <span>
                      {cart.reduce((sum, i) => sum + (i.quantity || 1), 0)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{getSubtotal()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span>₹{PLATFORM_FEE}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>₹{DELIVERY_CHARGE}</span>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{getTotal()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PaymentPage;
