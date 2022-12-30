// ** React Imports
import { ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import Numeric from 'mdi-material-ui/Numeric'
import TrophyVariantOutline from 'mdi-material-ui/TrophyVariantOutline'
import EmoticonSadOutline from 'mdi-material-ui/EmoticonSadOutline'
import HandshakeOutline from 'mdi-material-ui/HandshakeOutline'

import { useProfile } from "../../utils/hooks/useProfile";

// ** Types
type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

interface DataType {
  stats: string
  title: string
  color: ThemeColor
  icon: ReactElement
  key: string
}

const personalStatsData: DataType[] = [
  {
    stats: '788',
    title: 'Games Played',
    key: 'countTotal',
    color: 'primary',
    icon: <Numeric sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '4',
    title: 'Games Won',
    key: 'countWon',
    color: 'success',
    icon: <TrophyVariantOutline sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '2',
    color: 'error',
    key: 'countLost',
    title: 'Games Lost',
    icon: <EmoticonSadOutline sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '568',
    color: 'info',
    key: 'countDraw',
    title: 'Games Tied',
    icon: <HandshakeOutline sx={{ fontSize: '1.75rem' }} />
  }
]

const renderStats = (profile: any) => {
  return personalStatsData.map((item: DataType, index: number) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{profile ? profile[item.key] : 0}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const PersonalStats = () => {
  const { profile } = useProfile();
  console.log(profile)
  return (
    <Card>
      <CardHeader
        title='Personal Stats'
        subheader={
            <Typography variant='body2' sx={{mb: 2}}>
                Your personal stats 🏆
            </Typography>
          }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          },
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(profile)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PersonalStats;
