"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaTiktok, FaPaperPlane, FaChevronRight } from "react-icons/fa";
import SpotlightCard from "../components/SpotlightCard/SpotlightCard";
import Image from "next/image";

const SocialLink = ({ href, icon, title, description }) => (
    <Link href={href} target='_blank' rel='noopener noreferrer'>
        <SpotlightCard>
            <div className='bg-[#2D3748] flex items-center gap-4 border border-[#4A5568] p-4 rounded-2xl  transition-colors duration-300 w-full'>
                <div className='text-2xl text-cyan-400'>{icon}</div>
                <div className='flex-grow'>
                    <h4 className='font-bold text-white'>{title}</h4>
                    <p className='text-sm text-gray-400'>{description}</p>
                </div>
                <FaChevronRight className='text-gray-500' />
            </div>
        </SpotlightCard>
    </Link>
);

export default function ContactSection() {
    const [activeTab, setActiveTab] = useState("contact");
    const [formResult, setFormResult] = useState(null);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormResult("Sending...");
        const formData = new FormData(event.target);
        formData.append("access_key", "39d4345c-9ba4-4de9-b338-d9fd4b990616");
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            setFormResult("Message sent successfully!");
            event.target.reset();
            setTimeout(() => setFormResult(null), 5000);
        } else {
            console.log("Error", data);
            setFormResult(data.message);
        }
    };

    return (
        <div className='flex flex-col items-center justify-start mx-auto min-h-screen px-4'>
            <div className='text-center'>
                <h1
                    className='font-bold text-4xl sm:text-5xl md:text-6xl text-white my-4 md:my-8'
                    style={{ fontFamily: "var(--font-playfair-display)" }}>
                    Contact Me
                </h1>
                <p className='text-lg md:text-xl text-gray-300 max-w-2xl mx-auto' style={{ fontFamily: "var(--font-fira-code)" }}>
                    Reach out via form, sosial media, or support platforms.
                </p>
            </div>

            <div className='flex items-center justify-center p-1 rounded-xl bg-[#2D3748] border border-[#4A5568] my-8'>
                <button
                    onClick={() => setActiveTab("contact")}
                    className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors duration-300 cursor-pointer ${
                        activeTab === "contact" ? "bg-[#4A5568] text-white shadow-md" : "text-[#A0AEC0] hover:bg-white/5"
                    }`}>
                    Contact me
                </button>
                <button
                    onClick={() => setActiveTab("support")}
                    className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors duration-300 cursor-pointer ${
                        activeTab === "support" ? "bg-[#4A5568] text-white shadow-md" : "text-[#A0AEC0] hover:bg-white/5"
                    }`}>
                    Support me
                </button>
            </div>

            <div className='relative w-full max-w-4xl md:min-h-[650px] min-h-screen'>
                <AnimatePresence initial={false} mode='wait'>
                    {activeTab === "contact" && (
                        <motion.div
                            key='contact'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className='absolute inset-0'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
                                <div className='flex flex-col gap-4' style={{ fontFamily: "var(--font-fira-code)" }}>
                                    <SocialLink
                                        href='https://github.com/gilangrfldi'
                                        icon={<FaGithub />}
                                        title='Github'
                                        description='View my projects and contributions.'
                                    />
                                    <SocialLink
                                        href='https://www.linkedin.com/in/gilangrfldi20'
                                        icon={<FaLinkedin />}
                                        title='LinkedIn'
                                        description='Connect our professional network.'
                                    />
                                    <SocialLink
                                        href='https://www.instagram.com/gilangrfldi'
                                        icon={<FaInstagram />}
                                        title='Instagram'
                                        description='See my other creative side.'
                                    />
                                    <SocialLink
                                        href='https://www.tiktok.com/gilangrfldi'
                                        icon={<FaTiktok />}
                                        title='Tiktok'
                                        description='Follow my thoughts and updates.'
                                    />
                                </div>
                                <div className='card-3d'>
                                    <div className='bg-[#2D3748] border border-[#4A5568] p-4 rounded-2xl'>
                                        <h3
                                            className='text-lg font-semibold text-white mb-4 flex items-center gap-2'
                                            style={{ fontFamily: "var(--font-fira-code)" }}>
                                            <FaPaperPlane /> Send Me a Message
                                        </h3>
                                        <form className='space-y-4' onSubmit={handleSubmit}>
                                            <input type='text' name='name' placeholder='Your Name' className='contact-input' required />
                                            <input type='email' name='email' placeholder='Your Email' className='contact-input' required />
                                            <textarea
                                                name='message'
                                                placeholder='Your Message'
                                                rows={5}
                                                className='contact-input'
                                                required></textarea>
                                            <button type='submit' className='contact-button' style={{ fontFamily: "var(--font-fira-code)" }}>
                                                Send
                                            </button>
                                        </form>
                                        {formResult && <p className='mt-4 text-center text-sm text-cyan-500'>{formResult}</p>}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {activeTab === "support" && (
                        <motion.div key='support' className='inset-0 flex justify-center p-4'>
                            {" "}
                            <div className='card-3d md:mb-10'>
                                <div className='text-center bg-[#2D3748] border border-[#4A5568] p-6 md:p-8 rounded-2xl w-full max-w-lg'>
                                    {" "}
                                    <h3 className='text-2xl font-bold text-white mb-4' style={{ fontFamily: "var(--font-fira-code)" }}>
                                        Support My Work
                                    </h3>
                                    <p className='text-gray-300 mb-6'>
                                        You can support me through the platforms below. Scan the QRIS code to send your appreciation. Every support
                                        means a lot!
                                    </p>
                                    <div className='relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto aspect-square rounded-2xl overflow-hidden'>
                                        <Image src='/images/qris.jpeg' alt='Kode QRIS untuk dukungan' layout='fill' objectFit='cover' />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
