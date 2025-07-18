"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { musicPlaylist } from "../../data/playlist";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);
    return isMobile;
};

const MusicPlayer = ({ audioRef, shouldPlayInitially }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const isMobile = useIsMobile();
    const trackInfo = musicPlaylist[currentTrackIndex];
    const playlist = musicPlaylist;
    const hasInitialized = useRef(false);

    const handleNext = useCallback(
        (e) => {
            if (e && typeof e.stopPropagation === "function") e.stopPropagation();
            const nextIndex = (currentTrackIndex + 1) % playlist.length;
            setCurrentTrackIndex(nextIndex);
            const audio = audioRef.current;
            if (audio) {
                audio.src = playlist[nextIndex].src;
                audio.play().catch((err) => console.error(err));
            }
        },
        [currentTrackIndex, audioRef, playlist]
    );

    const handlePrev = useCallback(
        (e) => {
            if (e) e.stopPropagation();
            const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
            setCurrentTrackIndex(prevIndex);
            const audio = audioRef.current;
            if (audio) {
                audio.src = playlist[prevIndex].src;
                audio.play().catch((err) => console.error(err));
            }
        },
        [currentTrackIndex, audioRef, playlist]
    );

    const togglePlayPause = useCallback(
        (e) => {
            e.stopPropagation();
            const audio = audioRef.current;
            if (audio.paused) {
                if (!audio.src) {
                    audio.src = playlist[0].src;
                }
                audio.play().catch((error) => console.error("Error playing audio:", error));
            } else {
                audio.pause();
            }
        },
        [audioRef, playlist]
    );

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (!hasInitialized.current) {
            audio.src = playlist[0].src;
            if (shouldPlayInitially) {
                audio.play().catch((e) => console.error("Failed to start music:", e));
            }
            hasInitialized.current = true;
        }

        const syncPlayState = () => setIsPlaying(!audio.paused);
        syncPlayState();
        audio.addEventListener("play", syncPlayState);
        audio.addEventListener("pause", syncPlayState);
        audio.addEventListener("ended", handleNext);

        return () => {
            audio.removeEventListener("play", syncPlayState);
            audio.removeEventListener("pause", syncPlayState);
            audio.removeEventListener("ended", handleNext);
        };
    }, [audioRef, shouldPlayInitially, handleNext, playlist]);

    if (!trackInfo) return null;

    if (!isExpanded) {
        const isCircular = isMobile;
        return (
            <motion.div
                layoutId='music-player'
                className={`fixed top-20 right-5 z-[200] shadow-2xl cursor-pointer bg-[#1e1e1e]/50 backdrop-blur-md text-white overflow-hidden ${
                    isCircular ? "w-14 h-14 rounded-full" : "w-auto rounded-xl"
                }`}
                onClick={() => setIsExpanded(true)}>
                <div className={`flex items-center ${isCircular ? "h-full justify-center" : "p-2 space-x-3"}`}>
                    {isCircular ? (
                        <>
                            <Image src={trackInfo.albumArt} alt={trackInfo.title} layout='fill' objectFit='cover' className='rounded-full' />
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <button
                                    onClick={togglePlayPause}
                                    className='w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer'
                                    aria-label={isPlaying ? "Pause" : "Play"}>
                                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Image
                                src={trackInfo.albumArt}
                                alt={trackInfo.title}
                                width={48}
                                height={48}
                                className='rounded-md w-12 h-12 object-cover'
                            />
                            <div>
                                <p className='font-bold text-sm leading-tight'>{trackInfo.title}</p>
                                <p className='text-xs text-gray-400'>{trackInfo.artist}</p>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            layoutId='music-player'
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className='fixed top-20 right-5 z-[2000] w-60 rounded-xl shadow-2xl bg-[#1e1e1e]/50 backdrop-blur-md text-white overflow-hidden '>
            <div className='p-4 flex flex-col cursor-default'>
                <div className='relative mb-4'>
                    <Image
                        src={trackInfo.albumArt}
                        alt={trackInfo.title}
                        width={256}
                        height={256}
                        className='rounded-lg w-full h-auto aspect-square object-cover'
                    />
                    <button
                        onClick={() => setIsExpanded(false)}
                        className='absolute top-2 left-2 text-white bg-black/20 rounded-full p-1 transition-colors hover:bg-black/40 cursor-pointer'
                        aria-label='Tutup pemutar musik'>
                        <CloseFullscreenIcon fontSize='small' />
                    </button>
                </div>

                <div className='text-center mb-4'>
                    <p className='text-xl font-bold'>{trackInfo.title}</p>
                    <p className='text-sm text-gray-300'>{trackInfo.artist}</p>
                </div>
                <div className='flex justify-around items-center mb-2'>
                    <button className='text-gray-300 hover:text-white cursor-pointer' onClick={handlePrev}>
                        <SkipPreviousIcon />
                    </button>
                    <button
                        onClick={togglePlayPause}
                        className='bg-white text-black rounded-full p-3 w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer'>
                        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </button>
                    <button className='text-gray-300 hover:text-white cursor-pointer' onClick={handleNext}>
                        <SkipNextIcon />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default MusicPlayer;
