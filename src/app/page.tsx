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
    <div>
      <div
        className="relative overflow-hidden min-h-[100vh]"
      >
        <div
          className="absolute top-0 left-0 w-screen h-screen bg-center bg-no-repeat bg-cover"
          ref={parallaxRef}
          style={{
            backgroundImage: `url('/images/background.jpg')`,
          }}
        />
        <div className="p-4">
          <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1 className="text-[150px] m-5 text-[#9FCC2E] z-50">Art by Sera</h1>
            <p className="text-2xl text-white z-50">Digital Artist</p>
          </div>
        </div>
      </div>
      <Work />
    </div>
  );
}
