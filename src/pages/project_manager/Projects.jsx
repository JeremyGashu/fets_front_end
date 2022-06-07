// import { AddOutlined } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Tab, Tabs, Typography, useAutocomplete } from '@mui/material'
import { green, grey, } from '@mui/material/colors'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom'
import FullPageLoading from '../../components/FullPageLoadingPage'
import ProjectOverview from '../../components/project/ProjectOverview'
import { TaskDetailCardCompleted, TaskDetailCardNeedApproval, TaskDetailCardOngoing } from '../../components/project/TaskDetailCard'
import { getUserName } from '../../configs/localstorage_handler'
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


    const [loadingProjects, setLoadingProjects] = useState(false)
    const [projects, setProjects] = useState([])
    const [tasks, setTasks] = useState([])
    const [subProjects, setSubProjects] = useState([])
    const { projectContract, mappingContract, subProjectContract, taskContract, address } = useSelector(state => state.contracts)
    const { register, handleSubmit, reset, formStateForFinancial: { errors } } = useForm()

    const [addTaskModalOpen, setAddModalModalOpen] = useState(false)
    const [addSubProjectModalOpen, setAddSubProjectModalOpen] = useState(false)


    const handleAddSubProject = (data) => {
        if (!projectValue || projectValue.id === null) {
            toast('Please select project!', { type: 'warning', position: toast.POSITION.BOTTOM_RIGHT, })
            return
        }

        subProjectContract.methods.addSubProject(data.name, data.description, projectValue.id, (new Date(data.estimatedDuration)).getTime()).send({ from: address }).then(res => {
            toast('Added Sub Project Successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            setAddSubProjectModalOpen(false)
            reset()
            // navigate('/project-manager')
        }).catch(err => {
            toast('Some error encountered!', { type: 'warning', position: toast.POSITION.BOTTOM_RIGHT, })
            setAddSubProjectModalOpen(false)
        })
    }


    const handleAddTask = (data) => {
        if (!projectValue || projectValue.id === null) {
            toast('Please select project!', { type: 'warning', position: toast.POSITION.BOTTOM_RIGHT, })
            return
        }

        if (!subProjectValue || subProjectValue.id === null) {
            toast('Please select sub project!', { type: 'warning', position: toast.POSITION.BOTTOM_RIGHT, })
            return
        }


        taskContract.methods.addTask(data.name, data.description, projectValue.id, subProjectValue.id, (new Date(data.estimatedDuration)).getTime(), 0).send({ from: address }).then(res => {
            toast('Added Task Successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            setAddModalModalOpen(false)
            // navigate('/project-manager')
        }).catch(err => {
            toast('Some error encountered!', { type: 'warning', position: toast.POSITION.BOTTOM_RIGHT, })
            setAddModalModalOpen(false)

        })
    }

    const loadData = async () => {
        setLoadingProjects(true)
        const username = getUserName() || ''

        mappingContract && mappingContract.methods.getProjectsListByUsername(username).call().then(res => {
            console.log(res)

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
                let tempSubProjects = []
                let tempTasks = []
                let sps = result.map(async (proj) => {
                    return await mappingContract.methods.getSubProjectListByProjectId(proj.id).call()
                })
                Promise.all(sps).then(results => {
                    results.forEach(res => {
                        tempSubProjects = [...tempSubProjects, ...res]
                    })

                    setSubProjects(tempSubProjects)

                })

                let ts = result.map(async (proj) => {
                    return await mappingContract.methods.getTaskListByProjectId(proj.id).call()
                })
                Promise.all(ts).then(results => {
                    results.forEach(res => {
                        tempTasks = [...tempTasks, ...res]
                    })

                    setSubProjects(tempSubProjects)
                    let parsed = tempTasks.map(task => {
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
                            subProjectId: +task.subProjectId,
                        }
                    })
                    setTasks(parsed)
                    console.log(tempSubProjects)
                    console.log(parsed)
                })


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
    }


    useEffect(() => {
        loadData()
        taskContract.events
            .ChangeedTaskStatus({})
            .on("data", (event) => {
                loadData()
            });

        subProjectContract
            .events
            .AddedSubProject({})
            .on("data", (event) => {
                loadData()
            });

        taskContract.events
            .AddedTask({})
            .on("data", (event) => {
                loadData()
            });

        // eslint-disable-next-line 
    }, [projectContract, mappingContract])



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

    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value: projectValue
    } = useAutocomplete({
        id: 'projects',
        options: projects || [],
        getOptionLabel: (option) => option.name,
    });

    const {
        getRootProps: getRootPropsSubProject,
        getInputProps: getInputPropsSubProject,
        getListboxProps: getListboxPropsSubProject,
        getOptionProps: getOptionPropsSubProject,
        groupedOptions: groupedOptionsSubProject,
        value: subProjectValue
    } = useAutocomplete({
        id: 'subprojects',
        options: subProjects || [],
        getOptionLabel: (option) => option.name,
    });

    if (loadingProjects) {
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
                            <Typography sx={{ fontSize: 12, color: grey[600] }}>FETS</Typography>
                        </Grid>
                    </Grid>


                </Grid>
                <Grid item>
                </Grid>
                <Dialog
                    open={addTaskModalOpen}
                    onClose={() => {
                        setAddModalModalOpen(false)
                    }}
                >
                    <DialogTitle id="alert-dialog-title">
                        <Typography variant='h6' sx={{ textAlign: 'center' }}>Add Task</Typography>
                        <Divider sx={{ my: 1, color: grey }} />
                    </DialogTitle>
                    <DialogContent>
                        <form autoComplete='false' onSubmit={handleSubmit(handleAddTask)}>

                            <Box padding={2}>
                                <Grid container justifyContent='space-between' alignItems='center'>
                                    <Grid item sm={12} lg={5} xs={12} sx={{ mx: 2 }}>
                                        <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Name</Typography>
                                        <input {...register('name', { required: true })} type="text" placeholder='Name'
                                            style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        {errors.name && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter name.</Typography>}

                                    </Grid>



                                    <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                        <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Estimated Completion Date</Typography>
                                        <input {...register('estimatedDuration', {
                                            required: true, validate: {
                                                validDate: (date) => {
                                                    let d = new Date(date)
                                                    let last = new Date('01/01/2025')
                                                    return d > (new Date()) && d < last
                                                }
                                            }
                                        })} type="date" placeholder='Estimated Completion Date...'
                                            style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        {errors.estimatedDuration && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please check completion date.</Typography>}

                                    </Grid>

                                    <Grid item lg={5} xs={12} sx={{ mx: 2 }}>

                                        {
                                            projects != null ? <div>
                                                <div {...getRootProps()}>
                                                    <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Project</Typography>
                                                    <input placeholder='Project' style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} {...getInputProps()} />
                                                    {/* {errors.p && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please select the project the task belongs to.</Typography>} */}

                                                </div>
                                                {groupedOptions.length > 0 ? (
                                                    <ul style={{ margin: 0, padding: 0 }} {...getListboxProps()}>
                                                        {groupedOptions.map((option, index) => (
                                                            <Box sx={{ p: 0.5, px: 3, backgroundColor: grey[100], width: '100%', my: 0.5, borderRadius: 1, cursor: 'pointer' }}>
                                                                <Typography sx={{ fontSize: 14 }} {...getOptionProps({ option, index })}>{option.name}</Typography>
                                                            </Box>
                                                        ))}
                                                    </ul>
                                                ) : null}
                                            </div> : <></>
                                        }

                                    </Grid>

                                    <Grid item lg={5} xs={12} sx={{ mx: 2 }}>

                                        {
                                            projects != null ? <div>
                                                <div {...getRootPropsSubProject()}>
                                                    <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Sub Project</Typography>
                                                    <input placeholder='Sub Project' style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} {...getInputPropsSubProject()} />
                                                    {/* {errors.sp && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter the sub project the task belongs to.</Typography>} */}

                                                </div>
                                                {groupedOptionsSubProject.length > 0 ? (
                                                    <ul style={{ margin: 0, padding: 0 }} {...getListboxPropsSubProject()}>
                                                        {groupedOptionsSubProject.map((option, index) => (
                                                            <Box sx={{ p: 0.5, px: 3, backgroundColor: grey[100], width: '100%', my: 0.5, borderRadius: 1, cursor: 'pointer' }}>
                                                                <Typography sx={{ fontSize: 14 }} {...getOptionPropsSubProject({ option, index })}>{option.name}</Typography>
                                                            </Box>
                                                        ))}
                                                    </ul>
                                                ) : null}
                                            </div> : <></>
                                        }

                                    </Grid>

                                    <Grid item lg={5} xs={12} sx={{ mx: 2 }}>

                                        {
                                            null ? <div>
                                                <div {...getRootProps()}>
                                                    <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Company</Typography>
                                                    <input style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} {...getInputProps()} />
                                                </div>
                                                {groupedOptions.length > 0 ? (
                                                    <ul style={{ margin: 0, padding: 0 }} {...getListboxProps()}>
                                                        {groupedOptions.map((option, index) => (
                                                            <Box sx={{ p: 0.5, px: 3, backgroundColor: grey[100], width: '100%', my: 0.5, borderRadius: 1, cursor: 'pointer' }}>
                                                                <Typography sx={{ fontSize: 14 }} {...getOptionProps({ option, index })}>{option.name}</Typography>
                                                            </Box>
                                                        ))}
                                                    </ul>
                                                ) : null}
                                            </div> : <></>
                                        }

                                    </Grid>

                                    <Grid item lg={12} xs={12} sx={{ mx: 2 }}>
                                        <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Description</Typography>
                                        <textarea {...register('description', { required: true })} placeholder='Description about the company...' style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        {errors.description && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter description.</Typography>}

                                    </Grid>

                                </Grid>

                                <DialogActions>
                                    <Button sx={{ color: mainColor, mr: 1 }} onClick={() => { setAddModalModalOpen(false) }}>Cancel</Button>
                                    <Button type='submit' sx={{ color: 'white', mr: 1, backgroundColor: mainColor, '&:hover': { backgroundColor: mainColor, } }} onClick={() => {
                                        // setDeleteModalOpen(false){re}
                                        // deleteCompanyMutation.mutate({ companyid: cellValue['row']['id'] })
                                    }} autoFocus>
                                        Create
                                    </Button>
                                </DialogActions>

                            </Box>
                        </form>
                    </DialogContent>

                </Dialog>



                <Dialog
                    open={addSubProjectModalOpen}
                    onClose={() => {
                        setAddSubProjectModalOpen(false)
                    }}
                >
                    <DialogTitle id="alert-dialog-title">
                        <Typography variant='h6' sx={{ textAlign: 'center' }}>Add Sub Project</Typography>
                        <Divider sx={{ my: 1, color: grey }} />
                    </DialogTitle>
                    <DialogContent>
                        <form autoComplete='false' onSubmit={handleSubmit(handleAddSubProject)}>

                            <Box padding={2}>
                                <Grid container justifyContent='space-between' alignItems='center'>
                                    <Grid item sm={12} lg={5} xs={12} sx={{ mx: 2 }}>
                                        <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Name</Typography>
                                        <input {...register('name', { required: true })} type="text" placeholder='Name'
                                            style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        {errors.name && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter name.</Typography>}

                                    </Grid>



                                    <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                        <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Estimated Completion Date</Typography>
                                        <input {...register('estimatedDuration', {
                                            required: true, validate: {
                                                validDate: (date) => {
                                                    let d = new Date(date)
                                                    let last = new Date('01/01/2025')
                                                    return d > (new Date()) && d < last
                                                }
                                            }
                                        })} type="date" placeholder='Estimated Completion Date'
                                            style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        {errors.estimatedDuration && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please check completion date.</Typography>}

                                    </Grid>

                                    <Grid item lg={5} xs={12} sx={{ mx: 2 }}>

                                        {
                                            projects != null ? <div>
                                                <div {...getRootProps()}>
                                                    <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Project</Typography>
                                                    <input placeholder='Project' style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} {...getInputProps()} />
                                                    {/* {errors.p && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter E-mail.</Typography>} */}

                                                </div>
                                                {groupedOptions.length > 0 ? (
                                                    <ul style={{ margin: 0, padding: 0 }} {...getListboxProps()}>
                                                        {groupedOptions.map((option, index) => (
                                                            <Box sx={{ p: 0.5, px: 3, backgroundColor: grey[100], width: '100%', my: 0.5, borderRadius: 1, cursor: 'pointer' }}>
                                                                <Typography sx={{ fontSize: 14 }} {...getOptionProps({ option, index })}>{option.name}</Typography>
                                                            </Box>
                                                        ))}
                                                    </ul>
                                                ) : null}
                                            </div> : <></>
                                        }

                                    </Grid>

                                    <Grid item lg={5} xs={12} sx={{ mx: 2 }}>

                                        {
                                            null ? <div>
                                                <div {...getRootProps()}>
                                                    <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Company</Typography>
                                                    <input style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} {...getInputProps()} />
                                                    {/* {errors.c && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter Company.</Typography>} */}

                                                </div>
                                                {groupedOptions.length > 0 ? (
                                                    <ul style={{ margin: 0, padding: 0 }} {...getListboxProps()}>
                                                        {groupedOptions.map((option, index) => (
                                                            <Box sx={{ p: 0.5, px: 3, backgroundColor: grey[100], width: '100%', my: 0.5, borderRadius: 1, cursor: 'pointer' }}>
                                                                <Typography sx={{ fontSize: 14 }} {...getOptionProps({ option, index })}>{option.name}</Typography>
                                                            </Box>
                                                        ))}
                                                    </ul>
                                                ) : null}
                                            </div> : <></>
                                        }

                                    </Grid>

                                    <Grid item lg={12} xs={12} sx={{ mx: 2 }}>
                                        <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Description</Typography>
                                        <textarea {...register('description', { required: true })} placeholder='Description about the company...' style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        {errors.description && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter description.</Typography>}

                                    </Grid>

                                </Grid>

                            </Box>

                            <DialogActions>
                                <Button sx={{ color: mainColor, mr: 1 }} onClick={() => { setAddSubProjectModalOpen(false) }}>Cancel</Button>
                                <Button type='submit' sx={{ color: 'white', mr: 1, backgroundColor: mainColor, '&:hover': { backgroundColor: mainColor, } }} onClick={() => {
                                    // setDeleteModalOpen(false)
                                    // deleteCompanyMutation.mutate({ companyid: cellValue['row']['id'] })
                                }} autoFocus>
                                    Create
                                </Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>



                <Grid item sx={{ mr: 2 }}>

                    <Button onClick={() => {
                        setAddModalModalOpen(true)
                    }} sx={{
                        color: 'white',
                        mx: 2,
                        backgroundColor: mainColor, '&:hover': {
                            backgroundColor: mainColor,
                        }
                    }}>
                        Add Task
                    </Button>

                    <Button onClick={() => {
                        setAddSubProjectModalOpen(true)
                    }} sx={{
                        color: 'white',
                        backgroundColor: mainColor, '&:hover': {
                            backgroundColor: mainColor,
                        }
                    }}>
                        Add Subproject
                    </Button>

                </Grid>
            </Grid>

            <Box sx={{}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Board" {...a11yProps(0)} />
                    <Tab label="Overview" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={1}>
                <ProjectOverview projects={projects} />
            </TabPanel>
            <TabPanel value={value} index={0}>
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
                            tasks.filter(task => task.status === 2).length === 0 && <Typography sx={{ fontSize: 12, my: 2, color: grey[700], textAlign: 'center' }}>No Task needs your approval!</Typography>
                        }
                        {
                            tasks.filter(task => task.status === 2).map(t => {
                                return (
                                    <TaskDetailCardNeedApproval task={t} />
                                )
                            })
                        }
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
