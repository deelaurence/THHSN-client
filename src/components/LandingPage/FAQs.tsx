import { useState } from 'react';
import { FaMinus } from 'react-icons/fa6';
import { IoMdAdd } from 'react-icons/io';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  const faqs = [
    { question: "What services do you offer?", answer: "We offer high-quality raw human hair wigs, bundles, lace fronts, hair care products, and tools." },
    { question: "How do I track my order?", answer: "You can track your order by logging into your account or contacting our customer support team." },
    { question: "What is your return and exchange policy?", answer: "We offer a 48-hour return and exchange policy. To be eligible for a refund, your item must be in its original condition and accompanied by all original tags, packaging, and accessories. Please see our full policy on our IG page." },
    { question: "What payment methods do you accept?", answer: "We accept major credit cards (Visa, Mastercard)." },
    { question: "Do you offer discounts?", answer: "Yes, we regularly offer limited-time discounts." },
    { question: "How do I care for my human hair wig or bundle?", answer: "We recommend using our gentle hair care products and avoiding heat styling." },
    { question: "Can I color or dye my human hair wig or bundle?", answer: "Yes, but we recommend consulting a professional stylist." },
    { question: "What is your shipping policy?", answer: "We offer standard and expedited shipping options. Delivery times vary depending on location." },
    { question: "Do you ship internationally?", answer: "Yes, we ship worldwide." },
    { question: "How do I create an account?", answer: "Click 'Sign Up' on our website and follow the registration process." },
    { question: "How do I contact customer support?", answer: "Email us at [support email], call us at [phone number], or send a message on Instagram." },
    { question: "Can I cancel or change my order?", answer: "Contact our customer support team within 24 hours of placing your order." },
    { question: "How long does it take to process my order?", answer: "Orders are processed within 24-48 hours." },
    { question: "Is my personal and payment information secure?", answer: "Yes, our website uses SSL encryption for secure transactions." },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const displayedFAQs = showAll ? faqs : faqs.slice(0, 5);

  return (
    <section>
      <h2 className="font-queens duration-500 text-3xl text-center my-12">FAQs</h2>
      <div className="px-6 sm:px-16">
        {displayedFAQs.map((faq, index) => (
          <div
            key={index}
            className="border-b dark:opacity-80 border-neutral-300 dark:border-neutral-700 overflow-hidden"
          >
            <button
              className="w-full text-left py-4  flex justify-between items-center"
              onClick={() => toggleAccordion(index)}
            >
              {faq.question}
              <span>{openIndex === index ? <FaMinus /> : <IoMdAdd />}</span>
            </button>
            <div
              className={`transition-all duration-500 ease-out ${
                openIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="py-4 opacity-70 dark:opacity-50 font-thin text-xs">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
        {!showAll && (
          <button
            className="my-4 opacity-60 flex items-center justify-center text-center mx-auto"
            onClick={() => setShowAll(true)}
          >
            <p className='text-xs '>
              show more
            </p>
            <MdExpandMore/> 
          </button>
        )}
        {showAll && (
          <button
            className="my-4 flex items-center justify-center text-center mx-auto"
            onClick={() => setShowAll(false)}
          >
            <MdExpandLess/> 
          </button>
        )}
      </div>
    </section>
  );
};

export default FAQs;
