'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Button from '../button';

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const mobileVideoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(true); // Start as loaded to avoid infinite loading
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1200], [0, 600]);
    const opacity = useTransform(scrollY, [50, 800], [1, 0]);
    const scale = useTransform(scrollY, [0, 800], [1, 1.1]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const x = (e.clientX - centerX) / rect.width;
            const y = (e.clientY - centerY) / rect.height;

            setMousePosition({ x, y });
            mouseX.set(x * 20);
            mouseY.set(y * 20);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Enhanced video loading
    const handleVideoLoad = () => {
        setIsLoaded(true);
    };

    // Ensure loading state is set to true after component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1.2,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 60, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8
            }
        }
    };

    return (
        <motion.section
            ref={sectionRef}
            className="relative z-10 w-full h-[100vh] min-h-[500px] sm:min-h-[600px] overflow-hidden flex items-center justify-center text-center"
            style={{ y, opacity }}
        >
            {/* Enhanced Video Background */}
            <motion.div
                className="absolute inset-0 z-[0] overflow-hidden"
                style={{ scale }}
            >
                {/* Desktop Video */}
                <div className="absolute inset-0 w-full h-full hidden sm:block">
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        src="/hero-video2.mp4"
                        className="w-full h-full object-cover"
                        onLoadedData={handleVideoLoad}
                        onCanPlay={handleVideoLoad}
                        onLoadedMetadata={(e) => {
                            const video = e.target as HTMLVideoElement;
                            handleVideoLoad();
                            video.play().catch(() => console.log('Desktop video autoplay blocked'));
                        }}
                    />

                </div>

                {/* Mobile Video */}
                <div className="absolute inset-0 w-full h-full block sm:hidden">
                    <video
                        ref={mobileVideoRef}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        src="/hero-video-square2.mp4"
                        className="w-full h-full object-cover"
                        onLoadedData={handleVideoLoad}
                        onCanPlay={handleVideoLoad}
                        onLoadedMetadata={(e) => {
                            const video = e.target as HTMLVideoElement;
                            handleVideoLoad();
                            video.play().catch(() => console.log('Mobile video autoplay blocked'));
                        }}
                    />

                </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 max-w-4xl px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                style={{
                    x: useTransform(mouseX, [-1, 1], [-5, 5]),
                    y: useTransform(mouseY, [-1, 1], [-5, 5])
                }}
            >
                {/* Main Headline */}
                <motion.h1
                    variants={itemVariants}
                    className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight text-white mb-4 sm:mb-6"
                >
                    I create systems{' '}
                    <br className="hidden sm:block" />
                    <motion.span
                        className="gradient-text inline-block"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        with rhythm and logic.
                    </motion.span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-300 mb-8 sm:mb-12 font-body max-w-2xl mx-auto leading-relaxed px-4 sm:px-0"
                >
                    I'm{' '}
                    <motion.span
                        className="text-white font-medium"
                        whileHover={{ color: "#2dd4bf" }}
                        transition={{ duration: 0.2 }}
                    >
                        Renato DAP
                    </motion.span>
                    {' '}— an engineer and creator focused on building what matters.
                </motion.p>




            </motion.div>


        </motion.section>
    );
}
