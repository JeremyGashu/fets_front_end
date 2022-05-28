import { AddOutlined, } from '@mui/icons-material'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { grey, } from '@mui/material/colors'
import React from 'react'
import ProjectOverview from '../../components/project/ProjectOverview'
import { backgroundColor, mainColor } from '../../themes/color'

const ProjectManagerProjectPage = () => {

    // const [value, setValue] = useState(0);

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    // function a11yProps(index) {
    //     return {
    //         id: `simple-tab-${index}`,
    //         'aria-controls': `simple-tabpanel-${index}`,
    //     };
    // }

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: backgroundColor, p: 2, borderRadius: 2 }}>
            <Grid container alignItems='center' justifyContent='space-between'>
                <Grid item>
                    <Grid container alignItems='center'>
                        <Grid item>
                            <Box sx={{ width: 50, height: 50, backgroundColor: grey[400], borderRadius: 2 }}>

                            </Box>
                        </Grid>

                        <Grid item sx={{ ml: 2 }}>
                            <Typography>Project Management</Typography>
                            <Typography sx={{ fontSize: 12, color: grey[600] }}>Project</Typography>
                        </Grid>
                    </Grid>


                </Grid>
                <Grid item>
                    {/* <input placeholder='Search...' type="text" style={{ borderRadius: 10, color: '#444', outline: 'none', border: `1px solid ${mainColor}`, padding: '8px 10px' }} /> */}
                </Grid>
                <Grid item sx={{ mr: 2 }}>
                    <IconButton sx={{
                        backgroundColor: mainColor, '&:hover': {
                            backgroundColor: mainColor,
                        }
                    }}>
                        <AddOutlined sx={{ color: 'white' }} />
                    </IconButton>
                </Grid>
            </Grid>

            <Box sx={{}}>
                <ProjectOverview />
            </Box>
            {/* <TabPanel value={value} index={0}>
                
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container alignItems='start' justifyContent='space-between'>
                    <Grid item lg={2.7}>
                        <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: grey[60] }}>TODO</Typography>
                        <Box sx={{ width: '100%', height: 2, backgroundColor: mainColor, mt: 1 }}></Box>
                        <TaskDetailCardOngoing />

                    </Grid>

                    <Grid item lg={2.7}>
                        <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: grey[60] }}>IN PROGRESS</Typography>
                        <Box sx={{ width: '100%', height: 2, backgroundColor: lightYellowText, mt: 1 }}></Box>
                        <TaskDetailCardOngoing />
                    </Grid>

                    <Grid item lg={2.7}>
                        <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: grey[60] }}>COMPLETED</Typography>
                        <Box sx={{ width: '100%', height: 2, backgroundColor: green[700], mt: 1 }}></Box>

                        <TaskDetailCardCompleted />
                        <TaskDetailCardCompleted />
                        <TaskDetailCardCompleted />
                        <TaskDetailCardCompleted />
                        <TaskDetailCardCompleted />
                        <TaskDetailCardCompleted />
                        <TaskDetailCardCompleted />


                    </Grid>

                    <Grid item lg={2.7}>
                        <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: grey[60] }}>NEED APPROVAL</Typography>
                        <Box sx={{ width: '100%', height: 2, backgroundColor: mainColor, mt: 1 }}></Box>
                        <TaskDetailCardNotCompleted />
                        <TaskDetailCardNotCompleted />
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel> */}



        </Box >
    )
}

export default ProjectManagerProjectPage
