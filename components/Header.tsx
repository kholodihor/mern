'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import { links } from '@/constants';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header
      className={`absolute top-0 left-0 w-full h-[15vh] py-2 px-6  flex justify-between items-center z-50 ${
        showMobileMenu ? 'bg-black' : 'bg-black/50'
      }`}
      id="header"
    >
      <Link href="/">
        <Image src="/logo.png" alt="MERN logo" width={150} height={150} />
      </Link>
      <button
        type="button"
        onClick={toggleMobileMenu}
        className="block sm:hidden border-none bg-none text-white mr-[1.5rem]"
      >
        {showMobileMenu ? (
          <FaTimes className=" text-[2rem] transition-all" />
        ) : (
          <FaBars className="text-[2rem] transition-all" />
        )}
      </button>
      {showMobileMenu && <MobileMenu links={links} />}
      <nav className="hidden sm:block">
        <ul className="m-0 flex justify-around gap-4 p-2" id="links">
          {links.map((link, index) => (
            <Link href={link.href} key={index}>
              <li
                className="uppercase relative text-white hover:text-blue-400 transition-all"
                id="link"
              >
                {link.name}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
