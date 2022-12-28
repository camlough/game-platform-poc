import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

// ** MUI Imports
import Grid from '@mui/material/Grid'

import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

import Trophy from '../components/dashboard/Trophy'
import OverviewStats from '../components/dashboard/OverviewStats'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <OverviewStats />
        </Grid>
    </Grid>
  )
}
