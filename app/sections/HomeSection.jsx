"use client";
import React from "react";
import { motion } from "framer-motion";
import FuzzyText from "../components/FuzzyText/FuzzyText";
import Lanyard from "../components/Lanyard/Lanyard";

export default function HomeSection() {
    const hoverIntensityValue = 0.5;
    const enableHoverValue = true;

    const homeVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99],
            },
        },
    };

    return (
        <motion.section
            id='home'
            className='relative text-white min-h-screen'
            variants={homeVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'>
            <div className='absolute inset-0 z-0 grid grid-cols-1 sm:grid-cols-4 w-full h-full items-center pointer-events-none '>
                <div className='absolute inset-0 z-10'>
                    <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
                </div>
                <div className='col-span-2 mr-6 flex flex-col justify-center'>
                    <h1 className='text-4xl md:text-8xl font-bold text-white text-center mb-4' style={{ fontFamily: "var(--font-playfair-display)" }}>
                        Hi there!
                    </h1>
                    <span className='mb-3 text-cyan-400 text-center' style={{ fontFamily: "var(--font-fira-code)" }}>
                        Iam a Website Developer. Iam 21 years old from Indonesia
                        <br />
                        Lets make your an interactions with me for our better experience in digital and technology
                    </span>
                </div>
                <div className='text-4xl md:text-8xl col-span-2 relative flex flex-col items-center justify-center'>
                    <FuzzyText
                        fontFamily='Playfair Display'
                        fontSize='clamp(2rem, 8vw, 8rem)'
                        fontWeight={900}
                        color='#ffff'
                        baseIntensity={0.2}
                        hoverIntensity={hoverIntensityValue}
                        enableHover={enableHoverValue}>
                        {"Let Me\nIntroduce\nMyself"}
                    </FuzzyText>
                </div>
            </div>
        </motion.section>
    );
}
