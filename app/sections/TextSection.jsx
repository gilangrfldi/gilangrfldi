"use client";

export default function TextSection() {
    return (
        <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
            <div className='creative-text-wrapper text-center '>
                <h2 className='text-3xl md:text-7xl font-bold lg:text-8xl leading-tight' style={{ fontFamily: "var(--font-playfair-display)" }}>
                    Creative Developer
                    <br />
                    <span>Specializing In</span>
                    <br />
                    Web Front-End Development
                </h2>
            </div>
        </div>
    );
}
