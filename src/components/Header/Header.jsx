/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Header.module.scss';
import { FaBars, FaTimes } from 'react-icons/fa';
import MobileMenu from '../MobileMenu/MobileMenu';

const links = [
  {
    name: 'Strona główna',
    href: '/',
  },
  {
    name: 'O nas',
    href: '#whoweare',
  },
  {
    name: 'Usługi',
    href: '#services',
  },

  {
    name: 'Kontakt',
    href: '#contacts',
  },
];

const Header = () => {
  const { pathname } = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header className={styles.Header}>
      <Link href="/">
        <img src="/logo.png" alt="MERN logo" />
      </Link>
      <button type="button" onClick={toggleMobileMenu}>
        {showMobileMenu ? (
          <FaTimes className={styles.bars} />
        ) : (
          <FaBars className={styles.bars} />
        )}
      </button>
      {showMobileMenu && <MobileMenu links={links} />}
      <nav>
        <ul className={styles.links}>
          {links.map((link, index) => (
            <Link href={link.href} key={index}>
              <li className={pathname === link.href ? styles.active : null}>
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
