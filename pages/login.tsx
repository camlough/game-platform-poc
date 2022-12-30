// ** React Imports
import { ChangeEvent, SyntheticEvent, MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'

import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import BlankLayout from '../components/layout/BlankLayout'


interface State {
  password: string;
  email: string;
  showPassword: boolean;
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState<State>({
    password: '',
    email: '',
    showPassword: false
  })
  const supabaseClient = useSupabaseClient()

  // ** Hook
  const router = useRouter()

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const { email, password } = values;
      const { data, error} = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data && data.session) {
        const { access_token, refresh_token } = data.session;
        await supabaseClient.auth.setSession({access_token, refresh_token});
        router.push('/');
      }
    } catch(error: any) {
      console.error(error.error_description || error.message)
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb:4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButton
              color='inherit'
              onClick={() => router.push('/')}
              >
                <Image width={60} height={60} alt="logo" src="/images/logos/saasy-games-1.png" />
            </IconButton>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome 👋🏻
            </Typography>
            <Typography variant='body2'>Please sign-in to your account and start playing</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={(e) => handleLogin(e)}>
            <TextField autoFocus fullWidth id='email' label='Email' sx={{ marginBottom: 4 }} onChange={handleChange('email')} />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
            </Box>
            <Button
              fullWidth
              size='large'
              variant='contained'
              type='submit'
              sx={{ marginBottom: 7 }}
              onClick={(e) => handleLogin(e)}
            >
              Login
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/register'>
                  Create an account
                </Link>
              </Typography>
            </Box>
            
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
