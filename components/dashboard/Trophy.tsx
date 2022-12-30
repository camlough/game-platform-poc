import { useState } from "react";
// ** MUI Imports
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";

import { useUser } from "@supabase/auth-helpers-react";

import NewGameModal from "./NewGameModal";
import { useProfile } from "../../utils/hooks/useProfile";

// Styled component for the triangle shaped background image
const TriangleImg = styled("img")({
  right: 0,
  bottom: 0,
  height: 170,
  position: "absolute",
});

// Styled component for the trophy image
const TrophyImg = styled("img")({
  right: 36,
  bottom: 20,
  height: 98,
  position: "absolute",
});

const userData = {
  gamesWon: 9,
  gamesPlayed: 34,
};

const Trophy = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handlOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const user = useUser();
  const { profile } = useProfile();
  return (
    <Card sx={{ position: "relative" }}>
      <CardContent>
        <Typography variant="h6">
          Congratulations {user?.user_metadata.username}! 🥳
        </Typography>
        <Typography variant="body2" sx={{ letterSpacing: "0.25px" }}>
          You&apos;re on a win streak
        </Typography>
        <Typography variant="h5" sx={{ my: 4, color: "primary.main" }}>
          {profile?.countWon ?? 0} wins
        </Typography>
        <Button size="small" variant="contained" onClick={handlOpenModal}>
          Play a new game
        </Button>
        <TriangleImg
          alt="triangle background"
          src="/images/misc/triangle-light.png"
        />
        <TrophyImg alt="trophy" src="/images/misc/trophy.png" />
      </CardContent>
      <NewGameModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </Card>
  );
};

export default Trophy;
