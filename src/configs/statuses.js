import { Box, Typography } from "@mui/material"
import { grey, lightGreen } from "@mui/material/colors"
import { lightGreenBg, lightRedBg, lightRedText, lightYellowGg, lightYellowText, mainColor, } from "../themes/color"


export const getTextColorFromStatus = (status) => {
    switch (status) {
        case 'In Progress':
            return `${lightYellowText}`
        case 'Completed':
            return lightGreen
        case 'Canceled':
            return lightRedText
        case 'Pending':
            return grey[800]
        default:
            return 'yellow'
    }
}

export const getBackgroundColorFromStatus = (status) => {
    switch (status) {
        case 'In Progress':
            return lightYellowGg
        case 'Completed':
            return lightGreenBg
        case 'Canceled':
            return lightRedBg
        default:
            return 'yellow'
    }
}

export const getStatusByTaskStatusNumber = (status) => {
    switch (status) {
        case 0:
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 120, borderRadius: 2, px: 2, py: 1, backgroundColor: 'yellow' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 13, color: '#444' }}>Pending</Typography>
                </Box>

            )
        case 3:
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 120, borderRadius: 2, px: 2, py: 1, backgroundColor: mainColor }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 13, color: 'white' }}>Complete</Typography>
                </Box>

            )

        default:
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 120, borderRadius: 2, px: 2, py: 1, backgroundColor: 'yellow' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: 13, color: '#444' }}>In Progress</Typography>
                </Box>

            )
    }
}