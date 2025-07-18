"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const getRandomChar = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    return chars[Math.floor(Math.random() * chars.length)];
};

const scrambleText = (text, progress) => {
    const length = text.length;
    const revealedChars = Math.floor(length * progress);
    let result = "";
    for (let i = 0; i < length; i++) {
        if (i < revealedChars) {
            result += text[i];
        } else {
            result += getRandomChar();
        }
    }
    return result;
};

const ScramblingText = ({ text, duration = 4000, loopDelay = 3000, className = "" }) => {
    const [displayText, setDisplayText] = useState(text);
    const containerRef = useRef(null);
    const animationFrameId = useRef(null);

    const startAnimation = useCallback(() => {
        let startTime = null;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            setDisplayText(scrambleText(text, progress));

            if (progress < 1) {
                animationFrameId.current = requestAnimationFrame(animate);
            }
        };
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
        requestAnimationFrame(animate);
    }, [text, duration]);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        let intervalId = null;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                startAnimation();

                intervalId = setInterval(() => {
                    startAnimation();
                }, duration + loopDelay);
            } else {
                if (intervalId) {
                    clearInterval(intervalId);
                }
            }
        });

        observer.observe(element);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            if (intervalId) {
                clearInterval(intervalId);
            }
            if (observer && element) {
                observer.unobserve(element);
            }
        };
    }, [text, duration, loopDelay, startAnimation]);

    return (
        <span ref={containerRef} className={className}>
            {displayText}
        </span>
    );
};

export default ScramblingText;
