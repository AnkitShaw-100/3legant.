import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in name, email and message");
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/v1/contact", form);
      toast.success("Message sent — we will get back to you soon!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Could not send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
          {/* Form Container */}
          <div className="flex-1 flex items-stretch">
            <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col justify-center min-h-full w-full">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Contact Us
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We'd love to hear from you. Fill out the form and our team will
                get back to you soon.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <label className="flex flex-col gap-2">
                    <span className="text-base font-medium text-gray-700">
                      Name
                    </span>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-base font-medium text-gray-700">
                      Email
                    </span>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="text-base font-medium text-gray-700">
                    Subject
                  </span>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Subject (optional)"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-base font-medium text-gray-700">
                    Message
                  </span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Write your message"
                  />
                </label>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-900 disabled:opacity-60 transition"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      })
                    }
                    className="text-base text-gray-500 hover:underline"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Info Container */}
          <aside className="flex-1 flex items-stretch">
            <div className="rounded-xl bg-white p-8 shadow-xl flex flex-col justify-between min-h-full w-full">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Contact Information
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Reach us by phone, email, or visit our office.
                </p>

                <div className="space-y-6">
                  {/* Office */}
                  <div className="flex items-center gap-4">
                    <div className="text-black p-2.5 bg-white rounded-lg shadow-md flex items-center justify-center">
                      <FaMapMarkerAlt className="text-lg" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-800">
                        Office
                      </div>
                      <div className="text-base text-gray-600">
                        Salt Lake, Kolkata, India
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <div className="text-black p-2.5 bg-white rounded-lg shadow-md flex items-center justify-center">
                      <FaPhone
                        className="text-lg"
                        style={{ transform: "rotate(90deg)" }}
                      />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-800">
                        Phone
                      </div>
                      <a
                        href="tel:+913495860918"
                        className="text-base text-gray-600 hover:underline"
                      >
                        +91-34958-60918
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-black p-2.5 bg-white rounded-lg shadow-md flex items-center justify-center">
                      <FaEnvelope className="text-lg" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-800">
                        Email
                      </div>
                      <a
                        href="mailto:hello@Elegant.example"
                        className="text-base text-gray-600 hover:underline"
                      >
                        ankitshaw6933@gmail.com{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="text-lg font-semibold text-gray-800 mb-2">
                  Map
                </div>
                <div className="w-full h-48 bg-white border border-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
                  Map preview
                </div>
              </div>

              <div className="mt-8 text-base text-gray-500">
                We aim to reply within 1–2 business days.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
