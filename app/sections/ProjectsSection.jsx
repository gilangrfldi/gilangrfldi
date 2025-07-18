"use client";

import React, { useState, useEffect } from "react";
import { webProjects, mobileProjects } from "../data/projects.jsx";
import ProjectCard from "../components/ProjectCard/ProjectCard.jsx";
import ScrollFloat from "../components/ScrollFloat/ScrollFloat.jsx";
import SpotlightCard from "../components/SpotlightCard/SpotlightCard.jsx";
import ProjectPreviewPanel from "../components/ProjectPreviewPanel/ProjectPreviewPanel.jsx";
import { AnimatePresence, motion } from "framer-motion"; 
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectSection = () => {
    const [projectType, setProjectType] = useState("web");
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        if (selectedProject) {
            ScrollTrigger.disable(false);
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        } else {
            ScrollTrigger.enable(false);
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }
        return () => {
            ScrollTrigger.enable(false);
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        };
    }, [selectedProject]);

    const handleProjectTypeChange = (type) => {
        setProjectType(type);
    };

    const displayedProjects = projectType === "web" ? webProjects : mobileProjects;

    return (
        <div className='flex flex-col items-center justify-start mx-auto h-full min-h-screen px-4 p-10'>
            <section className='text-center text-white mb-4' style={{ fontFamily: "var(--font-playfair-display)" }}>
                <ScrollFloat>My Projects</ScrollFloat>
            </section>

            <div className='flex items-center justify-center p-1 rounded-xl bg-[#424347] border border-[#5A5B5F] mb-8'>
                <button
                    onClick={() => handleProjectTypeChange("web")}
                    className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                        projectType === "web" ? "bg-[#5A5B5F] text-white" : "text-[#A0AEC0] hover:bg-white/5"
                    }`}>
                    Web Projects
                </button>
                <button
                    onClick={() => handleProjectTypeChange("mobile")}
                    className={`px-6 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                        projectType === "mobile" ? "bg-[#5A5B5F] text-white" : "text-[#A0AEC0] hover:bg-white/5"
                    }`}>
                    Mobile Projects
                </button>
            </div>

            <div className='relative w-full max-w-7xl min-h-[650px]'>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={projectType}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className='w-full'>
                        {displayedProjects.length > 0 ? (
                            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
                                {displayedProjects.map((project) => (
                                    <SpotlightCard key={project.id}>
                                        <ProjectCard data={project} onClick={() => setSelectedProject(project)} />
                                    </SpotlightCard>
                                ))}
                            </div>
                        ) : (
                            <div className='text-center text-gray-400 py-10'>
                                <p>Projects for this category will be added soon.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {selectedProject && <ProjectPreviewPanel project={selectedProject} onClose={() => setSelectedProject(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default ProjectSection;
