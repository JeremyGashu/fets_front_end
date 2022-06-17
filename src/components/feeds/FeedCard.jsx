import { Grid, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useNavigate } from "react-router-dom"
import logo from '../../assets/login_image.png'


const FeedCard = ({ feed }) => {
    const navigate = useNavigate()
    return (

        <Grid item md={5} sm={12} lg={3} sx={{width: '250px', m : 2}}>
            <div onClick={() => {
                navigate(`/feed-detail/${feed.id}`)
            }}>
                <Grid container direction='column' justifyContent='space-between' className='feed-card' sx={{ height: 330, p: 1, borderRadius: 3, backgroundColor: grey[200] }}>
                    <Grid item>
                        {/* <img style={{
                                            width: '100%', maxHeight: 130, objectFit: 'cover',
                                        }} src={`${BASE_URL}/${feed.image}`} alt='Cover' /> */}

                        <img style={{
                            width: '100%', maxHeight: 130, objectFit: 'cover',
                        }} src={logo} alt='Cover' />
                    </Grid>
                    <Grid item>
                        <Typography sx={{
                            p: 1, fontWeight: 500,
                        }}>{feed.title}
                        </Typography>
                    </Grid>


                    <Grid item>
                        <Grid sx={{ p: 2 }} container direction='row' alignItems='center' justifyContent='space-between'>
                            <Grid item>
                                <Typography sx={{ color: grey[700], fontSize: 13 }}>Posted: </Typography>
                            </Grid>

                            <Grid item>
                                <Typography sx={{ color: grey[800], fontSize: 13 }}>{(new Date(feed.createdAt)).toLocaleDateString()}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>


                </Grid>
            </div>
        </Grid >


    )
}

export default FeedCard