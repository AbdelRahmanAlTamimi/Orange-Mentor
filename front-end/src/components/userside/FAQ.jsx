import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Importing chevron icons

const FAQItem = ({ question, answer, isOpen, toggle }) => {
    return (
        <div className="faq-item mb-4">
            <h5
                className="question d-flex justify-content-between align-items-center"
                onClick={toggle}
                style={{ cursor: 'pointer' }}
            >
                <span>{question}</span>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </h5>
            {isOpen && <p className="answer">{answer}</p>}
        </div>
    );
};

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null); // Track which question is open

    const faqs = [
        {
            question: "What is the Alithad School Management System?",
            answer: "The Alithad School Management System is an integrated platform designed to streamline administrative tasks, improve communication, and enhance the overall management of the school."
        },
        {
            question: "How can I enroll my child in Alithad School?",
            answer: "Enrollment can be completed online through our dedicated enrollment page. Simply fill out the required information and submit the form."
        },
        {
            question: "How do I access my child’s academic performance?",
            answer: "Parents can log in to the parent portal using their credentials to view grades, attendance records, and progress reports."
        },
        {
            question: "What features does the system offer for teachers?",
            answer: "The system provides tools for grade management, attendance tracking, timetable scheduling, and resource sharing, making it easier for teachers to manage their classes."
        },
        {
            question: "Is there a mobile app for the school management system?",
            answer: "Yes, we offer a mobile app that allows parents and teachers to access important information and receive updates on the go."
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle open index
    };

    return (
        <>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title bg-white text-center px-3" style={{color:'#06BBCC'}}>FAQs</h6>
                        <h1 className="mb-5">Frequently Asked Questions</h1>
                    </div>
                    <div className="row g-4">
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                toggle={() => toggleFAQ(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}