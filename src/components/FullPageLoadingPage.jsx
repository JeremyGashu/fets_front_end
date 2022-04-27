import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const FullPageLoading = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '80vh', }} >
            <CircularProgress size={60} />
        </Box>
    );
}


export default FullPageLoading