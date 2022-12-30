import { Button, Typography } from "@mui/material";
import styles from "/styles/TicTacToe.module.css";
import { useEffect, useState } from "react";

const players = {
  CPU: {
    SYM: "O",
    NAME: "Bot",
  },
  HUMAN: {
    SYM: "X",
    NAME: "You",
  },
};

function sleep(milliseconds: number) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
interface indexObject {
  arrayIndex: number;
  index: number;
}

interface Props {
    setGameResults: (result: string) => void;
    playAgain: () => void;
}

export default function TicTacToe({setGameResults, playAgain}: Props) {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [isCPUNext, setIsCPUNext] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const finalizeGame = async (player: string | null) => {
    setWinner(player);
    if (player) {
        if (player === players?.HUMAN?.NAME) {
            await setGameResults('won');
        } else if (player === 'draw') {
            await setGameResults('draw');
        } else {
            await setGameResults('lost')
        }
    }
  }

  function playFn(arrayIndex: number, index: number) {
    if (isCPUNext) return;
    if (winner) return;
    board[arrayIndex][index] = players?.HUMAN?.SYM;
    setBoard((board) => [...board]);
    checkWinner();
    setIsCPUNext(true);
  }

  useEffect(() => {
    if (winner) return;
    if (isCPUNext) {
      cPUPlay();
    }
  }, [isCPUNext]);

  function cPUPlay() {
    if (winner) return;
    sleep(500);

    const cPUMove = getCPUTurn();

    board[cPUMove.arrayIndex][cPUMove.index] = players?.CPU?.SYM;

    setBoard((board) => [...board]);
    checkWinner();
    setIsCPUNext(false);
  }

  function getCPUTurn() {
    const emptyIndexes: indexObject[] = [];
    board.forEach((row, arrayIndex) => {
      row.forEach((cell, index) => {
        if (cell === "") {
          emptyIndexes.push({ arrayIndex, index });
        }
      });
    });
    const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
    return emptyIndexes[randomIndex];
  }

  function checkWinner() {
    // check same row
    for (let index = 0; index < board.length; index++) {
      const row = board[index];
      if (row.every((cell) => cell === players?.CPU?.SYM)) {
        finalizeGame(players?.CPU?.NAME);
        return;
      } else if (row.every((cell) => cell === players?.HUMAN?.SYM)) {
        finalizeGame(players?.HUMAN?.NAME);
        return;
      }
    }

    // check same column
    for (let i = 0; i < 3; i++) {
      const column = board.map((row) => row[i]);
      if (column.every((cell) => cell === players?.CPU?.SYM)) {
        finalizeGame(players?.CPU?.NAME);
        return;
      } else if (column.every((cell) => cell === players?.HUMAN?.SYM)) {
        finalizeGame(players?.HUMAN?.NAME);
        return;
      }
    }

    // check same diagonal
    const diagonal1 = [board[0][0], board[1][1], board[2][2]];
    const diagonal2 = [board[0][2], board[1][1], board[2][0]];
    if (diagonal1.every((cell) => cell === players?.CPU?.SYM)) {
        finalizeGame(players?.CPU?.NAME);
      return;
    } else if (diagonal1.every((cell) => cell === players?.HUMAN?.SYM)) {
        finalizeGame(players?.HUMAN?.NAME);
      return;
    } else if (diagonal2.every((cell) => cell === players?.CPU?.SYM)) {
        finalizeGame(players?.CPU?.NAME);
      return;
    } else if (diagonal2.every((cell) => cell === players?.HUMAN?.SYM)) {
        finalizeGame(players?.HUMAN?.NAME);
      return;
    } else if (board.flat().every((cell) => cell !== "")) {
        finalizeGame("draw");
      return;
    } else {
        finalizeGame(null);
      return;
    }
  }

  function displayWinner() {
    if (winner === "draw") {
      return "It's a draw!";
    } else if (winner) {
      return `${winner} won!`;
    }
  }

  function displayTurn() {
    if (isCPUNext) {
      return "CPU's turn";
    } else {
      return "Your turn";
    }
  }

  function playAgainFn() {
    playAgain()
    setBoard([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    finalizeGame(null);
    setIsCPUNext(false);
  }

  return (
    <div>
      {!winner && <Typography sx={{textAlign: "center", mb: 2}} variant="h4">{displayTurn()}</Typography>}
      {winner && <Typography sx={{textAlign: "center", mb: 2}} variant="h4">{displayWinner()}</Typography>}
      <div className={styles.container}>
        <div className={styles.col}>
          <span onClick={() => playFn(0, 0)} className={styles.cell}>
            {board[0][0]}
          </span>
          <span onClick={() => playFn(0, 1)} className={styles.cell}>
            {board[0][1]}
          </span>
          <span onClick={() => playFn(0, 2)} className={styles.cell}>
            {board[0][2]}
          </span>
        </div>
        <div className={styles.col}>
          <span onClick={() => playFn(1, 0)} className={styles.cell}>
            {board[1][0]}
          </span>
          <span onClick={() => playFn(1, 1)} className={styles.cell}>
            {board[1][1]}
          </span>
          <span onClick={() => playFn(1, 2)} className={styles.cell}>
            {board[1][2]}
          </span>
        </div>
        <div className={styles.col}>
          <span onClick={() => playFn(2, 0)} className={styles.cell}>
            {board[2][0]}
          </span>
          <span onClick={() => playFn(2, 1)} className={styles.cell}>
            {board[2][1]}
          </span>
          <span onClick={() => playFn(2, 2)} className={styles.cell}>
            {board[2][2]}
          </span>
        </div>
      </div>

      {winner && (
        <Button
          size="large"
          variant="contained"
          onClick={playAgainFn}
          sx={{ mt: 4 }}
        >
          Play Again
        </Button>
      )}
    </div>
  );
}
