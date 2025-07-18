"use client";

export default function TextSection() {
    return (
        <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
            <div
                className='creative-text-wrapper text-2xl md:text-6xl font-bold lg:text-8xl text-center flex flex-col space-y-4 md:space-y-6'
                style={{ fontFamily: "var(--font-playfair-display)" }}>
                <h2>Creative Developer</h2>
                <h2>
                    <span>Specializing In</span>
                </h2>
                <h2>Web Front-End Development</h2>
            </div>
        </div>
    );
}
