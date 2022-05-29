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


const LoginPage = () => {
    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()

    const { mutate, isLoading } = useMutation(loginRequest, {
        onError: (error, variables, context) => {
            console.log(error)
            console.log(variables)
            console.log(context)
        },
        onSuccess: (data, variables, context) => {
            console.log(data)
            if (data.statusCode === 200) {
                let userType = data.body.type
                if (userType === 'TECHNICAL_ADMIN') {
                    navigate('/technical-admin')
                }
                else if (userType === 'PROJECT_MANAGER') {
                    navigate('/project-manager')
                }

                else if (userType === 'FINANCIAL_OFFICER') { 
                    //TODO implement for financial officer
                }
                else { }

            }
        },
    })

    const onLogin = async (data) => {
        navigate('/technical-admin')
        console.log(data)
        // mutate(data)
    }

    return (
        <Grid direction='row' alignItems='center' container sx={{ px:40,py:20, m: 0,background:backgroundColor}} >
            <Grid item sm={12} md={7} lg={7} sx={{height:'66.5vh',background:'white',display:'inline',alignItems:'flex-start'}} >
                <Grid container direction='column' sx={{ height: '100%', p: 2}} alignItems='center' justifyContent='center'>
                    <Grid item sx={{ml:-10,mb:3}}>

                        <Box sx={{ width: '100%' , m:0 }}>
                            <img style={{ maxWidth: 195, margin: 0 }} src={company_logo} alt="Logo" />
                        </Box>


                    </Grid>
                    <Grid item sx={{ml:-10}}>
                        <Typography variant='p' sx={{ fontSize:'13px', maxWidth: '280px', mb: 0 ,display:'flex',fontWeight:'bold'}}>
                            Keep track of everything 
                        </Typography>
                        <Typography variant='p' sx={{ fontSize:'13px',maxWidth: '280px', mb: 0 ,display:'flex',fontWeight:'bold'}}>
                            Manage projects and donors 
                        </Typography>
                        <Typography variant='p' sx={{ fontSize:'13px',maxWidth: '280px', mb: 5 ,display:'flex',fontWeight:'bold'}}>
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
            <Grid item sm={12} md={5} lg={5} sx={{ height:'66.5vh', backgroundColor: '#DDE5FF', width: '100%', borderTopLeftRadius: 0 }}  >
                
                        
                
                <Grid container direction='column' sx={{ height: '100%', width: '100%' }} alignItems='center' justifyContent='center'>
                    
                    <Typography variant='h5' fontWeight='bold' sx={{marginBottom:'10px'}}>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit(onLogin)} >
                        <Grid item >
                            <input {...register("username", { required: true })} placeholder='Username'  type="text" style={{ ...whitBackgroundInputStyle,width: '12vw' ,fontSize:'11px'}} />
                        </Grid>
                        <Grid item >
                            <input {...register("password", { required: true })} placeholder='Password' type="password" style={{ ...whitBackgroundInputStyle ,width: '12vw',fontSize:'11px'}} />
                        </Grid>
                        <Grid item alignItems='center'>
                            <input id='remember' type="checkbox" style={{ ...whitBackgroundInputStyle }} />
                            <label style={{ color: '#444',fontSize:12}} htmlFor="remember">remember me</label>

                        </Grid>
                        {
                            isLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m: 3}}><CircularProgress sx={{ color: mainColor }} /></Box> : <Grid item>
                                <Button type='submit' fullWidth sx={{
                                    color: 'white', backgroundColor: mainColor, width: '13vw', '&:hover': {
                                        backgroundColor: mainColor
                                    }, m: 2
                                }}><Typography textTransform='none' variant='p' sx={{fontSize:'11px'}}>
                                    Login
                                    </Typography></Button>
                            </Grid>
                        }
                    </form>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default LoginPage