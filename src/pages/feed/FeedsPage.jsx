import { Grid, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useQuery } from "react-query"
import FullPageLoading from "../../components/FullPageLoadingPage"
import { getAllFeeds } from "../../controller/feed"
import logo from '../../assets/login_image.png'
import { CalendarMonth } from "@mui/icons-material"


const FeedsPage = () => {
    const { data, isLoading } = useQuery('feeds', getAllFeeds)

    if (isLoading) {
        return <FullPageLoading />
    }

    return (
        <>

            {
                !isLoading && data && <Grid container gap={3} justifyContent='space-evenly'>
                    {
                        data && data.map(feed => {
                            return <Grid item md={5} sm={12} lg={3} >
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
                                                <Typography sx={{ color: grey[800], fontSize: 13 }}>Date Posted</Typography>
                                            </Grid>

                                            <Grid item>
                                                <CalendarMonth sx={{ color: grey[800], fontSize: 13 }} />
                                                <Typography sx={{ color: grey[800], fontSize: 13 }}>{(new Date(feed.createdAt)).toDateString()}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>


                                </Grid>

                            </Grid>
                        })
                    }
                </Grid>
            }
        </>
    )
}

export default FeedsPage