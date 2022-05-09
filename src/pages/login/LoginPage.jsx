import { Grid, Typography, Button, Box, CircularProgress } from '@mui/material'
import React from 'react'
import login_image from '../../assets/login_image.png'
import { backgroundColor, mainColor } from '../../themes/color'
import { whitBackgroundInputStyle } from '../../themes/styles'
import company_logo from '../../assets/company_logo.png'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { loginRequest } from '../../controller/auth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const LoginPage = () => {
    const { register, handleSubmit } = useForm()

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const { mutate } = useMutation(loginRequest, {
        onError: (error, variables, context) => {
            console.log(error)
            console.log(variables)
            console.log(context)
        },
        onSuccess: (data, variables, context) => {
            console.log(data)
            if (data.code === 200) {

            }
        },
    })

    const onLogin = async (data) => {
        setLoading(true)
        if (data.username === 'technical-admin') {
            setTimeout(() => {
                setLoading(false)
                navigate('/technical-admin')
            }, 3000);
            
        }
        else if (data.username === 'project-manager') {
            setTimeout(() => {
                setLoading(false)
                navigate('/project-manager')
            }, 3000);
            
        }

        else {
            setTimeout(() => {
                setLoading(false)
            }, 3000);
        }
    }

    return (
        <Grid direction='row' alignItems='center' container sx={{ p: 0, m: 0 }}>
            <Grid item sm={12} md={7} lg={7} >
                <Grid container direction='column' sx={{ height: '100%', p: 3 }} alignItems='center' justifyContent='center'>
                    <Grid item>

                        <Box sx={{ width: '100%' }}>
                            <img style={{ maxWidth: 185, margin: 5 }} src={company_logo} alt="Logo" />
                        </Box>


                    </Grid>
                    <Grid item>
                        <Typography variant='h6' sx={{ maxWidth: '280px', mb: 3 }}>
                            Keep track of everything
                            Manage projects and donors
                            in easy way.
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
                    <form onSubmit={handleSubmit(onLogin)} >
                        <Grid item>
                            <input {...register("username", { required: true })} placeholder='Username' type="text" style={{ ...whitBackgroundInputStyle }} />
                        </Grid>
                        <Grid item>
                            <input {...register("password", { required: true })} placeholder='Password' type="password" style={{ ...whitBackgroundInputStyle }} />
                        </Grid>
                        <Grid item>
                            <input id='remember' type="checkbox" style={{ ...whitBackgroundInputStyle }} />
                            <label style={{ color: '#444', }} htmlFor="remember">Remember Me</label>

                        </Grid>
                        {
                            loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m: 3, }}><CircularProgress sx={{ color: mainColor }} /></Box> : <Grid item>
                                <Button type='submit' fullWidth sx={{
                                    color: 'white', backgroundColor: mainColor, width: '275px', '&:hover': {
                                        backgroundColor: mainColor
                                    }, m: 2
                                }}>Log In</Button>
                            </Grid>
                        }
                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default LoginPage