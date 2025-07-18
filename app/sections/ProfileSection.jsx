"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Carousel from "../components/Carousel/Carousel";
import CircularGallery from "../components/CircularGallery/CircularGallery";
import ScramblingText from "../components/DecryptedText/ScramblingText";
import Certification from "../components/Cercification/Certification";
import Experience from "../components/Experience/Experience";
import { TypeAnimation } from "react-type-animation";

gsap.registerPlugin(ScrollTrigger);

export default function ProfileSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const sectionElement = sectionRef.current;
        if (!sectionElement) return;

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
    }, []);

    return (
        <div ref={sectionRef} className='w-full py-20 md:py-32'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='text-center mb-12'>
                    <h1 className='font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-4' style={{ fontFamily: "var(--font-playfair-display)" }}>
                        Profile
                    </h1>
                    <p className='text-lg md:text-xl text-gray-300 max-w-2xl mx-auto' style={{ fontFamily: "var(--font-fira-code)" }}>
                        Everything about me is explained as follows
                    </p>
                </div>
                <div className='flex flex-col items-center'>
                    <Carousel autoplay={true} loop={true} />
                </div>
            </div>
            <div className='h-[600px] w-full my-20 md:my-32'>
                <CircularGallery bend={3} textColor='#ffffff' borderRadius={0.05} />
            </div>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='mb-20 md:mb-32'>
                    <TypeAnimation
                        sequence={["Experience", 3000, "", 500, "Experience", 3000]}
                        wrapper='h2'
                        speed={75}
                        className='text-3xl md:text-4xl font-bold text-center text-white mb-12'
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                        repeat={Infinity}
                    />
                    <Experience />
                </div>
                <div className='mb-20 md:mb-32'>
                    <TypeAnimation
                        sequence={["Certificate", 3000, "", 500, "Certificate", 3000]}
                        wrapper='h2'
                        speed={75}
                        className='text-3xl md:text-4xl font-bold text-center text-white mb-12'
                        style={{ fontFamily: "var(--font-playfair-display)" }}
                        repeat={Infinity}
                    />
                    <Certification />
                </div>
                <div className='text-center'>
                    <ScramblingText
                        text='Know Me More'
                        className='text-xl md:text-2xl text-cyan-400 font-bold font-mono'
                        duration={4000}
                        loopDelay={3000}
                    />
                </div>
            </div>
        </div>
    );
}
