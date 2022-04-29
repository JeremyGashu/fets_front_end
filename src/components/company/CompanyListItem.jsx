import { Box, Grid, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"

const CompanyListItem = ({ name, location }) => {
    return (
        <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: 3, m: 2 }} className='project-list-item' >
            <Grid container direction='row' justifyContent='start' alignItems='center' >
                <Grid item lg={2} sm={2} md={2}>
                    <Box sx={{ width: 40, height: 40, backgroundColor: grey[300], borderRadius: 2, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ fontSize: 23, color: grey[700] }}>P</Typography>
                    </Box>
                </Grid>

                <Grid item lg={10} sm={10} md={10}>
                    <Typography sx={{ color: 'black', fontSize: 13 }}>{name}</Typography>
                    <Typography sx={{ color: '#444', fontSize: 11 }}>{location}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CompanyListItem