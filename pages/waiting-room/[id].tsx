
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Button, Grid, Typography } from '@mui/material';

const WaitingRoom = () => {
    const router = useRouter();
    const handleCancelGame = () => {
        router.push('/');
    }
    return (
        <Box sx={{ mt: 10}}>
            <Grid container justifyContent='center' alignItems='center' direction='column'>
                <Grid item sx={{mb:5}}>
                    <CircularProgress size={90} />
                </Grid>
                <Grid item>
                    <Typography variant='h4'>Waiting for opponent...</Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body1'>Your game will begin as soon as an opponent joins</Typography>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="error" sx={{mt:5}} onClick={() => handleCancelGame()}>
                        Cancel Game
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default WaitingRoom;