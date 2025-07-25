"use client";

import RandomQuote from "../components/RandomQuote/RandomQuote";

export default function ImageSplitSection() {
    return (
        <div className='ImageSplitSection relative h-screen w-full overflow-hidden bg-[#2c2c34]'>
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
