import { useEffect } from "react";
import styles from "../styles/Frame.module.css";
import { usePlayer } from "../contexts/PlayerContext";
import Row from "./Row";

const Frame = () => {
  const {
    currentIndex,
    currentGuess,
    handleInput,
    guesses,
    equation,
    error,
    setError,
  } = usePlayer();

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(""), 2000);
    }
  }, [error]);

  useEffect(() => {
    window.addEventListener("keyup", handleInput);
    return () => window.removeEventListener("keyup", handleInput);
  }, [guesses, currentGuess]);

  return (
    <div className={styles.container}>
      <div
        className={styles.errorPopup}
        data-error={error !== "" ? true : false}
      >
        {error}
      </div>
      {guesses.map((guess, index) => (
        <Row
          key={index}
          guess={currentIndex === index ? currentGuess : guess ?? ""}
          isSubmitted={currentIndex !== index && guess !== null}
        />
      ))}
      <button onClick={() => console.log(equation)}>Frame</button>
    </div>
  );
};

export default Frame;
