import { createContext, useContext, useEffect, useState } from "react";

const playerContext = createContext();

const usePlayer = () => {
  return useContext(playerContext);
};

const PlayerProvider = ({ children }) => {
  const ROWS_COUNT = 6;
  const EQUATION_LENGTH = 8;
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guesses, setGuesses] = useState(Array(ROWS_COUNT).fill(null));
  const [gameover, setGameover] = useState(false);
  const [win, setWin] = useState(false);
  const [equation, setEquation] = useState("");
  const [error, setError] = useState("");
  const [gameoverModal, setGameoverModal] = useState(false);
  const [guessedResult, setGuessedResult] = useState(
    Array(ROWS_COUNT).fill(null)
  );

  const handleInput = (e, value = "") => {
    const key = e.key || value;
    if (gameover) return;
    const eqFilter = /^[0-9+\-*/=]|(Backspace|Enter)+$/;
    const temp_operators = ["+", "-", "*", "/"];
    if (!eqFilter.test(key)) {
      return;
    }
    if (key === "Enter") {
      if (currentGuess.length !== EQUATION_LENGTH) {
        setError("You need to fill up the squares.");
        return;
      }

      if (
        !currentGuess.includes("+") &&
        !currentGuess.includes("-") &&
        !currentGuess.includes("*") &&
        !currentGuess.includes("/")
      ) {
        setError("The equation needs to include at least one operator.");
        return;
      }
      if (!currentGuess.includes("=")) {
        setError("The equation needs to include '='.");
        return;
      }

      if (currentGuess[0] === "/" || currentGuess[0] === "*") {
        setError("Invalid Equation.");
        return;
      }

      if (currentGuess.split("=").length - 1 !== 1) {
        setError("There are multiple '=' in the equation.");
        return;
      }
      let [LHS, RHS] = currentGuess.split("=");

      LHS = formatEquation(LHS);
      RHS = formatEquation(RHS);

      for (let i = 0; i < LHS.length; i++) {
        if (LHS[i].length > 1) {
          if (i === LHS.length - 1) {
            if (temp_operators.includes(LHS[i][0])) {
              setError("Invalid Equation.");
              return;
            }
          }
          if (
            temp_operators.includes(LHS[i][0]) &&
            temp_operators.includes(LHS[i][1])
          ) {
            setError("Invalid Equation.");
            return;
          }
        }
      }

      for (let i = 0; i < RHS.length; i++) {
        if (RHS[i].length > 1) {
          if (i === RHS.length - 1) {
            if (temp_operators.includes(RHS[i][0])) {
              setError("Invalid Equation.");
              return;
            }
          }
          if (
            temp_operators.includes(RHS[i][0]) &&
            temp_operators.includes(RHS[i][1])
          ) {
            setError("Invalid Equation.");
            return;
          }
        }
      }

      if (calculateArray(LHS) !== calculateArray(RHS)) {
        setError("Left side in not equal to the right side.");
        return;
      }

      const temp_guess = [...guesses];
      temp_guess[currentIndex] = currentGuess;
      setGuesses(temp_guess);
      if (currentGuess === equation) {
        setGameover(true);
        setWin(true);
      } else if (currentIndex === ROWS_COUNT - 1) {
        setGameover(true);
      }
      setCurrentIndex((prev) => prev + 1);
      setCurrentGuess("");
      return;
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (currentGuess.length !== EQUATION_LENGTH) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  const resetEverything = () => {
    setCurrentGuess("");
    setCurrentIndex(0);
    setGuesses(Array(ROWS_COUNT).fill(null));
    setGameover(false);
    setWin(false);
    setEquation("");
    setError("");
    setGameoverModal(false);
    setGuessedResult(Array(ROWS_COUNT).fill(null));
  };

  const generateEquation = (length) => {
    const equationLength = length;
    const maxOperatorCount = Math.floor(equationLength / 2 - 1);
    const minOperatorCount = 1;
    const possibleOperators = ["+", "-", "/", "*"];
    const possibleNumbers = "0123456789";
    const operatorsToUse = [];
    const numbersToUse = [];

    const randomOperatorCount = getRandomInt(
      minOperatorCount,
      maxOperatorCount
    );

    for (let i = 0; i < randomOperatorCount; i++) {
      operatorsToUse.push(
        possibleOperators[getRandomInt(0, possibleOperators.length - 1)]
      );
    }

    if (
      operatorsToUse[0] !== "-" &&
      operatorsToUse.length === maxOperatorCount
    ) {
      operatorsToUse.splice(-1, 1);
    }

    const LHSNumberCount =
      maxOperatorCount > 1 && operatorsToUse.length === maxOperatorCount
        ? operatorsToUse.length
        : getRandomInt(
            operatorsToUse.length + 1,
            equationLength - operatorsToUse.length - 2
          );

    for (let i = 0; i < LHSNumberCount; i++) {
      numbersToUse.push(
        possibleNumbers[getRandomInt(0, possibleNumbers.length - 1)]
      );
    }

    const LHSequationLength = operatorsToUse.length + LHSNumberCount;
    const LHSequation = Array(LHSequationLength);

    for (let i = 0; i < LHSequationLength; i++) {
      if (operatorsToUse.length === 0) break;
      if (operatorsToUse.length === maxOperatorCount) {
        LHSequation[i] = operatorsToUse[0];
        operatorsToUse.splice(0, 1);
        continue;
      }
      if (i !== 0 && i !== LHSequationLength - 1) {
        if (!possibleOperators.includes(LHSequation[i - 1])) {
          LHSequation[i] = operatorsToUse[0];
          operatorsToUse.splice(0, 1);
        }
      }
    }

    for (let j = 0; j < LHSequationLength; j++) {
      if (numbersToUse.length === 0) break;
      if (LHSequation[j] === undefined) {
        LHSequation[j] = numbersToUse[0];
        numbersToUse.splice(0, 1);
      }
    }

    const eqString = LHSequation.join("");
    const formattedEqArray = formatEquation(eqString);
    for (let i = 0; i < formattedEqArray.length; i++) {
      if (formattedEqArray[i].length > 1 && formattedEqArray[i][0] === "0") {
        let temp_number = "";
        for (let j = 0; j < formattedEqArray[i].length; j++) {
          temp_number += getRandomInt(1, 9).toString();
        }
        formattedEqArray.splice(i, 1, temp_number);
      }
    }

    const RHSAnswer = calculateArray(formatEquation(eqString));
    if (!RHSAnswer) return generateEquation(length);
    const finalEquation = eqString + "=" + RHSAnswer;
    if (finalEquation.length !== equationLength)
      return generateEquation(length);

    return finalEquation;
  };

  const formatEquation = (expression) => {
    var copy = expression;
    expression = expression.replace(/[0-9]+/g, "#");
    var numbers = copy.split(/[^0-9\.]+/).filter((n) => n);
    var operators = expression.split("#").filter((n) => n);
    var result = [];

    for (let i = 0; i < numbers.length; i++) {
      if (operators.length === numbers.length) {
        result.push(operators[i]);
        result.push(numbers[i]);
      } else {
        result.push(numbers[i]);
        if (i < operators.length) result.push(operators[i]);
      }
    }
    return result;
  };

  const calculateArray = (arrayEquation) => {
    let result;
    let temp_array = [...arrayEquation];
    const divide = temp_array.indexOf("/");
    const multiply = temp_array.indexOf("*");
    const substract = temp_array.indexOf("-");
    const add = temp_array.indexOf("+");

    if (temp_array.length === 1) return parseInt(temp_array[0]);

    if (add === 0) {
      temp_array.splice(add, 1);
    }
    if (substract === 0) {
      if (temp_array[substract + 1] === "0") {
        temp_array.splice(substract + 1, 1, getRandomInt(1, 9).toString());
      }
      result = parseInt(temp_array[substract] + temp_array[substract + 1]);
      temp_array.splice(substract, 2, result);
    } else if (divide > 0) {
      if (parseInt(temp_array[divide + 1]) === 0) return false;

      if (
        parseInt(temp_array[divide - 1]) % parseInt(temp_array[divide + 1]) !==
        0
      )
        return false;
      result =
        parseInt(temp_array[divide - 1]) / parseInt(temp_array[divide + 1]);
      temp_array.splice(divide - 1, 3, result);
    } else if (multiply > 0) {
      result =
        parseInt(temp_array[multiply - 1]) * parseInt(temp_array[multiply + 1]);
      temp_array.splice(multiply - 1, 3, result);
    } else if (add > 0) {
      result = parseInt(temp_array[add - 1]) + parseInt(temp_array[add + 1]);
      temp_array.splice(add - 1, 3, result);
    } else if (substract > 0) {
      result =
        parseInt(temp_array[substract - 1]) -
        parseInt(temp_array[substract + 1]);
      temp_array.splice(substract - 1, 3, result);
    }
    return calculateArray(temp_array);
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(
      Math.random() * (max - min + 1) + min
    ); /* for min and max inclusive */
  };

  const values = {
    generateEquation,
    ROWS_COUNT,
    EQUATION_LENGTH,
    currentIndex,
    currentGuess,
    handleInput,
    guesses,
    equation,
    setEquation,
    error,
    setError,
    gameover,
    win,
    guessedResult,
    setGuessedResult,
    gameoverModal,
    setGameoverModal,
    resetEverything,
  };
  return (
    <playerContext.Provider value={values}>{children}</playerContext.Provider>
  );
};

export { usePlayer, PlayerProvider };
