import { Check } from '@mui/icons-material'
import { Grid, Typography, Button } from '@mui/material'
import React from 'react'
import login_image from '../../assets/login_image.png'
import { backgroundColor, mainColor } from '../../themes/color'
import { whitBackgroundInputStyle } from '../../themes/styles'

const LoginPage = () => {
    return (
        <Grid direction='row' alignItems='center' container sx={{ p: 0, m: 0 }}>
            <Grid item sm={12} md={7} lg={7} >
                <Grid container direction='column' sx={{ height: '100%', p: 3 }} alignItems='center' justifyContent='center'>
                    <Grid item>
                        <Typography variant='h3' sx={{ maxWidth: '280px', mb: 3, fontWeight: '500' }}>
                            FETS Logo
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='h6' sx={{ maxWidth: '280px', mb: 3 }}>
                            Keep track of everything
                            Manage projects and donors
                            in easy way
                        </Typography>
                    </Grid>

                    <Grid item>
                        <div style={{ maxWidth: 350 }}>
                            <img style={{ width: '100%' }} src={login_image} alt="Login" />

                        </div>
                    </Grid>
                </Grid>

            </Grid>
            <Grid item sm={12} md={5} lg={5} sx={{ height: '100vh', backgroundColor: backgroundColor, width: '100%', borderTopLeftRadius: 20 }}  >
                <Grid container direction='column' sx={{ height: '100%', width: '100%' }} alignItems='center' justifyContent='center'>
                    <Grid item>
                        <input placeholder='Username' type="text" style={{ ...whitBackgroundInputStyle }} />
                    </Grid>
                    <Grid item>
                        <input placeholder='Password' type="password" style={{ ...whitBackgroundInputStyle }} />
                    </Grid>
                    <Grid item>
                        <input id='remember' type="checkbox" style={{ ...whitBackgroundInputStyle }} />
                        <label style={{ color: '#444', }} htmlFor="remember">Remember Me</label>

                    </Grid>
                    <Grid item>
                        <Button fullWidth sx={{
                            color: 'white', backgroundColor: mainColor, width: '275px', '&:hover': {
                                backgroundColor: mainColor
                            }, m: 2
                        }}>Log In</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default LoginPage