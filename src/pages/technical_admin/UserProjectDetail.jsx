import { EmailOutlined, House, PersonOutline, Phone } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"
import { useState } from "react"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import FullPageLoading from "../../components/FullPageLoadingPage"
import ProjectOverview from "../../components/project/ProjectOverview"
import { getUserByUsername } from "../../controller/user"
import { mainColor } from "../../themes/color"

const UserProjectDetail = () => {
    const { username } = useParams()
    const { mappingContract, projectContract } = useSelector(state => state.contracts)
    const { data: user, isLoading } = useQuery(['users', username], () => getUserByUsername(username))
    const navigate = useNavigate()


    const [loadingProjects, setLoadingProjects] = useState(false)
    const [projects, setProjects] = useState([])
    const [tasks, setTasks] = useState([])
    const [subProjects, setSubProjects] = useState([])

    useEffect(() => {
        setLoadingProjects(true)

        mappingContract && mappingContract.methods.getProjectsListByUsername(username).call().then(res => {
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
        // eslint-disable-next-line 
    }, [projectContract, mappingContract])

    if (loadingProjects || isLoading) {
        return <FullPageLoading />
    }

    return (
        <>
            <Typography sx={{ my: 2 }} variant='h5'>User Info</Typography>

            {
                <>
                    <Grid container alignItems='center'>
                        <Grid item>
                            <PersonOutline sx={{ color: mainColor, fontSize: 20 }} />
                        </Grid>
                        <Grid item>
                            <Typography sx={{ fontSize: 14, ml: 1, mb: 1 }}>{user && user.user && user.user.name}</Typography>
                        </Grid>

                    </Grid>

                    <Grid container alignItems='center'>
                        <Grid item>
                            <Phone sx={{ color: mainColor, fontSize: 20 }} />
                        </Grid>
                        <Grid item>
                            <Typography sx={{ fontSize: 14, ml: 1, mb: 1 }}>{user && user.user && user.user.phone}</Typography>
                        </Grid>

                    </Grid>

                    <Grid container alignItems='center'>
                        <Grid item>
                            <EmailOutlined sx={{ color: mainColor, fontSize: 20 }} />
                        </Grid>
                        <Grid item>
                            <Typography sx={{ fontSize: 14, ml: 1, mb: 1 }}>{user && user.user && user.user.email}</Typography>
                        </Grid>

                    </Grid>

                    <Grid container alignItems='center'>
                        <Grid item>
                            <House sx={{ color: mainColor, fontSize: 20 }} />
                        </Grid>
                        <Grid item>
                            <div style={{ cursor: 'pointer' }} onClick={() => {
                                navigate(`/technical-admin/company-detail/${user && user.user && user.user.company && user.user.company.id}`)
                            }}>
                                <Typography sx={{ fontSize: 14, ml: 1, mb: 1 }}>{user && user.user && user.user.company && user.user.company.name}</Typography>
                            </div>
                        </Grid>

                    </Grid>


                </>


            }
            {
                projects && tasks && <ProjectOverview tasks={tasks} projects={projects} />
            }

        </>
    )
}

export default UserProjectDetail