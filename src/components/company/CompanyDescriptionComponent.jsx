import { Box, Grid, Typography } from '@mui/material'
import { grey, lightBlue } from '@mui/material/colors'
import React from 'react'

const CompanyDescriptionComponent = ({ name, location, description }) => {
    return (
        <Box sx={{ ml: 3 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20, color: grey[700] }}>{name}</Typography>
            <Grid container direction='row'>
                <Grid item>
                    <Typography sx={{ fontSize: 14, color: lightBlue[700] }}>Location</Typography>
                </Grid>

                <Grid item sx={{ ml: 1 }}>
                    <Typography sx={{ fontSize: 14, color: grey[600] }}>{location}</Typography>
                </Grid>
            </Grid>

            <Typography sx={{ fontSize: 15, fontWeight: 'bold', color: grey[700], mt: 2 }}>Company Description</Typography>

            <Typography sx={{ my: 2, color: grey[700] }}>
                {description}
            </Typography>
        </Box>
    )
}

export default CompanyDescriptionComponent