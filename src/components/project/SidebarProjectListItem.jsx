import { Box, Grid, Typography } from '@mui/material'
import { green, grey } from '@mui/material/colors'
import React from 'react'

const SidebarProjectListItem = ({ name }) => {
    return (
        <Grid container alignItems='center' sx={{ my: 1 }}>
            <Grid item >
                <Box sx={{ borderRadius: 1, width: 14, height: 14, backgroundColor: green[700] }}>

                </Box>
            </Grid>
            <Grid item sx={{ ml: 1, cursor: 'pointer', }}>
                <Typography sx={{ fontSize: 13, color: grey[800], '&:hover': { color: 'black' } }}>{name}</Typography>
            </Grid>
        </Grid>
    )
}

export default SidebarProjectListItem
