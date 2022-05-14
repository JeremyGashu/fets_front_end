import { Box, Button, Grid, Typography } from "@mui/material"
import { useQuery } from "react-query"
import FullPageLoading from "../../components/FullPageLoadingPage"
import { getAllFeeds } from "../../controller/feed"
import { mainColor } from "../../themes/color"
import { useNavigate } from "react-router-dom"
import { EditOutlined } from "@mui/icons-material"
import FeedCard from "../../components/feeds/FeedCard"
import { grey } from "@mui/material/colors"


const FeedsPage = () => {
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
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Button startIcon={<EditOutlined />} size='large' sx={{
                            backgroundColor: mainColor, color: 'white', '&:hover': {
                                backgroundColor: mainColor
                            },
                            m: 2
                        }} type='primary' onClick={() => {
                            navigate('create-feed')
                        }}>Create Feed</Button>
                    </Box>
                    <Grid container gap={2} justifyContent='space-evenly'>
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
                </>
            }
        </>
    )
}

export default FeedsPage