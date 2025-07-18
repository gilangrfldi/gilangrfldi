"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram, FaTiktok } from "react-icons/fa";
import ClapCounter from "./ClapCounter/ClapCounter";

const Footer = () => {
    return (
        <footer className='w-full bg-[#1e232e] text-gray-400 py-16 px-4 md:px-8'>
            <div className='mx-auto p-2'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-48 mb-8'>
                    <div className='col-span-1 text-left'>
                        <h3 className='text-lg font-bold text-white mb-2'>Gilang Rifaldi</h3>
                        <p className='text-sm'>
                            Fullstack developer specializing in building complete web solutions, from robust backend architecture to intuitive user
                            interfaces with clean code & logical flow.
                        </p>
                    </div>

                    <div className='col-span-1 text-right md:text-left'>
                        <h3 className='text-lg font-bold text-white mb-2'>Navigation</h3>
                        <ul className='space-y-2 text-sm'>
                            <li>
                                <Link href='#home' className='hover:text-cyan-400'>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href='#profile' className='hover:text-cyan-400'>
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link href='#projects' className='hover:text-cyan-400'>
                                    Project
                                </Link>
                            </li>
                            <li>
                                <Link href='#contact' className='hover:text-cyan-400'>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className='col-span-1 text-left'>
                        <h3 className='text-lg font-bold text-white mb-2'>Find Me Online</h3>
                        <div className='flex space-x-4'>
                            <Link href='https://github.com/gilangrfldi' target='_blank' rel='noopener noreferrer' className='hover:text-cyan-400'>
                                <FaGithub size={24} />
                            </Link>
                            <Link
                                href='https://www.linkedin.com/in/gilangrfldi20'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='hover:text-cyan-400'>
                                <FaLinkedin size={24} />
                            </Link>
                            <Link
                                href='https://www.instagram.com/gilangrfldi'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='hover:text-cyan-400'>
                                <FaInstagram size={24} />
                            </Link>
                            <Link
                                href='https://www.tiktok.com/@gilangrfldi'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='hover:text-cyan-400'>
                                <FaTiktok size={24} />
                            </Link>
                        </div>
                    </div>

                    <div className='col-span-1 text-right md:text-left'>
                        <h3 className='text-lg font-bold text-white mb-2'>Claps</h3>
                        <ClapCounter />
                    </div>
                </div>

                <div className='border-t border-gray-700 pt-8'>
                    <p className='text-center text-sm'>&copy; {new Date().getFullYear()} Gilang Rifaldi. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
