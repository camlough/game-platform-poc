import { useState } from "react";
import { useRouter } from "next/router";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface Props {
    isModalOpen: boolean;
    handleCloseModal: () => void
}

const NewGameModal = ({isModalOpen, handleCloseModal}: Props) => {
  const [game, setGame] = useState('tic_tac_toe');

  const router = useRouter();

  const handleGameChange = (event: SelectChangeEvent) => {
    setGame(event.target.value);
  };

  const handleStartGame = () => {
    router.push('/waiting-room/1234')
  }


  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 4 }}
        >
          New Game
        </Typography>
        <form
          noValidate
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <FormControl fullWidth sx={{ mb: 4 }}>
            <FormLabel id="demo-radio-buttons-group-label">
              Choose a game
            </FormLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={game}
              label="Game"
              onChange={handleGameChange}
            >
              <MenuItem value="tic_tac_toe">Tic Tac Toe</MenuItem>
              <MenuItem value="chess">Chess</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Opponent</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Human"
              />
              <FormControlLabel value="male" control={<Radio />} label="Bot" />
            </RadioGroup>
          </FormControl>
        </form>
        <Button
            fullWidth
            size='large'
            variant='contained'
            type='submit'
            sx={{ mt: 2 }}
            onClick={() => handleStartGame()}
        >
            Start Game
        </Button>
      </Box>
    </Modal>
  );
};

export default NewGameModal;
