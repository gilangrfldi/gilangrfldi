"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hardSkillsData } from "../../data/hardSkills";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function IconCarousel({ data = hardSkillsData }) {
    const [index, setIndex] = useState(0);
    const containerRef = useRef(null);

    const slideNext = () => {
        setIndex((prev) => (prev + 1) % data.length);
    };

    const slidePrev = () => {
        setIndex((prev) => (prev - 1 + data.length) % data.length);
    };

    const handleDragEnd = (event, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        const dragThreshold = 50;

        if (offset < -dragThreshold || velocity < -500) {
            slideNext();
        } else if (offset > dragThreshold || velocity > 500) {
            slidePrev();
        }
    };

    return (
        <div className='bg-[#2D3748] border border-[#4A5568] rounded-3xl p-4 md:p-8 w-[350px] md:w-[800px] flex flex-col shadow-lg'>
            <div className='text-center mb-8'>
                <h2 className='text-2xl md:text-3xl font-bold text-white' style={{ fontFamily: "var(--font-playfair-display)" }}>
                    {data[index].title}
                </h2>
            </div>

            <div className='relative flex items-center'>
                <button
                    onClick={slidePrev}
                    className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#4A5568]/50 text-white w-10 h-10 rounded-full md:flex hidden items-center justify-center z-20 hover:bg-[#00d3f2]/70 transition-colors ease-in-out duration-300 cursor-pointer'>
                    <FaChevronLeft />
                </button>

                <motion.div
                    ref={containerRef}
                    className='flex-grow overflow-hidden relative min-h-[300px] cursor-grab active:cursor-grabbing'
                    drag='x'
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={handleDragEnd}>
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className='absolute w-full h-full p-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-y-6 gap-x-4 overflow-y-auto'>
                            {data[index].icons.map((item, i) => (
                                <div key={i} className='flex flex-col items-center gap-2 text-center'>
                                    <div className='w-20 h-20 rounded-2xl bg-[#4A5568] flex items-center justify-center text-4xl text-[#CBD5E0] transition-all duration-200 hover:bg-[#00d3f2]/70 hover:text-white hover:scale-110'>
                                        {item.icon}
                                    </div>
                                    <span className='text-sm text-[#A0AEC0]'>{item.name}</span>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                <button
                    onClick={slideNext}
                    className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#4A5568]/50 text-white w-10 h-10 rounded-full md:flex hidden items-center justify-center z-20 hover:bg-[#00d3f2]/70 transition-colors ease-in-out duration-300 cursor-pointer'>
                    <FaChevronRight />
                </button>
            </div>

            <div className='flex justify-center gap-3 mt-8'>
                {data.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                            index === i ? "bg-[#38B2AC] scale-125" : "bg-[#4A5568]"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
