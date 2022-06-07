import { AddOutlined, } from '@mui/icons-material'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { grey, } from '@mui/material/colors'
import React, { useEffect } from 'react'
import ProjectOverview from '../../components/project/ProjectOverview'
import FullPageLoading from '../../components/FullPageLoadingPage'
import { backgroundColor, mainColor } from '../../themes/color'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TechnicalAdminProjectManagement = () => {

    const [projects, setProjects] = useState()
    const [tasks, setTasks] = useState()
    const [loadingProjects, setLoadingProjects] = useState(false)
    const [loadingTasks, setLoadingTasks] = useState(false)
    const navigate = useNavigate()

    const { projectContract, mappingContract, taskContract } = useSelector(state => state.contracts)
    // eslint-disable-next-line
    useEffect(() => {
        setLoadingProjects(true)

        taskContract.methods.getAllTasks().call().then(res => {
            let ts = res.map(task => {
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
            setTasks(ts)
        }).catch(err => {
            console.log(err)
            setLoadingTasks(false)
        })
        projectContract.methods.getAllProjects().call().then(res => {

            Promise.all(res.map(async (project) => {
                let s = await mappingContract.methods.getTaskStatusByProjectId(+project.id).call()
                let approved = +s[0]
                let unapproved = +s[1]
                let projectStatus = ''

                if (approved > 0 && unapproved === 0) {
                    projectStatus = 'Completed'
                }
                else if (approved === 0 && unapproved === 0) {
                    projectStatus = 'Pending'
                }
                else {
                    projectStatus = 'In Progress'
                }
                // console.log(mappingContract)
            
                return {
                    accountNumber: project.accountNumber,
                    companyId: +project.companyId,
                    createdAt: +project.createdAt,
                    description: project.description,
                    estimatedBudget: +project.estimatedBudget,
                    estimatedDuration: +project.estimatedDuration,
                    fundedMoney: +project.fundedMoney,
                    id: +project.id,
                    location: project.location,
                    name: project.name,
                    status: projectStatus,
                    approved,
                    unapproved
                }
            })).then(result => {
                setProjects(result)
                // console.log(result)
                setLoadingProjects(false)
            })
                .catch(err => {
                    console.log(err)
                    setLoadingProjects(false)
                })
        })
            .catch(err => {
                console.log(err)
                setLoadingProjects(false)
            })
        // eslint-disable-next-line
    }, [])

    if (loadingProjects || loadingTasks) {
        return <FullPageLoading />
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
                    }} onClick={() => {
                        navigate('create-project')
                    }}>
                        <AddOutlined sx={{ color: 'white' }} />
                    </IconButton>
                </Grid>
            </Grid>

            <Box sx={{}}>
                <ProjectOverview projects={projects} tasks={tasks} />
            </Box>
        </Box >
    )
}

export default TechnicalAdminProjectManagement
