import { usePlayer } from "../contexts/PlayerContext";
import styles from "../styles/GameOverModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmarkCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const GameOverModal = () => {
  const { win, guessedResult, setGameoverModal } = usePlayer();
  const blocks = [];
  guessedResult.forEach((result, index) => {
    if (result !== null) {
      blocks.push([]);
      result.forEach((r, i) => {
        let className;
        switch (r) {
          case "correct":
            className = styles.correct;
            break;
          case "misplace":
            className = styles.misplace;
            break;
          case "wrong":
            className = styles.wrong;
            break;
          default:
            className = "";
        }
        blocks[index].push(<div className={className} key={i}></div>);
      });
    }
  });

  const closeModal = () => {
    setGameoverModal(false);
  };

  const goNextGame = () => {
    window.location.reload();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <FontAwesomeIcon
            className={styles.closeBtn}
            icon={faXmark}
            onClick={closeModal}
          />
        </div>
        <div className={styles.body}>
          {win ? (
            <>
              <FontAwesomeIcon
                className={styles.winIcon}
                icon={faCheckCircle}
              />
              <div className={styles.winText}>You Win</div>
              <div className={styles.resultSection}>
                {blocks.map((block, i) => (
                  <div className={styles.guessedFrame} key={i}>
                    {block}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <FontAwesomeIcon
                className={styles.loseIcon}
                icon={faXmarkCircle}
              />

              <div className={styles.loseText}>You Lose</div>
              <div className={styles.resultSection}>
                {blocks.map((block, i) => (
                  <div className={styles.guessedFrame} key={i}>
                    {block}
                  </div>
                ))}
              </div>
            </>
          )}

          <button className={styles.nextRoundBtn} onClick={goNextGame}>
            Next Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
