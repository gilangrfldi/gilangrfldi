"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RandomQuote from "../components/RandomQuote/RandomQuote";
gsap.registerPlugin(ScrollTrigger);

export default function ImageSplitSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const sectionElement = sectionRef.current;
        if (!sectionElement) return;

        ScrollTrigger.getAll().forEach((trigger) => {
            if (trigger.trigger === sectionElement) {
                trigger.kill();
            }
        });

        gsap.fromTo(
            sectionElement,
            { opacity: 1, scale: 1 },
            {
                opacity: 1,
                scale: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: sectionElement,
                    start: "center center",
                    end: "top+=50%",
                    scrub: 1,
                },
            }
        );

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

        timeline.to(sectionElement.querySelector(".image-top"), {
            yPercent: -100,
            ease: "power2.inOut",
        });
        timeline.to(sectionElement.querySelector(".image-bottom"), { yPercent: 100, ease: "power2.inOut" }, "<");

        timeline.fromTo(sectionElement.querySelector(".first-text"), { opacity: 0 }, { opacity: 1, y: "-22vh", ease: "power1.in" }, "<+=0.12");

        timeline.fromTo(
            sectionElement.querySelector(".second-content"),
            { opacity: 0 },
            { opacity: 1, y: "-15vh", ease: "power2.out", stagger: 0.2 },
            ">-0.20"
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === sectionElement) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <div ref={sectionRef} className='ImageSplitSection relative h-screen w-full overflow-hidden bg-[#2c2c34] '>
            <div className='image-top absolute top-0 left-0 h-1/2 w-full overflow-hidden'>
                <div className='image-inner absolute top-0 h-screen w-full'></div>
            </div>
            <div className='image-bottom absolute bottom-0 left-0 h-1/2 w-full overflow-hidden'>
                <div className='image-inner absolute bottom-0 h-screen w-full'></div>
            </div>
            <div className='revealed-content absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center'>
                <p
                    className='first-text text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white opacity-0 leading-tight'
                    style={{ fontFamily: "var(--font-playfair-display)" }}>
                    welcome to my interactive portofolio
                </p>
                <div className='second-content opacity-0 mt-4'>
                    <div className='p-4 rounded-lg'>
                        <RandomQuote />
                    </div>
                </div>
            </div>
        </div>
    );
}
