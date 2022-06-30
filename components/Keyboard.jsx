import { useEffect, useState } from "react";
import { usePlayer } from "../contexts/PlayerContext";
import styles from "../styles/Keyboard.module.css";

const Keyboard = () => {
  const { handleInput, guesses, equation } = usePlayer();
  const [usedKeys, setUsedKeys] = useState({
    correct: [],
    misplace: [],
    wrong: [],
  });

  useEffect(() => {
    if (guesses[0] !== null) {
      const guessToCheck = guesses[guesses.indexOf(null) - 1].split("");
      let temp_equation = equation.split("");
      let correct = [...usedKeys.correct],
        misplace = [...usedKeys.misplace],
        wrong = [...usedKeys.wrong];

      //check correct words
      guessToCheck.forEach((g, index) => {
        if (g === temp_equation[index]) {
          if (!correct.includes(g)) {
            correct.push(g);
          }
        }
      });

      //check misplaced words
      guessToCheck.forEach((g, index) => {
        if (temp_equation.includes(g)) {
          if (correct.includes(g) && misplace.includes(g)) {
            misplace.splice(misplace.indexOf(g), 1);
          } else if (!correct.includes(g) && !misplace.includes(g)) {
            misplace.push(g);
          }
        }
      });

      //check wrong words
      guessToCheck.forEach((g, index) => {
        if (
          !correct.includes(g) &&
          !misplace.includes(g) &&
          !wrong.includes(g)
        ) {
          wrong.push(g);
        }
      });

      setUsedKeys((prev) => ({
        ...prev,
        correct,
        misplace,
        wrong,
      }));
    }
  }, [guesses]);

  let numbers = [];
  let otherkeys = [];
  for (let i = 0; i <= 9; i++) {
    numbers.push(i.toString());
  }
  otherkeys.push("+", "-", "*", "/", "=", "Backspace", "Enter");
  return (
    <div className={styles.container}>
      <div className={styles.number}>
        {numbers.map((number) => (
          <div
            className={`${styles.key} ${
              usedKeys.correct.includes(number)
                ? styles.key_correct
                : usedKeys.misplace.includes(number)
                ? styles.key_misplace
                : usedKeys.wrong.includes(number)
                ? styles.key_wrong
                : styles.default_key
            }`}
            key={number}
            onClick={(e) => handleInput(e, number)}
          >
            {number}
          </div>
        ))}
      </div>
      <div className={styles.other}>
        {otherkeys.map((key) => (
          <div
            className={`${styles.key} ${
              usedKeys.correct.includes(key)
                ? styles.key_correct
                : usedKeys.misplace.includes(key)
                ? styles.key_misplace
                : usedKeys.wrong.includes(key)
                ? styles.key_wrong
                : styles.default_key
            }`}
            key={key}
            onClick={(e) => handleInput(e, key)}
          >
            {key === "Backspace" ? "<" : key}
          </div>
        ))}
      </div>
      <button onClick={() => console.log(usedKeys)}>Keys</button>
    </div>
  );
};

export default Keyboard;
