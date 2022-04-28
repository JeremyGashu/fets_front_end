import { Box, Grid, Typography } from "@mui/material"

const TechnicalAdminDashboardCard = ({ backgroundColor, text, title, icon }) => {
    return (
        <Grid item lg={5}>
            <Box sx={{ backgroundColor: { backgroundColor }, borderRadius: 2, height: 140, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                <Grid container alignItems='cemter' justifyContent='space-between'>
                    <Grid item>
                        <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: 23 }}>{text}</Typography>
                        <Typography sx={{ color: 'white', fontSize: 15 }}>{title}</Typography>

                    </Grid>
                    <Grid item>
                        {
                            icon
                        }
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}

export default TechnicalAdminDashboardCard