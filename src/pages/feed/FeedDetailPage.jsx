import { Box, Typography } from "@mui/material"
import { useQuery } from "react-query"
import { useParams } from 'react-router-dom'
import { getFeedById } from "../../controller/feed"
import FullPageLoading from "../../components/FullPageLoadingPage"
import JsonToJsx from "../../components/parser/JsonToJsx"
import { BASE_URL } from "../../configs/urls"
import { grey } from "@mui/material/colors"

const FeedDetailPage = (props) => {
    const { id } = useParams()
    const { data, isLoading } = useQuery(['feed', id], () => getFeedById(id))

    if (isLoading) {
        return <FullPageLoading />
    }
    if (data) {
    }

    return (
        <>
            {
                data && data.feed && data.feed.metadata &&
                <Box sx={{ p: 2, backgroundColor: grey[100], borderRadius: 2 }}>
                    <Typography sx={{ mx: 3, fontSize: 40, fontWeight: 700, mt: 3 }}>{data.feed && data.feed.title}</Typography>
                    <Typography sx={{ mx: 3, fontSize: 13, mb: 4, color: grey[600] }}>{data.feed && data.feed.createdAt && (new Date(data.feed.createdAt)).toLocaleDateString()}</Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img style={{ maxWidth: 750, width: '100%', marginBottom: 15, borderRadius: 12 }} src={`${BASE_URL}/${data.feed && data.feed.image}`} alt='Cover' />
                    </Box>
                    <JsonToJsx block={JSON.parse(data.feed.metadata)['blocks']} />
                </Box>
            }

        </>
    )
}

export default FeedDetailPage