import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './MobileMenu.module.scss';

const MobileMenu = ({ links }) => {
  const { pathname } = useRouter();
  return (
    <nav className={styles.MobileMenu}>
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
  );
};

export default MobileMenu;
