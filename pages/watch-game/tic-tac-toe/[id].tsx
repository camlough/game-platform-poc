import Grid from "@mui/material/Grid";
import TicTacToe from "../../../components/games/TicTacToe";
import { Typography } from "@mui/material";

const WatchTicTacToeGame = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      sx={{ mt: 10 }}
    >
      <Grid item>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          You are a spectator to this game 👀
        </Typography>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          You cannot play
        </Typography>
      </Grid>
      <Grid item>
        <TicTacToe
          spectateMode
          setGameResults={() => {
            return;
          }}
          playAgain={() => {
            return;
          }}
        />
      </Grid>
    </Grid>
  );
};

export default WatchTicTacToeGame;
