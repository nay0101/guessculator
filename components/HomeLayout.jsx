import Link from "next/link";
import styles from "../styles/Home.module.css";
import NavBar from "./NavBar";
import Image from "next/image";
import logo from "../public/Guessculator-round.png";
import { useState } from "react";
import HowToPlay from "./HowToPlay";

const HomeLayout = () => {
  // const [openHowToPlay, setOpenHowToPlay] = useState(false);
  return (
    <div className={styles.wrapper}>
      {/* {openHowToPlay ? <HowToPlay setOpenHowToPlay={setOpenHowToPlay} /> : ""} */}
      <NavBar />
      <div className={styles.title}>
        <Image src={logo} width={100} height={100} alt="logo" />
        <div className={styles.titleLetter}>Guessculator</div>
      </div>
      <div className={styles.button}>
        <Link href="/singleplayer">
          <button className={styles.playbutton}>Play</button>
        </Link>
        {/* <button
          className={styles.howToPlayBtn}
          onClick={() => setOpenHowToPlay(true)}
        >
          How To Play
        </button> */}
      </div>
    </div>
  );
};

export default HomeLayout;
