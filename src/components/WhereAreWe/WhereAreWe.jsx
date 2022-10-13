import React from 'react';
import styles from './WhereAreWe.module.scss';
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import MernMap from '../Map/MernMap';

const WhereAreWe = () => {
  return (
    <section
      id="contacts"
      className={styles.WhereAreWe}
      data-aos="fade-up"
      data-aos-once="true"
    >
      <div className={styles.contact}>
        <h1 className={styles.title}>nasze kontakty</h1>
        <ul>
          <li>
            <span>
              <FaMapMarkerAlt className={styles.icon} />
            </span>
            <span>Przyszłość 2A, 05-126 Stanisławów Pierwszy</span>
          </li>
          <li>
            <span>
              <FaPhone className={styles.icon} />
            </span>
            <span>
              <a href="tel:+48 509 158 159">+48 509 158 159</a>
            </span>
          </li>
          <li>
            <span>
              <FaEnvelope className={styles.icon} />
            </span>
            <span>
              <a href="mailto: mern.serwis@gmail.com">mern.serwis@gmail.com</a>
            </span>
          </li>
        </ul>
      </div>
      <div className={styles.map}>
        <MernMap />
      </div>
    </section>
  );
};

export default WhereAreWe;
