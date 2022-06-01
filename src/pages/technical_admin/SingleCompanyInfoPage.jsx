import { Grid, Typography, Box, Divider } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useQuery } from "react-query"
import { useParams } from 'react-router-dom'
import CompanyDescriptionComponent from "../../components/company/CompanyDescriptionComponent"
import FullPageLoading from "../../components/FullPageLoadingPage"
import { getCompanyById } from "../../controller/company"

const SingleCompanyDetail = () => {
    const { id } = useParams()

    const { data: selectedCompany, isLoading, isError } = useQuery(['users', id], () => getCompanyById(id))
    console.log(selectedCompany)
    if (isLoading) {
        return <FullPageLoading />
    }
    return !isError && selectedCompany && selectedCompany.company ?
        <>
            <Grid item lg={8} sx={{ px: 2, position: 'relative' }} >
                <Box sx={{ height: 170, backgroundColor: grey[300], borderRadius: 1 }}>
                    <Typography sx={{ fontSize: 38, color: grey[700], ml: 3 }}>{selectedCompany.company.name}</Typography>
                </Box>

                <Box sx={{ height: 60, width: 60, backgroundColor: grey[400], borderRadius: 1, position: 'relative', bottom: 30, ml: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 32, color: grey[700] }}>{selectedCompany.company.name && selectedCompany.company.name[0]}</Typography>

                </Box>

                <Divider sx={{ mx: 3, mb: 2 }} />

                <CompanyDescriptionComponent phone={selectedCompany.company.phone} email={selectedCompany.company.email} name={selectedCompany.name} location={selectedCompany.address} description={selectedCompany.company.description} />
            </Grid>
        </>
        : <Typography></Typography>
}

export default SingleCompanyDetail