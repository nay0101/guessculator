import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/HowToPlay.module.css";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";

const HowToPlay = ({ setOpenHowToPlay }) => {
  const images = [
    [
      "/start.png",
      "Guess the equation in 6 tries. After each guess, the color of the tiles will change to show how close your guess was to the solution.",
    ],
    [
      "/colors.png",
      "Each guess is a calculation and standard order of operations applied.",
    ],
    [
      "/wincolors.png",
      "Yellow tile means the number is in the wrong spot. Gray tile means the number is not included in the equation. Tiles will only go green if the number is in the correct tile.",
    ],
    [
      "/keyboardcolors.png",
      "Keyboard will also change color according to your guess.",
    ],
  ];
  const [selected, setSelected] = useState(0);
  const settings = {
    showThumbs: false,
    showStatus: false,
    showArrows: false,
    showIndicators: false,
    selectedItem: selected,
  };

  const nextSlide = () => {
    if (selected < images.length - 1) {
      setSelected((prev) => prev + 1);
      return;
    }
    setSelected(0);
  };

  const prevSlide = () => {
    if (selected <= 0) {
      setSelected(images.length - 1);
      return;
    }
    setSelected((prev) => prev - 1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button className={styles.closeBtn}>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => setOpenHowToPlay(false)}
            />
          </button>
        </div>
        <div className={styles.body}>
          <div className={styles.title}>How To Play</div>

          <div className={styles.slide}>
            <Carousel
              {...settings}
              onChange={(index) => setSelected(index)}
              className={styles.slideBg}
            >
              {images.map((image, i) => (
                <div className={styles.slide} key={i}>
                  <Image
                    src={image[0]}
                    layout="fill"
                    objectFit="scale-down"
                    alt={`Image ${i}`}
                  />
                </div>
              ))}
            </Carousel>
          </div>

          <div className={styles.description}>
            <div className={styles.descriptionText}>{images[selected][1]}</div>
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.prevBtn} onClick={prevSlide}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className={styles.slideNo}>{selected + 1}</div>
            <button className={styles.nextBtn} onClick={nextSlide}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
