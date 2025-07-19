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
import ProjectsSection from "./sections/ProjectsSection";
import ContactSection from "./sections/ContactSection";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import Footer from "./components/Footer";
import ImageSplitSection from "./sections/ImageSplitSection";
import ScrollLineAnimation from "./components/animations/ScrollLineAnimation";

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
    const svgLineRef = useRef(null);
    const pathLineRef = useRef(null);
    const ImageSplitSectionRef = useRef(null);
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

    useEffect(() => {
        if (pathLineRef.current && !isIntroActive) {
            const path = pathLineRef.current;
            const pathLength = path.getTotalLength();

            gsap.set(path, {
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength,
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: svgLineRef.current,
                    start: "top 60%",
                    end: "+=600",
                    scrub: 1,
                },
            });

            tl.to(path, {
                strokeDashoffset: 0,
                ease: "none",
            });

            return () => {
                tl.kill();
            };
        }
    }, [isIntroActive]);

    useEffect(() => {
        if (ImageSplitSectionRef.current && !isIntroActive) {
            const sectionElement = ImageSplitSectionRef.current;
            let ctx = gsap.context(() => {
                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionElement,
                        start: "center center",
                        end: "+=600",
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                    },
                });

                timeline.to({}, { duration: 0.2 });
                timeline.to(".image-top", { yPercent: -100, ease: "power2.inOut" });
                timeline.to(".image-bottom", { yPercent: 100, ease: "power2.inOut" }, "<");
                timeline.fromTo(".first-text", { opacity: 0 }, { opacity: 1, y: "-22vh", ease: "power1.in" }, "<+=0.12");
                timeline.fromTo(".second-content", { opacity: 0 }, { opacity: 1, y: "-15vh", ease: "power2.out", stagger: 0.2 }, ">-0.20");
            }, ImageSplitSectionRef);

            return () => ctx.revert();
        }
    }, [isIntroActive]);

    useEffect(() => {
        if (profileSectionRef.current) {
            const sectionElement = profileSectionRef.current;
            const animation = gsap.fromTo(
                sectionElement,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionElement,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
            return () => {
                animation.kill();
            };
        }
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
                <main className='text-white pt-[80px '>
                    <section>
                        <HomeSection />
                    </section>
                    <section ref={textSectionRef} className='mb-60'>
                        <TextSection />
                    </section>
                    <section className='-mb-96'>
                        <ScrollLineAnimation svgRef={svgLineRef} pathRef={pathLineRef} />
                    </section>
                    <section ref={ImageSplitSectionRef}>
                        <ImageSplitSection innerRef={ImageSplitSectionRef} />
                    </section>
                    <section
                        ref={profileSectionRef}
                        className='bg-no-repeat bg-cover bg-center pt-44 -mt-60'
                        style={{ backgroundImage: "url('/images/bg-profile.png')" }}>
                        <div id='profile'>
                            <ProfileSection />
                        </div>
                    </section>
                    <section id='projects'>
                        <div
                            className='bg-no-repeat bg-cover bg-center -mt-14 pt-16 md:p-20'
                            style={{
                                backgroundImage: "url('/images/bg-project.png')",
                                transform: "scale(1.05)",
                            }}>
                            <ProjectsSection />
                        </div>
                    </section>
                    <section id='contact'>
                        <div
                            className=' bg-no-repeat bg-cover bg-center -mt-20 pt-36 md:-mt-12 md:pt-26'
                            style={{
                                backgroundImage: "url('/images/bg-profile.png')",
                                transform: "scale(1.05)",
                            }}>
                            <ContactSection />
                            <section className='mt-12'>
                                <Footer />
                            </section>
                        </div>
                    </section>
                </main>
            )}
        </>
    );
}
