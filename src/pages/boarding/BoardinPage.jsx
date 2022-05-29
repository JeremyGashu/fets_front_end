import { Box, Button, Divider, Grid, Typography } from "@mui/material"
import { useQuery } from "react-query"
import FullPageLoading from "../../components/FullPageLoadingPage"
import { getAllFeeds } from "../../controller/feed"
import { mainColor } from "../../themes/color"
import { useNavigate } from "react-router-dom"
import FeedCard from "../../components/feeds/FeedCard"
import { grey } from "@mui/material/colors"
import company_logo from '../../assets/company_logo.png'
import login_image from '../../assets/login_image.png'




const BoardingPage = () => {
    const { data, isLoading } = useQuery('feeds', getAllFeeds)
    const navigate = useNavigate()

    if (isLoading) {
        return <FullPageLoading />
    }

    return (
        <>
            {
                !isLoading && data &&
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', ml: 3, mr: 3, mb: 3 }}>
                        <Box sx={{ width: 150 }}>
                            <img style={{
                                width: '100%', maxHeight: 130, objectFit: 'cover',
                            }} src={company_logo} alt='Cover' />
                        </Box>

                        <Button sx={{
                            backgroundColor: mainColor, color: 'white', '&:hover': {
                                backgroundColor: mainColor
                            },
                            m: 2
                        }} onClick={() => {
                            navigate('/login')
                        }}>
                            Login
                        </Button>
                    </Box>

                    <Divider sx={{ mb: 3, backgroundColor: grey[50], height: 0.5 }} />

                    {/* */}

                    <Grid item sm={12} md={7} lg={7} >
                        <Grid container direction='row' sx={{ height: '100%', p: 3 }} alignItems='center' justifyContent='space-around'>
                            <Grid item>

                                <Grid container direction='column' alignItems='center'>
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
                                </Grid>


                            </Grid>

                            <Grid item>
                                <div style={{ maxWidth: 350 }}>
                                    <img style={{ width: '100%' }} src={login_image} alt="Login" />

                                </div>
                            </Grid>
                        </Grid>

                    </Grid>

                    {/* */}




                    {
                        data && (data.length > 0) && <Box sx={{ m: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ width: 100, height: 2, backgroundColor: '#9e9e9e', mx: 2 }}>

                            </Box>
                            <Typography sx={{ textAlign: 'center', color: '#424242' }} variant='h3'>Blogs</Typography>

                            <Box sx={{ width: 100, height: 2, backgroundColor: '#9e9e9e', mx: 2 }}>

                            </Box>
                        </Box>
                    }

                    <Box sx={{ mx: 5 }}>
                        <Grid container gap={4} justifyContent='center' alignItems='center'>

                            {
                                data && (data.length > 0) && data.map(feed => {
                                    return <FeedCard feed={feed} />
                                })
                            }

                            {
                                data && data.length === 0 &&
                                <Typography sx={{ color: grey[400] }}>
                                    No feed created...
                                </Typography>
                            }
                        </Grid>
                    </Box>

                    <Divider sx={{ mb: 3, backgroundColor: grey[50], height: 0.5 }} />


                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', mt: 3, mb: 2, ml: 3, mr: 3 }}>
                        <Typography sx={{ color: grey[700], fontSize: 12 }}>FETS Financial Expenditure Tracking System</Typography>
                        <Typography sx={{ color: grey[700], fontSize: 12 }}>&copy; 2022</Typography>
                    </Box>
                </>
            }
        </>
    )
}

export default BoardingPage