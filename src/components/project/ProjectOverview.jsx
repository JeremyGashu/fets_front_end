import { Box, CircularProgress, Grid, Typography, LinearProgress, Button } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import DoughnutChart from "./DonutChartProject"
import { mainColor } from "../../themes/color"
import { grey } from "@mui/material/colors"
import { Check } from "@mui/icons-material"
import ProjectBarChart from "./BarChartProject"
import { getBackgroundColorFromStatus, getTextColorFromStatus } from "../../configs/statuses"


const ProjectOverview = ({ projects = [], tasks = [] }) => {

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
            headerName: 'Task Name',
            width: 160,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{cellValue['row']['name']}</Typography>

                )
            }
        },


        {
            field: 'estimatedBudget',
            headerName: 'Budget',
            width: 150,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`$${cellValue['row']['estimatedBudget'].toLocaleString()} ETB`}</Typography>

                )
            }
        },

        {
            field: 'createdAt',
            headerName: 'Start Date',
            width: 150,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`${new Date(cellValue['row']['createdAt'])}`}</Typography>

                )
            }
        },

        {
            field: 'estimatedDuration',
            headerName: 'Due Date',
            width: 150,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`${new Date(cellValue['row']['estimatedDuration'])}`}</Typography>

                )
            }
        },
    ]

    let columns = [
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
            headerName: 'Project Name',
            width: 160,
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
                let approved = cellValue['row']['approved']
                let unapproved = cellValue['row']['unapproved']

                return (
                    <LinearProgress sx={{ width: 100, height: 8, borderRadius: 10, backgroundColor: 'grey' }} variant='determinate' value={approved === 0 && unapproved === 0 ? 0 : (approved / (unapproved + approved)) * 100} />
                )
            }
        },

        {
            field: 'estimatedBudget',
            headerName: 'Budget',
            width: 150,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`$${cellValue['row']['estimatedBudget'].toLocaleString()} ETB`}</Typography>

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
            field: 'fundedMoney',
            headerName: 'Donated',
            width: 150,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`$ ${cellValue['row']['fundedMoney'].toLocaleString()} ETB`}</Typography>

                )
            }
        },

        {
            field: 'createdAt',
            headerName: 'Start Date',
            width: 150,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`${new Date(cellValue['row']['createdAt'])}`}</Typography>

                )
            }
        },
    ]
    return (
        <>
            <Grid container direction='row' alignItems='center' justifyContent='space-between'>
                <Grid className='grid-display-scroll-none' item sx={{ p: 2, borderRadius: 3, backgroundColor: 'white', height: '430px', my: 3 }} sm={12} md={12} lg={7}>
                    <DataGrid
                        className='grid-display-scroll-none'
                        disableSelectionOnClick={true}
                        rows={projects}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableColumnSelector
                    />
                </Grid>

                <Grid item lg={4} md={5}>
                    <Box sx={{ width: '100%', p: 2, borderRadius: 3, backgroundColor: 'white', height: '430px', my: 3 }}>
                        <Typography sx={{ fontWeight: 'bold', color: grey[800], fontSize: 20 }}>Statistics</Typography>
                        <DoughnutChart projects={projects} />

                        <Grid container direction='row' alignItems='center' justifyContent='space-between'>
                            <Grid item>
                                <Grid container alignItems='center'>
                                    <Grid item>
                                        <CircularProgress sx={{ borderRadius: '50%', color: mainColor, backgroundColor: grey[300] }} variant='determinate' value={70} />

                                    </Grid>
                                    <Grid item sx={{ ml: 1 }}>
                                        <Typography sx={{ fontSize: 27, color: grey[800], fontWeight: 'bold' }}>{projects.filter(p => p.status !== 'Completed').length}</Typography>
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
                                        <Typography sx={{ fontSize: 27, color: grey[800], fontWeight: 'bold' }}>{projects.filter(p => p.status === 'Completed').length}</Typography>
                                        <Typography sx={{ color: grey[600] }}>Completed</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>

                </Grid>
            </Grid>

            <Grid container alignItems='center' justifyContent='space-between' gap={1}>
                <Grid item lg={6} md={12} sm={12}>
                    <Box sx={{ width: '100%', p: 2, borderRadius: 3, backgroundColor: 'white', height: '430px', my: 1.5 }} >
                        <Typography sx={{ fontSize: 22, color: grey[700], fontWeight: 'bold', mb: 4 }}>Estimation - Budget Insight</Typography>
                        <ProjectBarChart projects={projects} />

                    </Box>
                </Grid>

                <Grid item lg={5.5} md={12} sm={12}>
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

                        <Box sx={{ height: 330 }}>
                            <DataGrid
                                className='grid-display-scroll-none'
                                disableSelectionOnClick={true}
                                rows={tasks}
                                columns={taskColumns}
                                pageSize={3}
                                rowsPerPageOptions={[3]}
                                disableColumnSelector
                            />
                        </Box>

                    </Box>

                </Grid>

            </Grid>
        </>
    )
}

export default ProjectOverview