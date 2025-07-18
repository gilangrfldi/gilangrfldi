"use client";

import "./Experience.css";

import { experienceData } from "../../data/experience";

const TimelineItem = ({ data }) => (
    <div className='timeline-item'>
        <div className='timeline-item-content'>
            <span className='timeline-tag'>{data.date}</span>
            <h3 className='text-xl md:text-2xl font-bold text-white mb-1 mt-2'>{data.title}</h3>
            <p className='timeline-company text-sm text-[#A0AEC0]'>{data.company}</p>
            <p className='timeline-description'>{data.description}</p>
            <span className='timeline-circle' />
        </div>
    </div>
);

const Experience = () => (
    <div className='timeline-container'>
        {experienceData.map((data, idx) => (
            <TimelineItem data={data} key={idx} />
        ))}
    </div>
);

export default Experience;
