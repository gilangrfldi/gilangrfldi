"use client";

import Image from "next/image";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LinkIcon from "@mui/icons-material/Link";
import { motion } from "framer-motion";

const ProjectCard = ({ data, onClick }) => (
    <div className='bg-[#424347] border border-[#5A5B5F] rounded-2xl p-4 flex flex-col w-full h-full transition-all duration-300'>
        <motion.div layoutId={`card-image-${data.id}`} className='w-full aspect-video mb-4 rounded-lg overflow-hidden relative'>
            <Image src={data.cardImage} alt={data.title} fill className='object-cover' />
        </motion.div>

        <div className='flex-grow flex flex-col'>
            <h3 className='text-xl font-bold text-white'>{data.title}</h3>
            <p className='text-sm text-gray-400'>{data.stack}</p>
        </div>

        <div className='mt-4 flex justify-between items-end'>
            <div className='flex gap-2 flex-wrap'>
                {data.tags.map((tag) => (
                    <span key={tag} className='bg-[#5A5B5F] text-[#E2E8F0] text-xs font-medium px-3 py-1 rounded-full'>
                        {tag}
                    </span>
                ))}
            </div>

            <div className='flex-shrink-0 flex gap-3'>
                <button
                    onClick={onClick}
                    className='w-9 h-9 rounded-full bg-[#5A5B5F] text-[#E2E8F0] hidden md:flex items-center justify-center transition-colors hover:bg-zinc-500  hover:text-white cursor-pointer'
                    aria-label='Preview Project'>
                    <VisibilityIcon style={{ fontSize: 20 }} />
                </button>
                <Link
                    href={data.projectLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-9 h-9 rounded-full bg-[#5A5B5F] text-[#E2E8F0] flex items-center justify-center transition-colors hover:bg-zinc-500 hover:text-white cursor-pointer'
                    aria-label='Link to Project'>
                    <LinkIcon style={{ fontSize: 20 }} />
                </Link>
            </div>
        </div>
    </div>
);

export default ProjectCard;
