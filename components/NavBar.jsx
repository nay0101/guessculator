import styles from "../styles/NavBar.module.css";
import Image from "next/image";
import logo from "../public/Guessculator-round.png";
import { usePlayer } from "../contexts/PlayerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarChart } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
  const title = "Guessculator";
  const { gameover, setGameoverModal, resetEverything } = usePlayer();
  const router = useRouter();

  const openModal = () => {
    setGameoverModal(true);
  };

  const backToHome = () => {
    resetEverything();
    router.push("/");
  };

  return (
    <nav className={styles.container}>
      <div className={styles.title} onClick={backToHome}>
        <Image src={logo} width={40} height={40} alt="logo" />
        <div className={styles.titleLetter}>{title}</div>
      </div>

      {gameover ? (
        <button className={styles.resultBtn} onClick={openModal}>
          <FontAwesomeIcon icon={faBarChart} /> Result
        </button>
      ) : (
        ""
      )}
    </nav>
  );
};

export default NavBar;
