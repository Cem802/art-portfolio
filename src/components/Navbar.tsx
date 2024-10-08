'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faBars, faClose, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="absolute w-full p-6 z-50">
        <div className="container mx-auto flex items-center justify-between">
            <div className="text-2xl font-bold z-50">
                <Link href="/">
                    <Image src="/images/logo4.png" alt="logo" width={100} height={100} />
                </Link>
            </div>
            <div className='relative z-50'>
                <div className="md:hidden" onClick={toggleMenu}>
                    <button className="text-white focus:outline-none">
                        {isOpen ? (
                            <FontAwesomeIcon icon={faClose} size='xl' />
                        ) : (
                            <FontAwesomeIcon icon={faBars} size='xl' />
                        )}
                    </button>
                </div>
                <ul className={`absolute right-0 md:relative text-right mt-2 md:flex md:items-center space-y-2 md:space-y-0 md:space-x-20 ${isOpen ? 'block' : 'hidden'}`}>
                    <li>
                        <Link href="/">
                            <p className={`text-white hover:text-[#9FCC2E] ${isActive('/') ? 'border-b-2 border-[#9FCC2E]' : ''}`}>HOME</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/#work">
                            <p className={`text-white hover:text-[#9FCC2E] ${isActive('#work') ? 'border-b-2 border-[#9FCC2E]' : ''}`}>WORK</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            <p className={`text-white hover:text-[#9FCC2E] ${isActive('/about') ? 'border-b-2 border-[#9FCC2E]' : ''}`}>ABOUT</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact">
                            <p className={`text-white hover:text-[#9FCC2E] ${isActive('/contact') ? 'border-b-2 border-[#9FCC2E]' : ''}`}>CONTACT</p>
                        </Link>
                    </li>
                    {/* <li className='md:hidden'>
                        <a href="https://www.instagram.com/aresaiart" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#9FCC2E]">
                            <FontAwesomeIcon icon={faInstagram} size='xl' />
                        </a>
                    </li> */}
                    <li className='md:hidden'>
                        <a href="mailto:sera.kirciltepeli@gmail.com" className="text-white hover:text-[#9FCC2E]">
                            <FontAwesomeIcon icon={faEnvelope} size='xl' />
                        </a>
                    </li>
                </ul>
            </div>
            <ul className='hidden md:block z-50'>
                {/* <li>
                    <a href="https://www.instagram.com/aresaiart" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#9FCC2E]">
                        <FontAwesomeIcon icon={faInstagram} size='2x' />
                    </a>
                </li> */}
                <li>
                    <a href="mailto:sera.kirciltepeli@gmail.com" className="text-white hover:text-[#9FCC2E]">
                        <FontAwesomeIcon icon={faEnvelope} size='2x' />
                    </a>
                </li>
            </ul>
        </div>
    </nav>
  );
};

export default Navbar;