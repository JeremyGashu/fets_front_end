import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { green, grey, } from '@mui/material/colors'
import { TaskDetailCardCompleted, TaskDetailCardNeedApproval, TaskDetailCardOngoing } from '../../components/project/TaskDetailCard'
import { backgroundColor, lightYellowText, mainColor } from '../../themes/color'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'


const SingleProjectDashbardFinancialOfficer = () => {
    const [tasks, setTasks] = useState([])
    const { id } = useParams()
    const { mappingContract, taskContract } = useSelector(state => state.contracts)

    const loadTasks = async () => {
        mappingContract && mappingContract.methods.getTaskListByProjectId(id).call().then(res => {
            let tempTasks = res.map(task => {
                return {
                    allocatedBudget: +task.allocatedBudget,
                    createdAt: +task.createdAt,
                    description: task.description,
                    estimatedDuration: +task.estimatedDuration,
                    id: +task.id,
                    name: task.name,
                    projectId: task.projectId,
                    remark: task.remark,
                    status: +task.status,
                    subProjectId: +task.subProjectId
                }
            })

            setTasks(tempTasks)
        })
    }

    useEffect(() => {
        loadTasks()
        taskContract.events
            .ChangedTaskStatus({})
            .on("data", (event) => {
                loadTasks()
            })
        return () => {

        }
        // eslint-disable-next-line
    }, [id, mappingContract])

    return (
        <Box sx={{ minHeight: '85vh', backgroundColor: backgroundColor, p: 2, borderRadius: 2 }}>
            <Grid container alignItems='start' justifyContent='space-between'>
                <Grid item lg={2.7}>
                    <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: grey[60] }}>TODO</Typography>
                    <Box sx={{ width: '100%', height: 2, backgroundColor: mainColor, mt: 1 }}></Box>
                    {
                        tasks.filter(task => task.status === 0).length === 0 && <Typography sx={{ fontSize: 12, my: 2, color: grey[700], textAlign: 'center' }}>No Task in Todo!</Typography>
                    }
                    {
                        tasks.filter(task => task.status === 0).map(t => {
                            return (
                                <TaskDetailCardOngoing task={t} />
                            )
                        })
                    }

                </Grid>

                <Grid item lg={2.7}>
                    <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: grey[60] }}>IN PROGRESS</Typography>
                    <Box sx={{ width: '100%', height: 2, backgroundColor: lightYellowText, mt: 1 }}></Box>
                    {
                        tasks.filter(task => task.status > 0 && task.status <= 2).length === 0 && <Typography sx={{ fontSize: 12, my: 2, color: grey[700], textAlign: 'center' }}>No Task in Progress!</Typography>
                    }
                    {
                        tasks.filter(task => task.status > 0 && task.status <= 2).map(t => {
                            return (
                                <TaskDetailCardOngoing task={t} />
                            )
                        })
                    }
                </Grid>

                <Grid item lg={2.7}>
                    <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: grey[60] }}>COMPLETED</Typography>
                    <Box sx={{ width: '100%', height: 2, backgroundColor: green[700], mt: 1 }}></Box>

                    {
                        tasks.filter(task => task.status === 3).length === 0 && <Typography sx={{ fontSize: 12, my: 2, color: grey[700], textAlign: 'center' }}>No Task is Completed!!</Typography>
                    }
                    {
                        tasks.filter(task => task.status === 3).map(t => {
                            return (
                                <TaskDetailCardCompleted task={t} />
                            )
                        })
                    }


                </Grid>

                <Grid item lg={2.7}>
                    <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: grey[60] }}>NEED APPROVAL</Typography>
                    <Box sx={{ width: '100%', height: 2, backgroundColor: mainColor, mt: 1 }}></Box>
                    {
                        tasks.filter(task => task.status === 0).length === 0 && <Typography sx={{ fontSize: 12, my: 2, color: grey[700], textAlign: 'center' }}>No Task needs your approval!</Typography>
                    }
                    {
                        tasks.filter(task => task.status === 0).map(t => {
                            return (
                                <TaskDetailCardNeedApproval task={t} />
                            )

                        })
                    }
                </Grid>
            </Grid>
        </Box>
    )
}

export default SingleProjectDashbardFinancialOfficer