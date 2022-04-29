import { AddOutlined, Check } from '@mui/icons-material'
import { Box, Button, CircularProgress, Grid, IconButton, LinearProgress, Typography } from '@mui/material'
import { grey, lightGreen } from '@mui/material/colors'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import ProjectBarChart from '../../components/project/BarChartProject'
import DoughnutChart from '../../components/project/DonutChartProject'
import { backgroundColor, mainColor } from '../../themes/color'
import { lightGreenBg, lightRedBg, lightRedText, lightYellowGg, lightYellowText } from "../../themes/color"





const ProjectPage = () => {

    const getTextColorFromStatus = (status) => {
        switch (status) {
            case 'In Progress':
                return lightYellowText
            case 'Completed':
                return lightGreen
            case 'Canceled':
                return lightRedText
            default:
                return 'yellow'
        }
    }

    const getBackgroundColorFromStatus = (status) => {
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

    let rows = [
        {
            id: 1,
            name: 'Gojjam Hospital',
            progress: 50,
            budget: 22500000,
            status: 'In Progress',
            donated: 1800000,
            start_date: '12-12-2022'

        },

        {
            id: 2,
            name: 'Addis Ababa Stadium',
            progress: 10,
            budget: 22500000,
            status: 'Completed',
            donated: 1800000,
            start_date: '12-12-2022'

        },

        {
            id: 3,
            name: 'Bishoftu Resort',
            progress: 80,
            budget: 22500000,
            status: 'Canceled',
            donated: 1800000,
            start_date: '12-12-2022'

        },

        {
            id: 4,
            name: 'Feeding Students',
            progress: 25,
            budget: 22500000,
            status: 'In Progress',
            donated: 1800000,
            start_date: '12-12-2022'

        },

        {
            id: 5,
            name: 'Addis Ababa Football Acadamy',
            progress: 90,
            budget: 22500000,
            status: 'In Progress',
            donated: 1800000,
            start_date: '12-12-2022'

        },


    ]

    let columns = [
        // {
        //     field: 'id',
        //     headerName: 'NO',
        //     width: 150,
        //     renderCell: (cellValue) => {
        //         return (
        //             <Typography sx={{ fontSize: 13, }}>{cellValue['row']['id']}</Typography>

        //         )
        //     }
        // },
        {
            field: 'name',
            headerName: 'Sub Project Name',
            width: 150,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{cellValue['row']['name']}</Typography>

                )
            }
        },

        {
            field: 'progress',
            headerName: 'Progress',
            width: 150,
            renderCell: (cellValue) => {
                return (
                    <LinearProgress sx={{ width: 100, height: 8, borderRadius: 10, backgroundColor: 'grey' }} variant='determinate' value={cellValue['row']['progress']} />

                )
            }
        },

        {
            field: 'budget',
            headerName: 'Budget',
            width: 150,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`$${cellValue['row']['budget'].toLocaleString()}M`}</Typography>

                )
            }
        },

        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (cellValue) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 120, borderRadius: 2, px: 2, py: 1, backgroundColor: getBackgroundColorFromStatus(cellValue['row']['status']) }}>
                        <Typography sx={{ fontWeight: 'bold', fontSize: 13, color: getTextColorFromStatus(cellValue['row']['status']) }}>{`${cellValue['row']['status']}`}</Typography>
                    </Box>

                )
            }
        },

        {
            field: 'donated',
            headerName: 'Donated',
            width: 150,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`$ ${cellValue['row']['donated'].toLocaleString()}M`}</Typography>

                )
            }
        },

        {
            field: 'start_date',
            headerName: 'Start Date',
            width: 150,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`${cellValue['row']['start_date']}`}</Typography>

                )
            }
        },
    ]



    let taskRows = [
        {
            id: 1,
            name: 'Gojjam Hospital',
            budget: 22500000,
            due_date: '12-12-2022'

        },

        {
            id: 2,
            name: 'Addis Ababa Stadium',
            budget: 22500000,
            due_date: '12-12-2022'
        },
        {
            id: 3,
            name: 'Bishoftu Resort',
            budget: 22500000,
            due_date: '12-12-2022'
        },

        {
            id: 4,
            name: 'Feeding Students',
            budget: 22500000,
            due_date: '12-12-2022'
        },
        {
            id: 3,
            name: 'Bishoftu Resort',
            budget: 22500000,
            due_date: '12-12-2022'
        },

        {
            id: 4,
            name: 'Feeding Students',
            budget: 22500000,
            due_date: '12-12-2022'
        },
    ]

    let taskColumns = [
        {
            field: 'id',
            headerName: 'NO',
            width: 40,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{cellValue['row']['id']}</Typography>

                )
            }
        },
        {
            field: 'name',
            headerName: 'Namee',
            width: 140,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{cellValue['row']['name']}</Typography>

                )
            }
        },


        {
            field: 'budget',
            headerName: 'Budget',
            width: 140,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`$${cellValue['row']['budget'].toLocaleString()}M`}</Typography>

                )
            }
        },

        {
            field: 'due_date',
            headerName: 'Due Date',
            width: 140,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`${cellValue['row']['due_date']}`}</Typography>

                )
            }
        },
    ]


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


            <Grid container direction='row' alignItems='center' justifyContent='space-between'>
                <Grid className='grid-display-scroll-none' item sx={{ p: 2, borderRadius: 3, backgroundColor: 'white', height: '430px', my: 3 }} lg={7}>
                    <DataGrid
                        className='grid-display-scroll-none'
                        disableSelectionOnClick={true}
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableColumnSelector
                    />
                </Grid>

                <Grid item lg={4}>
                    <Box sx={{ width: '100%', p: 2, borderRadius: 3, backgroundColor: 'white', height: '430px', my: 3 }}>
                        <Typography sx={{ fontWeight: 'bold', color: grey[800], fontSize: 20 }}>Statistics</Typography>
                        <DoughnutChart />

                        <Grid container direction='row' alignItems='center' justifyContent='space-between'>
                            <Grid item>
                                <Grid container alignItems='center'>
                                    <Grid item>
                                        <CircularProgress sx={{ borderRadius: '50%', color: mainColor, backgroundColor: grey[300] }} variant='determinate' value={70} />

                                    </Grid>
                                    <Grid item sx={{ ml: 1 }}>
                                        <Typography sx={{ fontSize: 27, color: grey[800], fontWeight: 'bold' }}>3</Typography>
                                        <Typography sx={{ color: grey[600] }}>Ongoing</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item>
                                <Grid container alignItems='center'>
                                    <Grid item>
                                        <Box sx={{ width: 42, height: 42, backgroundColor: grey[300], borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Check sx={{ color: mainColor }} />
                                        </Box>
                                    </Grid>
                                    <Grid item sx={{ ml: 1 }}>
                                        <Typography sx={{ fontSize: 27, color: grey[800], fontWeight: 'bold' }}>3</Typography>
                                        <Typography sx={{ color: grey[600] }}>Completed</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>

                </Grid>
            </Grid>

            <Grid container alignItems='center' justifyContent='space-between' gap={1}>
                <Grid item lg={6}>
                    <Box sx={{ width: '100%', p: 2, borderRadius: 3, backgroundColor: 'white', height: '430px', my: 1.5 }} >
                        <Typography sx={{ fontSize: 22, color: grey[700], fontWeight: 'bold', mb: 4 }}>Estimation - Budget Insight</Typography>
                        <ProjectBarChart />

                    </Box>
                </Grid>

                <Grid item lg={5.5}>
                    <Box sx={{ width: '100%', p: 2, borderRadius: 3, backgroundColor: 'white', height: '430px', my: 1.5, }} >
                        <Grid container justifyContent='space-between' alignItems='center' sx={{ mb: 2 }}>
                            <Grid item>
                                <Typography sx={{ fontSize: 18, color: grey[700], fontWeight: 'bold' }}>Upcoming Tasks</Typography>

                            </Grid>
                            <Grid item>
                                <Button sx={{
                                    borderRadius: 2,
                                    fontWeight: 'bold',
                                    color: 'white', backgroundColor: mainColor, '&:hover': {
                                        backgroundColor: mainColor,
                                    }
                                }}>View All</Button>
                            </Grid>

                        </Grid>

                        <Box sx={{height : 330}}>
                            <DataGrid
                                className='grid-display-scroll-none'
                                disableSelectionOnClick={true}
                                rows={taskRows}
                                columns={taskColumns}
                                pageSize={3}
                                rowsPerPageOptions={[3]}
                                disableColumnSelector
                            />
                        </Box>

                    </Box>

                </Grid>

            </Grid>

        </Box>
    )
}

export default ProjectPage
