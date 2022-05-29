import { grey, lightGreen } from "@mui/material/colors"
import { lightGreenBg, lightRedBg, lightRedText, lightYellowGg, lightYellowText, } from "../themes/color"


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