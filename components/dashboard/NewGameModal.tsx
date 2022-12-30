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
import { nanoid } from "nanoid";

import { createReplicacheSpace } from '../../pages/api/replicache/create-space';

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
interface State {
    opponentType: 'human' | 'bot';
    gameType: string;
}

const NewGameModal = ({isModalOpen, handleCloseModal}: Props) => {
  const [values, setValues] = useState<State>({
    opponentType: 'human',
    gameType: 'tic-tac-toe'
  })

  const router = useRouter();

  const handleChange = (prop: keyof State) => (event: SelectChangeEvent) => {
    setValues({ ...values, [prop]: event.target.value })
  };

  const handleStartGame = async () => {
    const gameId = nanoid(6);
    if (values.opponentType === 'human') {
        // generate replicache space
        const path = `/waiting-room/${gameId}`;
        const space = await createReplicacheSpace(path);
        console.log("SPACE", space)
        router.push(path)
    } else {
        router.push(`/play-game/${values.gameType}/1234`);
    }
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
              value={values.gameType}
              label="Game"
              onChange={handleChange('gameType')}
            >
              <MenuItem value="tic-tac-toe">Tic Tac Toe</MenuItem>
              <MenuItem value="chess">Chess</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Opponent</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="human"
              name="radio-buttons-group"
              onChange={handleChange('opponentType')}
            >
              <FormControlLabel
                value="human"
                control={<Radio />}
                label="Human"
              />
              <FormControlLabel value="bot" control={<Radio />} label="Bot" />
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
