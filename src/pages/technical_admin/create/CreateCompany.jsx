import { Typography, Box, Paper, Grid, Button, Stack } from "@mui/material"
import { dashboardColor1, borderColor } from '../../../themes/color'
import CustomTextField  from "../../../components/CustomTextField"
const CreateCompany = () => {
    const FontWeight = 600
    return <>
        <Box>
            <Typography variant="h6" component='h2' fontWeight={FontWeight}>
                Add Company
            </Typography>
            <Box marginRight={2}>
                <Paper>
                    <Box paddingBottom={2}>

                    <Box padding={2}>
                        <Stack sx={{ flexDirection: "row" }}>
                            <Box marginX={2} sx={{ backgroundColor: "#BBBBBB", width: 80, height: 80, borderRadius: 2 }}>

                            </Box>
                            <Box sx={{}}>
                                <Box paddingY={1}>
                                    <Typography variant="body1" component='h2' fontWeight={FontWeight}>
                                        Select Your Company Logo
                                    </Typography>
                                </Box>
                                <Box paddingY={1}>
                                    <Button variant="contained" size="small" sx={{ backgroundColor: dashboardColor1 }}>
                                        Upload
                                    </Button>
                                </Box>
                            </Box>

                        </Stack>
                    </Box>

                    <Box padding={2}>
                        <Grid container>
                            <Grid item xs={6}>
                                <CustomTextField />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField />
                            </Grid>
                            <Grid item xs={6}>
                                <CustomTextField />
                            </Grid>
                            <Grid item xs={4}>
                                <CustomTextField />
                            </Grid>
                            <Grid item xs={4}>
                                <CustomTextField />
                            </Grid>
                            <Grid item xs={4}>
                                <CustomTextField />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomTextField />
                            </Grid>
                        </Grid>
                    </Box>
                    <Stack sx={{ flexDirection: "row-reverse"}} marginX={5} marginTop={7}>
                        <Button variant="contained" size="small" sx={{ backgroundColor: dashboardColor1, marginLeft: 2 }}>
                            Save Changes
                        </Button>
                        <Button variant="outlined" size="small" sx={{ color: dashboardColor1, backgroundColor: "white" }}>
                            Save to drafts
                        </Button>
                    </Stack>
                    </Box>
                </Paper>
            </Box>
        </Box>
    </>
}

export default CreateCompany