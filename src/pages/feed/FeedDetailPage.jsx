import { Box, Typography } from "@mui/material"
import { useQuery } from "react-query"
import { useParams } from 'react-router-dom'
import { getFeedById } from "../../controller/feed"
import FullPageLoading from "../../components/FullPageLoadingPage"
import JsonToJsx from "../../components/parser/JsonToJsx"
import { BASE_URL } from "../../configs/urls"
import { grey } from "@mui/material/colors"
import company_logo from '../../assets/company_logo.png'


const FeedDetailPage = (props) => {
    const { id } = useParams()
    const { data, isLoading } = useQuery(['feed', id], () => getFeedById(id))

    if (isLoading) {
        return <FullPageLoading />
    }
    if (data) {
    }

    return (
        <Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', ml: 3, mr: 3, mb: 3, mt: 3 }}>
                <Box sx={{ width: 150 }}>
                    <img style={{
                        width: '100%', maxHeight: 130, objectFit: 'cover',
                    }} src={company_logo} alt='Cover' />
                </Box>

                {/* <Button sx={{
                    backgroundColor: mainColor, color: 'white', '&:hover': {
                        backgroundColor: mainColor
                    },
                    m: 2
                }} onClick={() => {
                    navigate('/login')
                }}>
                    FETS
                </Button> */}
            </Box>

            {/* <Divider sx={{ mb: 3, backgroundColor: grey[50], height: 0.5 }} /> */}

            {
                data && data.feed && data.feed.metadata &&
                <Box sx={{ p: 2, backgroundColor: grey[100], borderRadius: 2 }}>
                    <Box sx={{ pl: 5, mb: 3 }}>
                        <Typography sx={{ mx: 3, fontSize: 40, fontWeight: 700, mt: 3 }}>{data.feed && data.feed.title}</Typography>
                        <Typography sx={{ mx: 3, fontSize: 13, mb: 4, color: grey[600] }}>{data.feed && data.feed.createdAt && (new Date(data.feed.createdAt)).toLocaleDateString()}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img style={{ maxWidth: 750, width: '100%', marginBottom: 15, borderRadius: 5 }} src={`${BASE_URL}/${data.feed && data.feed.image}`} alt='Cover' />
                    </Box>
                    <JsonToJsx block={JSON.parse(data.feed.metadata)['blocks']} />
                </Box>
            }

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', mt: 3, mb: 2, ml: 3, mr: 3 }}>
                <Typography sx={{ color: grey[700], fontSize: 12 }}>FETS Financial Expenditure Tracking System</Typography>
                <Typography sx={{ color: grey[700], fontSize: 12 }}>&copy; 2022</Typography>
            </Box>

        </Box>
    )
}

export default FeedDetailPage