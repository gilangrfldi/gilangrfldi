"use client";

import { useState, useEffect } from "react";
import { FaHandsClapping } from "react-icons/fa6";

const ClapCounter = () => {
    const [clapCount, setClapCount] = useState(0);
    const [isClapping, setIsClapping] = useState(false);

    useEffect(() => {
        fetch("/api/claps")
            .then((res) => res.json())
            .then((data) => setClapCount(data.count || 0));
    }, []);

    const handleClap = async () => {
        setIsClapping(true);

        try {
            const response = await fetch("/api/claps", { method: "POST" });
            const data = await response.json();
            setClapCount(data.count);
        } catch (error) {
            console.error("Failed to update claps:", error);
        }

        setTimeout(() => setIsClapping(false), 600);
    };

    return (
        <div className='clap-counter-wrapper'>
            <button
                onClick={handleClap}
                className={`cursor-pointer hover:text-cyan-400 clap-icon-button ${isClapping ? "clapped" : ""}`}
                aria-label='Give a clap'>
                <FaHandsClapping />
            </button>
            <div className='clap-display'>{clapCount} claps</div>
        </div>
    );
};

export default ClapCounter;
