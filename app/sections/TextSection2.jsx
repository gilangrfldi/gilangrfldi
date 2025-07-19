"use client";

import RandomQuote from "../components/RandomQuote/RandomQuote";

export default function TextSection2() {
    return (
        <div className='relative w-full  p-4'>
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
