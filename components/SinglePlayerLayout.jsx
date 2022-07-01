import { useEffect } from "react";
import { usePlayer } from "../contexts/PlayerContext";
import styles from "../styles/SinglePlayerLayout.module.css";
import Frame from "./Frame";
import GameOverModal from "./GameOverModal";
import Keyboard from "./Keyboard";
import NavBar from "./NavBar";

const SinglePlayerLayout = () => {
  const {
    gameover,
    gameoverModal,
    setGameoverModal,
    generateEquation,
    setEquation,
  } = usePlayer();

  useEffect(() => {
    setEquation(generateEquation(8));
  }, []);

  useEffect(() => {
    if (gameover) {
      setGameoverModal(true);
    }
  }, [gameover]);
  return (
    <div className={styles.wrapper}>
      {gameoverModal ? <GameOverModal /> : ""}
      <NavBar />
      <Frame />
      <Keyboard />
    </div>
  );
};

export default SinglePlayerLayout;
