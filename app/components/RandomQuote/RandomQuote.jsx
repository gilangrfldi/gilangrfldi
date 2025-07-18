"use client";
import { useState, useEffect } from "react";
import { techQuotes } from "../../data/quotes";
import ShinyText from "../ShinyText/ShinyText";

const RandomQuote = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * techQuotes.length);
        const randomQuote = techQuotes[randomIndex];

        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author);
    }, []);

    if (!quote) {
        return null;
    }

    return (
        <div className='backdrop-blur-sm rounded-lg p-8 w-full max-w-2xl text-center'>
            <>
                <blockquote className='text-2xl italic text-white mb-4'>
                    <ShinyText text={`"${quote}"`} speed={4} className='inline-block' />
                </blockquote>
                <cite className='text-lg text-cyan-400 font-semibold not-italic'>- {author}</cite>
            </>
        </div>
    );
};

export default RandomQuote;
