import { Typography, Box, Paper, Grid, Button, Stack, Divider, Avatar } from "@mui/material"
import { dashboardColor1, borderColor } from '../../../themes/color'
import TextField from '@mui/material/TextField';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import CustomTextField  from "../../../components/CustomTextField"

const greyColor = "E1E1E1"
const CreateUser = () => {
    const FontWeight = 600
    return <>
        <Box>
            <Typography variant="h6" component='h2' fontWeight={FontWeight}>
                Add User
            </Typography>
            <Box marginY={2}>
                <Paper>
                    <Box padding={2} marginX={2}>
                        <Box marginY={2}>
                            <Typography variant="h6" fontWeight={600}>
                                Account
                            </Typography>
                        </Box>
                        <Box marginY={2}>
                            <Typography variant="body2" fontWeight={600}>
                                Avater
                            </Typography>

                        </Box>
                        <Box marginY={2}>
                            <Grid container>
                                <Grid item xs={1}>

                                    <Avatar sx={{ bgcolor: dashboardColor1, width: 60, height: 60 }} variant="rounded">
                                        EB
                                    </Avatar>
                                </Grid>
                                <Grid item xs={1}>

                                    <Button variant="contained" size="small" sx={{ backgroundColor: dashboardColor1 }}>Upload</Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="outlined" size="small" sx={{ backgroundColor: "white" }}>save to draft</Button>

                                </Grid>
                            </Grid>
                            <Stack
                                sx={{ flexDirection: 'row' }}

                            >

                            </Stack>
                        </Box>
                        <Divider></Divider>
                        <Box marginY={2}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <CustomTextField title="Username" />
                                </Grid>

                                <Grid item xs={6}>
                                    <CustomTextField title="Full Name" />
                                </Grid>
                                <Grid item xs={6}>
                                    <CustomTextField title="Email" />
                                </Grid>

                                <Grid item xs={6}>
                                    <CustomTextField title="Phone No" />
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider></Divider>
                        <Box marginY={2}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <CustomTextField title="Company" />
                                </Grid>

                                <Grid item xs={6}>
                                    <CustomTextField title="Role" />
                                </Grid>

                            </Grid>
                        </Box>
                        <Divider></Divider>
                        <Box marginY={2}>
                            <Box marginY={2}>

                                <Typography variant="body1" fontWeight={600}>
                                    Credential
                                </Typography>
                            </Box>
                            <Box marginY={2}>

                                <Typography variant="subtitle2" color={greyColor}>
                                    This will be used to authenticate the user for the first time
                                </Typography>
                            </Box>
                            <Grid container spacing={0}>
                                <Grid item xs={1}>
                                    <Avatar sx={{ bgcolor: "#AAAAAA", marginRight: 3, width: 57, height: 57 }} variant="rounded">
                                        <LockRoundedIcon />
                                    </Avatar>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField id="password" label="Password" variant="standard" type="password" sx={{ width: "65%" }} />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button size="small" variant="outlined" sx={{ backgroundColor: "white", fontWeight: 600, marginLeft: 2 }}>Generate</Button>
                                </Grid>
                            </Grid>

                        </Box>
                        <Divider></Divider>
                        <Box marginY={2}>
                            <Box marginY={2}>

                                <Typography variant="body1" fontWeight={600}>
                                    Delete Account
                                </Typography>
                            </Box>

                            <Grid container spacing={0}>
                                <Grid item xs={10}>
                                    <Box marginY={2}>

                                        <Typography variant="subtitle2" color={greyColor}>
                                            All data of the user will be deleted and user cant no longer use the system
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button size="small" sx={{ backgroundColor: "white", fontWeight: 600, marginLeft: 2 }}>Delete Account</Button>
                                </Grid>
                            </Grid>

                        </Box>
                        <Divider></Divider>
                        <Stack
                            marginY={3}
                            sx={{
                                flexDirection: "row-reverse",
                                marginRight: 3
                            }}
                        >
                            <Button variant="contained" size="small" sx={{ backgroundColor: dashboardColor1 }}>
                                Save Changes
                            </Button>
                        </Stack>
                    </Box>
                </Paper>
            </Box>
        </Box>
    </>
}
//some changes to confirm pull request
export default CreateUser
