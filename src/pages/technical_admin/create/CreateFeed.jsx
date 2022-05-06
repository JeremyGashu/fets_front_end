import { Typography, Box, Paper, Grid, Button, Stack, Divider, Avatar, Container } from "@mui/material"
import { dashboardColor1, borderColor } from '../../../themes/color'
import TextField from '@mui/material/TextField';
import CustomTextField  from "../../../components/CustomTextField"

import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
const greyColor = "E1E1E1"
const CreateFeed = () => {
    const FontWeight = 600
    return <>
        <Box>
            <Typography variant="h6" component='h2' fontWeight={FontWeight}>
                Add User
            </Typography>
            <Grid container spacing={7}>
                <Grid item xs={8}>

                    <Paper sx={{ marginBottom: 2 }}>
                        <Box padding={2}>
                            <CustomTextField title="Feed Name" />
                        </Box>
                    </Paper>
                    <Paper>
                        <Box padding={2}
                        >
                            <Typography variant="body1" fontWeight={600}>
                                Feed Detail
                            </Typography>
                            <TextField
                                required
                                id="project-name"
                                placeholder='Add some Detail of your project'
                                multiline
                                rows={10}
                                maxRows={20}
                                sx={{ m: 1, width: '98%' }}
                            />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                        <Container>

                        <Box padding={4}>
                            <Container>

                                <CameraAltOutlinedIcon sx={{ fontSize: 90 }} />
                            </Container>
                            <Container>

                                <Typography component="body2" variant="body2">
                                    Drag your images to upload
                                </Typography>
                            </Container>
                            <Container>
                                <Button size="small" sx={{ backgroundColor: "white", fontWeight: 600 }}>Browse</Button>

                            </Container>
                        </Box>
                        </Container>
                    </Paper>
                    <Box>
                    <Stack
                            marginTop={30}
                            sx={{
                                flexDirection: "row-reverse",
                            }}
                        >
                            <Button variant="contained" size="small" sx={{ backgroundColor: dashboardColor1,marginLeft:2}}>
                                Save Changes
                            </Button>
                            <Button variant="outlined" size="small" sx={{ color: dashboardColor1,backgroundColor: "white" }}>
                                Save to drafts
                            </Button>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </>
}
export default CreateFeed