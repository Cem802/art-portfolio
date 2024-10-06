'use client'
import Navbar from "@/components/Navbar";
import Work from "@/components/Work";
import { useEffect, useRef, RefObject } from "react";

export default function Home() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-black">
      <div
        className="relative overflow-hidden min-h-[100vh]"
      >
        <div
          className="absolute top-0 left-0 w-screen h-screen bg-right bg-no-repeat bg-cover"
          ref={parallaxRef}
          style={{
            backgroundImage: `url('/images/background2.png')`,
          }}
        />
        <div className="p-4">
          <div className="w-full h-screen flex flex-col justify-center items-center -translate-y-20">
            <h1 className="md:text-[150px] text-[80px] text-center m-5 text-white z-50">Art by Sera</h1>
            <p className="text-2xl text-[#9FCC2E] z-50">Digital Artist</p>
          </div>
        </div>
      </div>
      <Work />
    </div>
  );
}
