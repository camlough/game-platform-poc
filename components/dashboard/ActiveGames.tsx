// ** React Imports
import { ChangeEvent, useState } from "react";

import Link from "next/link";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

// ** Icons Imports
import Magnify from "mdi-material-ui/Magnify";

interface DataType {
  title: string;
  gameType: string;
  players: string[];
  imagePath: string;
}

const gameData = [
  {
    gameType: "tic-tac-toe",
    title: "Tic Tac Toe",
    players: ["camlough", "johndoe"],
    imagePath: "/images/misc/tic-tac-toe.png",
  },
  {
    gameType: "chess",
    title: "Chess",
    players: ["billybob", "BotOne"],
    imagePath: "/images/misc/chess.png",
  },
  {
    gameType: "chess",
    title: "Chess",
    players: ["susan", "BotTwo"],
    imagePath: "/images/misc/chess.png",
  },
  {
    gameType: "tic-tac-toe",
    title: "Tic Tac Toe",
    players: ["kristin", "danny"],
    imagePath: "/images/misc/tic-tac-toe.png",
  },
];

const ActiveGames = () => {
  const [activeGames, setActiveGames] = useState(gameData);

  const handleSearchChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const filteredGames = gameData.filter((game) => {
      return game.players.some((player) =>
        player.toLowerCase().includes(event.target.value)
      );
    });
    setActiveGames(filteredGames);
  };
  return (
    <Card>
      <CardHeader
        title="Active Games"
        subheader={
          <Typography variant="body2">
            Games that are currently in play
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            lineHeight: "1.2 !important",
            letterSpacing: "0.31px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(2)} !important` }}>
        <TextField
          size="small"
          sx={{ mb: 4, "& .MuiOutlinedInput-root": { borderRadius: 4 } }}
          label="Search by username"
          onChange={(e) => handleSearchChange(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Magnify fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        {activeGames.map((item: DataType, index: number) => {
          return (
            <Box
              key={`${item.title}-${index}`}
              sx={{
                display: "flex",
                alignItems: "center",
                pt: 3,
                borderTop: "1px solid #e1e1e1",
                ...(index !== activeGames.length - 1 ? { pb: 3 } : {}),
              }}
            >
              <Avatar
                sx={{
                  width: 44,
                  height: 44,
                  marginRight: 3,
                }}
                src={item.imagePath}
              ></Avatar>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    marginRight: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      sx={{ mr: 0.5, fontWeight: 600, letterSpacing: "0.25px" }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ lineHeight: 1.5 }}>
                    {item.players.join(" vs. ")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    textAlign: "end",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "0.875rem",
                      lineHeight: 1.72,
                      letterSpacing: "0.22px",
                    }}
                  >
                    <Link href="/game-in-progress">Spectate</Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ActiveGames;
