import React from "react";
import Layout from "../components/Layout/Layout";

const faqs = [
  {
    question: "How do I track my order?",
    answer:
      "Once your order ships, you’ll receive a tracking number by email. Use it to follow your package’s progress.",
  },
  {
    question: "Can I change my shipping address after ordering?",
    answer:
      "Contact support immediately. Changes may not be possible after your order has shipped.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Returns are accepted within 14 days of delivery for unused items in original packaging. See our Return & Refund page for details.",
  },
  {
    question: "How long do refunds take?",
    answer:
      "Refunds are processed within 3–7 business days after we receive and inspect your return.",
  },
  {
    question: "Who do I contact for technical issues?",
    answer: "Open a support request or email us for technical help.",
  },
];

const Faq = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Help Center / FAQs
                  </h1>
                  <p className="text-lg text-gray-700">
                    Find answers to common questions below.
                  </p>
                </div>
              </div>

              <section className="prose max-w-none text-gray-700 space-y-6">
                {faqs.map((faq, idx) => (
                  <div key={idx}>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {faq.question}
                    </h2>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </section>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Faq;
