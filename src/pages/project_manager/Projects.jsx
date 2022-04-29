import { AddOutlined, } from '@mui/icons-material'
import { Box, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material'
import { green, grey, } from '@mui/material/colors'
import React from 'react'
import { useState } from 'react'
import ProjectOverview from '../../components/project/ProjectOverview'
import { TaskDetailCardCompleted, TaskDetailCardNotCompleted, TaskDetailCardOngoing } from '../../components/project/TaskDetailCard'
import { backgroundColor, lightYellowText, mainColor } from '../../themes/color'




function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


const ProjectPage = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };








    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }


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
                            <Typography>Project Name</Typography>
                            <Typography sx={{ fontSize: 12, color: grey[600] }}>Status</Typography>
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
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Overview" {...a11yProps(0)} />
                    <Tab label="Board" {...a11yProps(1)} />
                    <Tab label="List" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ProjectOverview />
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
            </TabPanel>



        </Box >
    )
}

export default ProjectPage
