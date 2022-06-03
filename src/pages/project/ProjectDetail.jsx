import { Box, Divider, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { backgroundColor, mainColor } from "../../themes/color"

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Lens, Visibility } from "@mui/icons-material"
import { DataGrid } from "@mui/x-data-grid"
import { getStatusByTaskStatusNumber } from "../../configs/statuses"

const ProjectDetail = () => {

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
            field: 'status',
            headerName: 'Status',
            width: 160,
            renderCell: (cellValue) => {
                return (
                    getStatusByTaskStatusNumber(cellValue['row']['status'])

                )
            }
        },
        {
            field: 'estimatedBudget',
            headerName: 'Budget',
            width: 150,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`$${cellValue['row']['allocatedBudget'].toLocaleString()} ETB`}</Typography>

                )
            }
        },

        {
            field: 'createdAt',
            headerName: 'Start Date',
            width: 150,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`${new Date(cellValue['row']['createdAt']).toLocaleDateString()}`}</Typography>

                )
            }
        },
        {
            field: 'estimatedDuration',
            headerName: 'Due Date',
            width: 150,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`${new Date(cellValue['row']['estimatedDuration']).toLocaleDateString()}`}</Typography>

                )
            }
        },
    ]
    //load sub projects from project id
    //load tasks with project id
    //render base on sub project
    const { id } = useParams()
    const { mappingContract } = useSelector(state => state.contracts)
    const [subprojects, setSubprojects] = useState([])
    const [selectedSubProject, setSelectedSubProject] = useState()
    const [loading, setLoading] = useState(false)
    // const [subprojects, setSubProjects] = useState([])
    // const [tasks, setTasks] = useState([])
    const loadSubProjects = async () => {
        let sps = await mappingContract.methods.getSubProjectListByProjectId(id).call()
        return sps
    }

    const loadTasks = async () => {
        let ts = await mappingContract.methods.getTaskListByProjectId(id).call()
        return ts
    }

    const getPercentageFromCount = (tasks = []) => {
        let count = 0
        tasks.forEach(task => {
            if (task.status >= 3) {
                count++
            }
        })

        return Math.floor(((count) / (tasks.length)) * 100)
    }

    const mapProjectsWithTasks = async () => {
        let tasks = await loadTasks()
        let subProjects = await loadSubProjects()
        let mapped = subProjects != null ? subProjects.map(sp => {
            return {
                createdAt: +sp.createdAt,
                description: sp.description,
                id: +sp.id,
                projectId: +sp.projectId,
                name: sp.name,
                estimatedDuration: +sp.estimatedDuration,
                tasks: tasks !== null ? tasks.filter(f => {
                    return f.subProjectId === sp.id
                }).map(task => {
                    return {
                        allocatedBudget: +task.allocatedBudget,
                        createdAt: +task.createdAt,
                        description: task.description,
                        estimatedDuration: +task.estimatedDuration,
                        id: +task.id,
                        name: task.name,
                        projectId: +task.projectId,
                        remark: task.remark,
                        status: +task.status,
                        subProjectId: +task.subProjectId
                    }
                }) : []
            }
        }) : []

        return mapped
    }

    useEffect(() => {
        setLoading(true)

        mapProjectsWithTasks().then(res => {
            setLoading(false)
            setSubprojects(res)
        }).catch(err => {
            setLoading(false)
            setLoading(false)

        })
    }, [])
    return (
        <>
            {
                subprojects.length === 0 && !loading &&
                < Typography sx={{ fontSize: 19, color: '#444', textAlign: 'center', m: 2 }}>
                    There are no subprojects to display.
                </Typography>
            }
            {
                subprojects && !loading &&
                <Grid container>
                    <Grid sx={{ backgroundColor: backgroundColor, minHeight: '80vh', borderRadius: 1 }} item lg={4} sm={4} md={4} >
                        {
                            subprojects && subprojects.map(subproject => {
                                return (
                                    <div onClick={() => {
                                        setSelectedSubProject(subproject)
                                    }}>
                                        <Grid container alignItems='center' sx={{ m: 1, p: 1, cursor: 'pointer' }} justifyContent='space-between' direction='row'>
                                            <Grid item lg={3}>
                                                <Box style={{ width: 45, height: 45 }}>
                                                    <CircularProgressbar text={`${getPercentageFromCount(subproject.tasks)}%`} value={getPercentageFromCount(subproject.tasks)} />
                                                </Box>
                                            </Grid>
                                            <Grid item lg={7} >
                                                <Grid container alignItems='start' direction='column'>
                                                    <Grid item>
                                                        <Typography noWrap sx={{ overflow: "hidden", textOverflow: "ellipsis", width: 120, fontSize: 12 }}>{subproject.name}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography sx={{ overflow: "hidden", textOverflow: "ellipsis", width: 120, fontSize: 11, color: '#444' }}>{new Date(subproject.createdAt).toLocaleDateString()}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item sx={{ mr: 2 }}>
                                                {
                                                    selectedSubProject && selectedSubProject === subproject && <Lens sx={{ color: mainColor, fontSize: 18 }} />
                                                }
                                            </Grid>


                                        </Grid>
                                        <Divider sx={{ color: 'silver' }} />
                                    </div>
                                )
                            })
                        }
                    </Grid>
                    <Grid sx={{ p: 1 }} item lg={8} sm={8} md={8}>
                        {
                            selectedSubProject && <DataGrid
                                className='grid-display-scroll-none'
                                disableSelectionOnClick={true}
                                rows={selectedSubProject.tasks || []}
                                columns={taskColumns}
                                pageSize={3}
                                rowsPerPageOptions={[3]}
                                disableColumnSelector
                            />
                        }
                    </Grid>
                </Grid>
            }
        </>
    )
}

export default ProjectDetail