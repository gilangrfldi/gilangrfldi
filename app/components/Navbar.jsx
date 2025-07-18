"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 50);

            const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const newProgress = totalScrollHeight > 0 ? (scrollY / totalScrollHeight) * 100 : 0;
            setScrollProgress(newProgress);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleNavLinkClick = (event, id) => {
        event.preventDefault();
        const targetElement = document.getElementById(id);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-[999] transition-colors duration-500 ease-in-out ${
                isScrolled ? "bg-[#1f1f21] shadow-lg" : "bg-transparent"
            }`}>
            <div className='py-4 flex justify-between items-center'>
                <div className='flex items-baseline space-x-2'>
                    <Link
                        href='#'
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className='text-white text-2xl font-bold px-2'
                        style={{ fontFamily: "var(--font-playfair-display)" }}>
                        gilangrfldi
                    </Link>
                    <div className='hidden md:flex space-x-4 mx-5' style={{ fontFamily: "var(--font-ibm-plex-mono)" }}>
                        <Link
                            href='#profile'
                            className='text-white text-sm hover:text-cyan-400 transition-colors'
                            onClick={(e) => handleNavLinkClick(e, "profile")}>
                            PROFILE
                        </Link>
                        <Link
                            href='#projects'
                            className='text-white text-sm hover:text-cyan-400 transition-colors'
                            onClick={(e) => handleNavLinkClick(e, "projects")}>
                            PROJECTS
                        </Link>
                        <Link
                            href='#contact'
                            className='text-white text-sm hover:text-cyan-400 transition-colors'
                            onClick={(e) => handleNavLinkClick(e, "contact")}>
                            CONTACT
                        </Link>
                    </div>
                </div>
                <div className='flex items-center space-x-4 mx-8'>
                    <Link
                        href='https://www.instagram.com/gilangrfldi'
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label='Instagram'
                        className='text-white hover:text-cyan-400'>
                        <InstagramIcon />
                    </Link>
                    <Link
                        href='https://www.linkedin.com/in/gilangrfldi20'
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label='LinkedIn'
                        className='text-white hover:text-cyan-400'>
                        <LinkedInIcon />
                    </Link>
                    <Link
                        href='https://github.com/gilangrfldi'
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label='GitHub'
                        className='text-white hover:text-cyan-400'>
                        <GitHubIcon />
                    </Link>
                    <Link href='mailto:gilangrifaldi04@gmail.com' aria-label='Email' className='text-white hover:text-cyan-400'>
                        <EmailIcon />
                    </Link>
                </div>
                <button className='md:hidden text-white focus:outline-none' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7' />
                    </svg>
                </button>
            </div>
            {/*  Mobile Menu */}
            {isMenuOpen && (
                <div className='md:hidden bg-[#1f1f21] p-4' style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
                    <Link
                        href='#profile'
                        className='block text-white text-sm hover:text-cyan-400 transition-colors'
                        onClick={(e) => {
                            handleNavLinkClick(e, "profile");
                            setIsMenuOpen(false);
                        }}>
                        PROFILE
                    </Link>
                    <Link
                        href='#projects'
                        className='block text-white text-sm hover:text-cyan-400 transition-colors'
                        onClick={(e) => {
                            handleNavLinkClick(e, "projects");
                            setIsMenuOpen(false);
                        }}>
                        PROJECTS
                    </Link>
                    <Link
                        href='#contact'
                        className='block text-white text-sm hover:text-cyan-400 transition-colors'
                        onClick={(e) => {
                            handleNavLinkClick(e, "contact");
                            setIsMenuOpen(false);
                        }}>
                        CONTACT
                    </Link>
                </div>
            )}
            <div className='h-2 bg-cyan-400' style={{ width: `${scrollProgress}%` }}></div>
        </nav>
    );
}
