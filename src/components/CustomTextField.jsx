import { BorderColor } from "@mui/icons-material"
import { Typography, Box } from "@mui/material"
const CustomTextField = ({ title = "Insert here", required = true }) => {
    const PlaceHolder = `Enter ${title} here`
    return (
        <Box
            component="form"
            autoComplete="off"
            margin={1}
        >
            <Typography variant="body2" component='h2' fontWeight={600}>
                {title}
            </Typography>
            <input type="text" placeholder={PlaceHolder} name={title} required={required}
                style={{ width: "100%", outline: 'none', border: `1px solid ${BorderColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />

        </Box>
    )
}
export default CustomTextField