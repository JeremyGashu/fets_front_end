import { EmailOutlined, GpsFixed, PhoneOutlined } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import { mainColor } from '../../themes/color'

const CompanyDescriptionComponent = ({ name, location, description, email, phone }) => {
    return (
        <Box sx={{ ml: 3 }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 20, color: grey[700] }}>{name}</Typography>
            <Grid container direction='row' alignItems='center' sx={{ my: 1 }}>
                <Grid item>
                    <GpsFixed sx={{ color: mainColor, fontSize: 20 }} />
                </Grid>

                <Grid item sx={{ ml: 1 }}>
                    <Typography sx={{ fontSize: 14, color: grey[600] }}>{location}</Typography>
                </Grid>
            </Grid>

            <Grid container direction='row' alignItems='center' sx={{ my: 1 }}>
                <Grid item>
                    <EmailOutlined sx={{ color: mainColor, fontSize: 20 }} />
                </Grid>

                <Grid item sx={{ ml: 1 }}>
                    <Typography sx={{ fontSize: 14, color: grey[600] }}>{email}</Typography>
                </Grid>
            </Grid>

            <Grid container direction='row' alignItems='center' sx={{ my: 1 }}>
                <Grid item>
                    <PhoneOutlined sx={{ color: mainColor, fontSize: 20 }} />
                </Grid>

                <Grid item sx={{ ml: 1 }}>
                    <Typography sx={{ fontSize: 14, color: grey[600] }}>{phone}</Typography>
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