import {
    FaLaravel,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaPhp,
    FaPython,
    FaLinux,
    FaFigma,
    FaMicrosoft,
    FaNetworkWired,
    FaCode,
    FaGithub,
} from "react-icons/fa";
import { MdCss } from "react-icons/md";
import { RiNextjsFill, RiTailwindCssFill, RiBootstrapFill } from "react-icons/ri";
import { SiMysql, SiCanva } from "react-icons/si";
import { TbBrandKotlin } from "react-icons/tb";
import { ImWindows } from "react-icons/im";
export const hardSkillsData = [
    {
        title: "My Tech Stack",
        id: 1,
        icons: [
            { name: "Laravel", icon: <FaLaravel /> },
            { name: "Next.js", icon: <RiNextjsFill /> },
            { name: "Tailwind CSS", icon: <RiTailwindCssFill /> },
            { name: "Bootstrap", icon: <RiBootstrapFill /> },
            { name: "HTML5", icon: <FaHtml5 /> },
            { name: "CSS", icon: <MdCss /> },
            { name: "JavaScript", icon: <FaJs /> },
            { name: "PHP", icon: <FaPhp /> },
            { name: "Python", icon: <FaPython /> },
            { name: "MySQL", icon: <SiMysql /> },
            { name: "Kotlin", icon: <TbBrandKotlin /> },
        ],
    },
    {
        title: "Sistem Operasi",
        id: 3,
        icons: [
            { name: "Linux (Fedora)", icon: <FaLinux /> },
            { name: "Windows", icon: <ImWindows /> },
        ],
    },
    {
        title: "Utilities",
        id: 4,
        icons: [
            { name: "GitHub", icon: <FaGithub /> },
            { name: "Figma", icon: <FaFigma /> },
            { name: "Canva", icon: <SiCanva /> },
            { name: "VS Code", icon: <FaCode /> },
            { name: "MS Office", icon: <FaMicrosoft /> },
        ],
    },
];
