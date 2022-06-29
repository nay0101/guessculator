import Block from "./Block";
import styles from "../styles/Row.module.css";
import { usePlayer } from "../contexts/PlayerContext";

const Row = ({ guess, isSubmitted }) => {
  const words = [];
  const { EQUATION_LENGTH } = usePlayer();
  for (let i = 0; i < EQUATION_LENGTH; i++) {
    words.push(guess[i]);
  }
  return (
    <div className={styles.container}>
      {words.map((word, i) => (
        <Block value={word} index={i} isSubmitted={isSubmitted} key={i} />
      ))}
    </div>
  );
};

export default Row;
