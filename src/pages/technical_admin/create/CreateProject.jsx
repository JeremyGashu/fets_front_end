import { Typography, Box, Paper, TextField, Grid, Button, Stack } from "@mui/material"
import { dashboardColor1,borderColor } from '../../../themes/color'
const CreateProject = () => {
    const FontWeight = 600
    return <>
        <Box>
            <Typography variant="h6" component='h2' fontWeight={FontWeight}>
                Add Project
            </Typography>
            <ProjectInformation />
            <ProjectDetail />
            <Grid container columnSpacing={1}>
                <Grid item xs={8}>
                    <ProjectDescription />
                </Grid>
                <Grid item xs={4}>
                    <ProjectMapping />
                </Grid>
            </Grid>
            <Stack
                sx={{ flexDirection: 'row-reverse' }}
            >
                <Button variant="contained" sx={{ backgroundColor: dashboardColor1, fontWeight: 600, marginLeft: 1 }}>Add Project</Button>
                <Button variant="outlined" sx={{ backgroundColor: "white", fontWeight: 600 }}>Add to Draft</Button>
            </Stack>
        </Box>
    </>
}
const ProjectMapping = () => {
    return (
        <Box marginY={2}>
            <Paper elevation={0}>
                <Box padding={2}
                >
                    <Typography variant="body1" fontWeight={600}>
                        Project Mapping
                    </Typography>
                    <CustomTextField title="Project Manager" required="true" />
                    <CustomTextField title="Financial Officer" required="true" />
                    <CustomTextField title="Budget and Procurement Manager" required="true" />
                    <CustomTextField title="External Auditor" required="true" />

                </Box>

            </Paper>
        </Box>
    )
}
const ProjectDescription = () => {
    return (
        <Box marginY={2}>
            <Paper elevation={0}>
                <Box padding={2}
                >
                    <Typography variant="body1" fontWeight={600}>
                        Project Description
                    </Typography>
                    <TextField
                        required
                        id="project-name"
                        placeholder='Add some description of your project'
                        multiline
                        rows={10}
                        maxRows={20}
                        sx={{ m: 1, width: '98%' }}
                    />
                </Box>

            </Paper>
        </Box>
    )
}
const ProjectDetail = () => {
    return (
        <Box marginY={2}>
            <Paper elevation={0}>
                <Box padding={2}
                >
                    <Typography variant="body1" fontWeight={600}>
                        Project Detail
                    </Typography>
                    <Grid container>
                        <Grid item xs={6}>
                            <CustomTextField title="Project Location" required="true" />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomTextField title="Estimated Budget" required="true" />
                        </Grid>

                        <Grid item xs={6}>
                            <CustomTextField title="Company Name" required="true" />
                        </Grid>

                        <Grid item xs={6}>
                            <CustomTextField title="Estimated Duration" required="true" />
                        </Grid>

                        <Grid item xs={6}>
                            <CustomTextField title="Project Account" required="true" />
                        </Grid>
                    </Grid>
                </Box>

            </Paper>
        </Box>
    )
}

const ProjectInformation = () => {
    return (
        <Box marginY={2}>
            <Paper elevation={0}>
                <Box padding={2}
                >
                    <Typography variant="body1" fontWeight={600}>
                        Project Information
                    </Typography>
                    <Grid container>
                        <Grid item xs={7}>
                            <CustomTextField title="Project Name" required="true" />
                        </Grid>
                        <Grid item xs={7}>
                            <CustomTextField title="Project Location" required="true" />
                        </Grid>

                    </Grid>
                </Box>

            </Paper>
        </Box>
    )
}
export const CustomTextField = ({ title, required=true }) => {
    const PlaceHolder=`Enter ${title} here`
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
            style={{width:"100%" ,outline: 'none', border: `1px solid ${borderColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />

        </Box>
    )
}
export default CreateProject