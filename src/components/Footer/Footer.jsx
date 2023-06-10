import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  const getCurrentYear = new Date().getFullYear().toString();
  return (
    <div className={styles.Footer}>
      <p>Copyright &copy;{getCurrentYear} byCold</p>
    </div>
  );
};

export default Footer;
