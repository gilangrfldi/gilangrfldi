"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import StarBorder from "./StarBorder/StarBorder";
import ScramblingText from "./DecryptedText/ScramblingText";

const PANEL_MOVE_DURATION = 1.0;
const PANEL_MOVE_DELAY = 0.2;
const INTRO_FADE_OUT_DURATION = 0.5;
const BLUR_CLEAR_DURATION = 1.0;

const SplitScreenIntro = ({ children, onIntroComplete }) => {
    const [introPhase, setIntroPhase] = useState("initial");
    const [isIntroActive, setIsIntroActive] = useState(true);
    const [isContentBlurred, setIsContentBlurred] = useState(true);

    const startAnimation = (playMusic = false) => {
        setIntroPhase("animating");

        const introStartExitPoint = (PANEL_MOVE_DELAY + PANEL_MOVE_DURATION) * 1000;
        const hideIntroTimer = setTimeout(() => {
            setIsIntroActive(false);
            if (onIntroComplete) {
                onIntroComplete(playMusic);
            }
        }, introStartExitPoint);

        const deblurContentTimer = setTimeout(() => {
            setIsContentBlurred(false);
        }, (PANEL_MOVE_DELAY + 0.2) * 1000);

        const totalExitDuration = (PANEL_MOVE_DELAY + PANEL_MOVE_DURATION + INTRO_FADE_OUT_DURATION + BLUR_CLEAR_DURATION) * 1000 + 100;
        const completePhaseTimer = setTimeout(() => setIntroPhase("complete"), totalExitDuration);

        return () => {
            clearTimeout(hideIntroTimer);
            clearTimeout(deblurContentTimer);
            clearTimeout(completePhaseTimer);
        };
    };

    const panelVariants = {
        initial: { y: 0 },
        animateTop: {
            y: "-100vh",
            transition: {
                duration: PANEL_MOVE_DURATION,
                ease: [0.76, 0, 0.24, 1],
                delay: PANEL_MOVE_DELAY,
            },
        },
        animateBottom: {
            y: "100vh",
            transition: {
                duration: PANEL_MOVE_DURATION,
                ease: [0.76, 0, 0.24, 1],
                delay: PANEL_MOVE_DELAY,
            },
        },
    };

    const mainIntroWrapperVariants = {
        visible: { opacity: 1, pointerEvents: "auto" },
        hidden: {
            opacity: 0,
            pointerEvents: "none",
            transition: {
                duration: INTRO_FADE_OUT_DURATION,
                delay: PANEL_MOVE_DURATION + PANEL_MOVE_DELAY - INTRO_FADE_OUT_DURATION,
            },
        },
    };

    const contentRevealVariants = {
        blurred: { opacity: 1, y: 0, filter: "blur(10px)", pointerEvents: "none" },
        clear: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            pointerEvents: "auto",
            transition: { duration: BLUR_CLEAR_DURATION, ease: "easeOut" },
        },
    };

    return (
        <>
            <motion.div
                variants={contentRevealVariants}
                initial='blurred'
                animate={isContentBlurred ? "blurred" : "clear"}
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}>
                {children}
            </motion.div>
            <AnimatePresence>
                {isIntroActive && (
                    <motion.div
                        key='split-intro-overlay'
                        className='fixed inset-0 z-50 overflow-hidden'
                        variants={mainIntroWrapperVariants}
                        initial='visible'
                        animate='visible'
                        exit='hidden'>
                        <motion.div
                            className='absolute top-0 left-0 w-full bg-[#161616]'
                            style={{ height: "50vh" }}
                            variants={panelVariants}
                            initial='initial'
                            animate={introPhase === "animating" ? "animateTop" : "initial"}></motion.div>
                        <motion.div
                            className='absolute bottom-0 left-0 w-full bg-[#161616]'
                            style={{ height: "50vh" }}
                            variants={panelVariants}
                            initial='initial'
                            animate={introPhase === "animating" ? "animateBottom" : "initial"}></motion.div>
                        <AnimatePresence>
                            {introPhase === "initial" && (
                                <motion.div
                                    key='intro-ui-content'
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                                    className='absolute inset-0 flex flex-col items-center justify-center z-50 p-4'>
                                    <span className='text-cyan-400 text-xl font-mono uppercase tracking-wider'>
                                        <ScramblingText text='Unveil My Creations' duration={4000} loopDelay={3000} />
                                    </span>
                                    <Image src='/welcome.gif' alt='READY' width={300} height={100} unoptimized={true} className='ml-2 mb-4' />
                                    <StarBorder
                                        onClick={() => startAnimation(true)}
                                        as='button'
                                        className='custom-class cursor-pointer mb-4'
                                        color='cyan'
                                        speed='5s'>
                                        START
                                    </StarBorder>
                                    <p
                                        onClick={() => startAnimation(false)}
                                        className='text-gray-400 text-sm cursor-pointer hover:text-cyan-400 transition duration-300 ease-in-out'>
                                        START WITHOUT MUSIC
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SplitScreenIntro;
