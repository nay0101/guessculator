import styles from "../styles/Row.module.css";
import { usePlayer } from "../contexts/PlayerContext";

const Row = ({ guess, isSubmitted }) => {
  const words = [];
  const { EQUATION_LENGTH, equation } = usePlayer();

  const formatGuess = () => {
    let temp_equation = equation.split("");
    let formattedGuess = [];
    for (let i = 0; i < EQUATION_LENGTH; i++) {
      formattedGuess.push({ value: guess[i], state: "default" });
    }
    if (isSubmitted) {
      formattedGuess.forEach((eq, i) => {
        if (temp_equation[i] === eq.value) {
          formattedGuess[i].state = "correct";
          temp_equation[i] = null;
        }
      });
      formattedGuess.forEach((eq, i) => {
        if (temp_equation.includes(eq.value) && eq.state !== "correct") {
          formattedGuess[i].state = "misplace";
          temp_equation[temp_equation.indexOf(eq.value)] = null;
        }
      });
      formattedGuess.forEach((eq, i) => {
        if (eq.state !== "correct" && eq.state !== "misplace") {
          formattedGuess[i].state = "wrong";
        }
      });
    }

    return formattedGuess;
  };

  const coloredGuess = formatGuess();
  coloredGuess.forEach((g, i) => {
    let className = "";
    switch (g.state) {
      case "correct":
        className = styles.block_correct;
        break;
      case "misplace":
        className = styles.block_misplace;
        break;
      case "wrong":
        className = styles.block_wrong;
        break;
      default:
        className = styles.default_block;
    }
    words.push(
      <div className={`${styles.words_container} ${className}`} key={i}>
        {g.value}
      </div>
    );
  });

  return <div className={styles.container}>{words}</div>;
};

export default Row;
