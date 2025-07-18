"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import ProfileSection from "./sections/ProfileSection";
import HomeSection from "./sections/HomeSection";
import SplitScreenIntro from "./components/SplitScreenIntro";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextSection from "./sections/TextSection";
import ImageSplitSection from "./sections/ImageSplitSection";
import ScrollLineAnimation from "./components/animations/ScrollLineAnimation";
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import Footer from "./components/Footer";
gsap.registerPlugin(ScrollTrigger);

const calculateBlur = (scrollY) => {
    const scrollThreshold = 100;
    const maxBlur = 10;
    const blurCompleteScroll = 600;

    let newBlur = 0;
    if (scrollY > scrollThreshold) {
        const scrollProgress = Math.min(1, (scrollY - scrollThreshold) / (blurCompleteScroll - scrollThreshold));
        newBlur = scrollProgress * maxBlur;
    }
    return newBlur;
};

export default function HomePage() {
    const [showNavbar, setShowNavbar] = useState(false);
    const [isIntroActive, setIsIntroActive] = useState(true);
    const [shouldPlayMusic, setShouldPlayMusic] = useState(false);
    const [showMusicPlayer, setShowMusicPlayer] = useState(false);
    const audioInstanceRef = useRef(null);
    const textSectionRef = useRef(null);
    const scrollLineSectionRef = useRef(null);
    const imageSplitSectionRef = useRef(null);
    const profileSectionRef = useRef(null);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        const handleScroll = () => {
            const scrollY = window.scrollY;
            document.documentElement.style.setProperty("--scroll-blur", `blur(${calculateBlur(scrollY)}px)`);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isIntroActive) {
            document.body.classList.add("no-scroll");
            document.documentElement.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
            document.documentElement.classList.remove("no-scroll");
        }
    }, [isIntroActive]);

    useEffect(() => {
        if (!isIntroActive) {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            const creativeTextTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: textSectionRef.current,
                    start: "center center",
                    end: "+=3000",
                    scrub: 1,
                    pin: true,
                },
            });
            creativeTextTimeline.fromTo(
                ".creative-text-wrapper",
                { opacity: 0, scale: 10 },
                { opacity: 1, scale: 1, ease: "power2.inOut", duration: 1 }
            );
            creativeTextTimeline.to(".creative-text-wrapper", {
                y: "-30vh",
                opacity: 1,
                ease: "power2.in",
                duration: 0.5,
            });
        }
        return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }, [isIntroActive]);

    const handleIntroComplete = (musicWasStarted) => {
        setShowNavbar(true);
        setIsIntroActive(false);
        setShowMusicPlayer(true);
        if (musicWasStarted) {
            setShouldPlayMusic(true);
        }
    };

    useEffect(() => {
        audioInstanceRef.current = new Audio();
        audioInstanceRef.current.loop = true;
    }, []);

    useEffect(() => {
        return () => {
            if (audioInstanceRef.current) {
                audioInstanceRef.current.pause();
                audioInstanceRef.current.currentTime = 0;
            }
        };
    }, []);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -100, pointerEvents: "none" }}
                animate={showNavbar ? { opacity: 1, y: 0, pointerEvents: "auto" } : {}}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className='fixed top-0 left-0 w-full z-[999]'>
                <Navbar />
            </motion.div>

            <AnimatePresence>{isIntroActive && <SplitScreenIntro onIntroComplete={handleIntroComplete}></SplitScreenIntro>}</AnimatePresence>

            {showMusicPlayer && <MusicPlayer audioRef={audioInstanceRef} shouldPlayInitially={shouldPlayMusic} />}
            {!isIntroActive && (
                <main className='text-white pt-[80px] md:pt-0'>
                    <section>
                        <HomeSection />
                    </section>
                    <section ref={textSectionRef}>
                        <TextSection />
                    </section>
                    <section ref={scrollLineSectionRef} className='-mb-96'>
                        <ScrollLineAnimation />
                    </section>
                    <section ref={imageSplitSectionRef}>
                        <ImageSplitSection innerRef={imageSplitSectionRef} />
                    </section>
                    <section ref={profileSectionRef} id='profile'>
                        <div
                            className='bg-no-repeat bg-cover bg-center -mt-64 pt-64 md:pt-50'
                            style={{
                                backgroundImage: "url('/images/bg-profile.png')",
                                transform: "scale(1.05)",
                            }}>
                            <ProfileSection />
                        </div>
                    </section>
                    <section id='projects'>
                        <div
                            className='bg-no-repeat bg-cover bg-center -mt-10 pt-20 md:-mt-10 md:p-20'
                            style={{
                                backgroundImage: "url('/images/bg-project.png')",
                                transform: "scale(1.05)",
                            }}>
                            <ProjectsSection />
                        </div>
                    </section>
                    <section id='contact'>
                        <div
                            className=' bg-no-repeat bg-cover bg-center -mt-8 pt-20 md:-mt-10 md:pt-20'
                            style={{
                                backgroundImage: "url('/images/bg-profile.png')",
                                transform: "scale(1.05)",
                            }}>
                            <ContactSection />
                            <Footer />
                        </div>
                    </section>
                </main>
            )}
        </>
    );
}
