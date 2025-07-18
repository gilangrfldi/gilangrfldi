"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProjectPreviewPanel = ({ project, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!project || !project.previewImages || project.previewImages.length === 0) {
        return null;
    }

    const handleNext = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % project.previewImages.length);
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + project.previewImages.length) % project.previewImages.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4'
            onClick={onClose}>
            <div className='relative w-full max-w-4xl flex flex-col items-center gap-4' onClick={(e) => e.stopPropagation()}>
                <div className='relative w-full aspect-video'>
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className='w-full h-full'>
                            <Image
                                src={project.previewImages[currentIndex]}
                                alt={`${project.title} preview ${currentIndex + 1}`}
                                fill
                                className='object-contain rounded-lg'
                            />
                        </motion.div>
                    </AnimatePresence>
                    <button
                        onClick={onClose}
                        className='absolute top-2 right-2 text-white bg-black/30 rounded-full p-2 transition-colors hover:bg-black/50 z-20 cursor-pointer'
                        aria-label='Tutup pratinjau'>
                        <CloseIcon />
                    </button>

                    {project.previewImages.length > 1 && (
                        <>
                            <button
                                onClick={handlePrev}
                                className='absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full p-2 transition-colors hover:bg-black/50 cursor-pointer'>
                                <FaChevronLeft />
                            </button>
                            <button
                                onClick={handleNext}
                                className='absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full p-2 transition-colors hover:bg-black/50 cursor-pointer'>
                                <FaChevronRight />
                            </button>
                        </>
                    )}
                </div>

                {project.previewImages.length > 1 && (
                    <div className='flex gap-2'>
                        {project.previewImages.map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? "bg-white" : "bg-white/50"}`} />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectPreviewPanel;
