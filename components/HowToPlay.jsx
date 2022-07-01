import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/HowToPlay.module.css";

const HowToPlay = ({ setOpenHowToPlay }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <FontAwesomeIcon
            className={styles.closeBtn}
            icon={faXmark}
            onClick={() => setOpenHowToPlay(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
