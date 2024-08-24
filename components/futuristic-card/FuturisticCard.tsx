import React, { useEffect } from "react";
import { FaCarAlt } from "react-icons/fa";
import "./card.css";

const FuturisticCard = () => {
  useEffect(() => {
    /* -- Text effect -- */

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let interval: any = null;

    const screen = document.querySelector(".screen") as HTMLElement;
    const name = document.querySelector(".name") as HTMLElement;

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
    <div className="cardbody">
      <div className="screen">
        <div className="screen-image"></div>
        <div className="screen-overlay"></div>
        <div className="screen-content">
          <FaCarAlt className="screen-icon" />
          <div className="screen-user">
            <span className="name" data-value="MERN">
              MERN
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuturisticCard;
