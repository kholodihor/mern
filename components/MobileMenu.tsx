import React from 'react';
import Link from 'next/link';
import { TLink } from '@/types';

const MobileMenu = ({ links }: { links: TLink[] }) => {
  return (
    <nav className="w-full h-[85vh] absolute top-[15vh] left-0 bg-black">
      <ul className="w-full h-full m-0 p-4 flex flex-col justify-center items-center gap-4 ">
        {links.map((link, index) => (
          <Link href={link.href} key={index}>
            <li className="relative uppercase text-xl" id="link">
              {link.name}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenu;
