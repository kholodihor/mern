import React, { useEffect } from "react";
import { FaCarAlt } from "react-icons/fa";
import styles from "./FuturisticCard.module.css";

const FuturisticCard = () => {
  useEffect(() => {
    /* -- Text effect -- */

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let interval: any = null;

    const screen = document.getElementById("screen") as HTMLElement;
    const name = document.getElementById("name") as HTMLElement;

    if (screen) {
      screen.onmouseenter = (event) => {
        let iteration = 0;

        clearInterval(interval);

        interval = setInterval(() => {
          if (name) {
            name.innerText = name.innerText
              .split("")
              .map((letter, index) => {
                if (index < iteration) {
                  return name?.dataset?.value?.[index];
                }

                return letters[Math.floor(Math.random() * 26)];
              })
              .join("");

            if (iteration >= name?.dataset?.value?.length!) {
              clearInterval(interval);
            }

            iteration += 1 / 3;
          }
        }, 30);
      };
    }
  }, []);

  return (
    <article className={styles.cardbody}>
      <div className={styles.screen} id="screen" role="button" tabIndex={0}>
        <div className={styles.screenImage} aria-hidden="true"></div>
        <div className={styles.screenOverlay} aria-hidden="true"></div>
        <div className={styles.screenContent}>
          <FaCarAlt className={styles.screenIcon} aria-hidden="true" />
          <div className={styles.screenUser}>
            <span
              className={styles.name}
              id="name"
              data-value="MERN"
              aria-label="Mern Serwis"
            >
              MERN
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FuturisticCard;