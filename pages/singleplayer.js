import SinglePlayerLayout from "../components/SinglePlayerLayout";
import { PlayerProvider } from "../contexts/PlayerContext";

const SinglePlayer = () => {
  return (
    <PlayerProvider>
      <SinglePlayerLayout />
    </PlayerProvider>
  );
};

export default SinglePlayer;
