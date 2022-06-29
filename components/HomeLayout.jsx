import Link from "next/link";
import styles from "../styles/Home.module.css";
import NavBar from "./NavBar";

const HomeLayout = () => {
  return (
    <div className={styles.wrapper}>
      <NavBar />
      <div className={styles.title}>Guessculator</div>
      <Link href="/singleplayer">
        <button className={styles.playbutton}>Play</button>
      </Link>
    </div>
  );
};

export default HomeLayout;
