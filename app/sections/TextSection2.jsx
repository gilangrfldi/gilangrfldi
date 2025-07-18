"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RandomQuote from "../components/RandomQuote/RandomQuote";

gsap.registerPlugin(ScrollTrigger);
export default function TextSection2() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const sectionElement = sectionRef.current;
        let ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionElement,
                    start: "top center",
                    end: "+=1000",
                    pin: true, 
                    scrub: 1, 
                },
            });
            timeline.fromTo(".first-text", { opacity: 0 }, { opacity: 1, y: "-40vh", ease: "power1.in" });

            timeline.fromTo(".quote", { opacity: 0 }, { opacity: 1, y: "-35vh", ease: "power2.out", stagger: 0.2 }, ">-0.20");
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className='relative w-full  p-4'>
            <div className='text-center flex flex-col items-center justify-center'>
                <p
                    className='first-text text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight'
                    style={{ fontFamily: "var(--font-playfair-display)" }}>
                    welcome to my interactive portofolio
                </p>
                <div className='quote mt-8'>
                    {" "}
                    <div className='p-4 rounded-lg'>
                        <RandomQuote />
                    </div>
                </div>
            </div>
        </div>
    );
}
