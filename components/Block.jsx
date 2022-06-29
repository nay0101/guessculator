import { usePlayer } from "../contexts/PlayerContext";
import styles from "../styles/Block.module.css";

const Block = ({ value, index, isSubmitted }) => {
  const { equation } = usePlayer();
  let indicator = "";
  if (value === equation[index]) {
    indicator = "correct";
  } else if (equation.includes(value)) {
    indicator = "misplace";
  } else {
    indicator = "wrong";
  }

  return (
    <div
      className={`${styles.container} ${
        isSubmitted
          ? indicator === "correct"
            ? styles.block_correct
            : indicator === "misplace"
            ? styles.block_misplace
            : styles.block_wrong
          : styles.default_block
      }`}
    >
      {value}
    </div>
  );
};

export default Block;
