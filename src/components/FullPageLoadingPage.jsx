import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import { mainColor } from '../themes/color';

const FullPageLoading = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '80vh', }} >
            <CircularProgress sx={{color : mainColor}} size={60} />
        </Box>
    );
}


export default FullPageLoading