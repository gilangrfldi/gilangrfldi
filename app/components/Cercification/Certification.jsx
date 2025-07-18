"use client";

import SpotlightCard from "../SpotlightCard/SpotlightCard";
import { certificationData } from "../../data/certificat";

import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";

const CertificationCard = ({ data }) => (
    <div className='bg-[#2D3748] border border-[#4A5568] rounded-2xl p-4 flex flex-col h-[140px] md:h-[180px] md:w-[320px] transition-all duration-300'>
        <div className='flex-grow'>
            <h3 className='text-xl md:text-2xl font-bold text-white mb-1 truncate'>{data.title}</h3>
            <p className='text-sm text-[#A0AEC0]'>{data.issuer}</p>
        </div>
        <div className='mt-4 flex justify-between items-end'>
            <div className='flex gap-2'>
                {data.tags.map((tag) => (
                    <span key={tag} className='bg-[#4A5568] text-[#CBD5E0] text-xs font-medium px-3 py-1 rounded-full'>
                        {tag}
                    </span>
                ))}
            </div>
            <div className='flex gap-3'>
                <Link
                    href={data.links.preview}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-9 h-9 rounded-full bg-[#4A5568] text-[#CBD5E0] flex items-center justify-center transition-colors hover:bg-[#38B2AC] hover:text-white'
                    aria-label='Preview Certificate'>
                    <VisibilityIcon style={{ fontSize: 20 }} />
                </Link>
            </div>
        </div>
    </div>
);

const Certification = () => (
    <div className='flex justify-center w-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {certificationData.map((cert, idx) => (
                <SpotlightCard key={idx}>
                    <CertificationCard data={cert} />
                </SpotlightCard>
            ))}
        </div>
    </div>
);

export default Certification;
