import styles from "../styles/Row.module.css";
import { usePlayer } from "../contexts/PlayerContext";
import { useEffect, useState } from "react";

const Row = ({ guess, isSubmitted, index }) => {
  const { EQUATION_LENGTH, equation, guessedResult, setGuessedResult } =
    usePlayer();
  const [words, setWords] = useState([]);

  useEffect(() => {
    const temp_words = [],
      temp_colors = [...guessedResult],
      temp_colorWords = [];
    const coloredGuess = formatGuess();
    coloredGuess.forEach((g, i) => {
      let className = "";
      switch (g.state) {
        case "correct":
          className = styles.block_correct;
          temp_colorWords.push(g.state);
          break;
        case "misplace":
          className = styles.block_misplace;
          temp_colorWords.push(g.state);
          break;
        case "wrong":
          className = styles.block_wrong;
          temp_colorWords.push(g.state);
          break;
        default:
          className = styles.default_block;
          temp_colorWords.push(g.state);
      }
      temp_words.push(
        <div className={`${styles.words_container} ${className}`} key={i}>
          {g.value}
        </div>
      );
    });
    if (isSubmitted) {
      temp_colors[index] = temp_colorWords;
      setGuessedResult(temp_colors);
    }
    setWords(temp_words);
  }, [guess, isSubmitted]);

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

  return <div className={styles.container}>{words}</div>;
};

export default Row;
