import styles from "../styles/SinglePlayerLayout.module.css";
import Frame from "./Frame";
import Keyboard from "./Keyboard";
import NavBar from "./NavBar";

const SinglePlayerLayout = () => {
  return (
    <div className={styles.wrapper}>
      <NavBar />
      <Frame />
      <Keyboard />
    </div>
  );
};

export default SinglePlayerLayout;
