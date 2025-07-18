"use client";

import { useEffect, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Carousel from "../components/Carousel/Carousel";
import CircularGallery from "../components/CircularGallery/CircularGallery";
import ScrollFloat from "../components/ScrollFloat/ScrollFloat";
import ScramblingText from "../components/DecryptedText/ScramblingText";
import Certification from "../components/Cercification/Certification";
import Experience from "../components/Experience/Experience";

gsap.registerPlugin(ScrollTrigger);
const ProfileSection = forwardRef(function ProfileSection({ triggerRef }, ref) {
    useEffect(() => {
        const elementToAnimate = ref?.current;
        const triggerElement = triggerRef?.current;
        if (!elementToAnimate || !triggerElement) return;

        const animation = gsap.fromTo(
            elementToAnimate,
            { opacity: 0, y: 100 },
            {
                opacity: 1,
                y: 0,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: triggerElement,
                    start: "center center",
                    end: "+=100%",
                    scrub: 1,
                },
            }
        );

        return () => {
            if (animation) animation.kill();
        };
    }, [ref, triggerRef]);

    return (
        <div className='mx-auto w-full h-[100%] '>
            {/* <section className='font-bold text-center text-white' style={{ fontFamily: "var(--font-playfair-display)" }}> */}
            <section>
                {/* <ScrollFloat>Profile</ScrollFloat> */}
                <p className='font-bold text-4xl sm:text-5xl md:text-7xl text-center text-white mb-4' style={{ fontFamily: "var(--font-fira-code)" }}>
                    Profile
                </p>
            </section>
            <p className='md:text-xl text-center text-gray-200 mb-8' style={{ fontFamily: "var(--font-fira-code)" }}>
                Everything about me is explained as follows
            </p>
            <div className='flex flex-col justify-center items-center '>
                <div className=' relative'>
                    <Carousel autoplay={true} loop={true} />
                </div>
            </div>
            <div className='h-[600px] relative'>
                <CircularGallery bend={3} textColor='#ffffff' borderRadius={0.05} />
            </div>

            <div className='container  mx-auto px-4 md:my-10'>
                <h2
                    className='text-2xl md:text-3xl xl:text-4xl font-bold text-center text-white mb-12'
                    style={{ fontFamily: "var(--font-playfair-display)" }}>
                    Experience
                </h2>
                <Experience />
            </div>

            <div className='container mx-auto px-4 mt-30'>
                <h2
                    className='text-2xl md:text-3xl xl:text-4xl font-bold text-center text-white mb-10'
                    style={{ fontFamily: "var(--font-playfair-display)" }}>
                    Certificate
                </h2>
                <Certification />
            </div>
            <div className='text-center p-23 md:p-40'>
                <ScramblingText
                    text='Know Me More'
                    className='revealed text-md md:text-xl xl:text-4xl text-cyan-400 font-bold font-mono'
                    duration={4000}
                    loopDelay={3000}
                />
            </div>
        </div>
    );
});

export default ProfileSection;
