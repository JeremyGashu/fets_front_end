import { Check, LocalDiningOutlined, MoneyOutlined, PersonPin, DashboardOutlined } from "@mui/icons-material"
import { Box, Divider, Grid, IconButton, LinearProgress, Tooltip, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
// import { useNavigate } from "react-router-dom"
import FullPageLoading from "../../components/FullPageLoadingPage"
import PieChart from "../../components/project/PieChart"
import TechnicalAdminDashboardCard from "../../components/technical_admin/TechnicalAdminDashboardCard"
import { getUserName } from "../../configs/localstorage_handler"
import { getBackgroundColorFromStatus, getTextColorFromStatus } from "../../configs/statuses"
import { getCompaniesCount } from "../../controller/company"
import { getDonorsCount } from "../../controller/user"
import { dashboardColor1, dashboardColor2, dashboardColor3, dashboardColor4, mainColor } from "../../themes/color"

const FinancialOfficerDashboard = () => {

    const navigate = useNavigate()

    const [loadingProjects, setLoadingProjects] = useState(false)
    const [projects, setProjects] = useState()
    const { projectContract, mappingContract, paymentInfoContract } = useSelector(state => state.contracts)
    // const navigate = useNavigate()

    const [donorsCount, setDonorsCount] = useState(0)
    const [companiesCount, setCompaniesCount] = useState(0)
    const [overallDonated, setOverallDonated] = useState(0)
    const [todayDonation, setTodayDonation] = useState(0)
    const [projectsCount, setProjectsCount] = useState(0)
    const [totalDonated, setTotalDonated] = useState(0)
    const [totalNeeded, setTotalNeeded] = useState(0)
    // const [anchorEl, setAnchorEl] = useState(null);
    const getOverAllData = async () => {
        paymentInfoContract.methods.getOverallDonation().call().then(res => {
            setOverallDonated(res)
        })
        paymentInfoContract.methods.getTodaysDonationsAmount().call().then(res => {
            setTodayDonation(res)
        })
        projectContract.methods.getProjectsCount().call().then(res => {
            setProjectsCount(res)
        })

        projectContract.methods.getProjectStatus().call().then(res => {
            setTotalDonated(res && res['donated'])
            setTotalNeeded(res && res['needed'])
        })


        getDonorsCount().then(res => {
            setDonorsCount(res)
        })
        getCompaniesCount().then(res => {
            setCompaniesCount(res)
        })
    }

    useEffect(() => {
        getOverAllData()
        setLoadingProjects(true)
        projectContract.events
            .AddedProject({})
            .on("data", (event) => {
                getOverAllData()
            });
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
    }, [projectContract, mappingContract])

    if (loadingProjects) {
        return <FullPageLoading />
    }

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
            width: 140,
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
            width: 140,
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
            width: 100,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`$ ${cellValue['row']['fundedMoney'].toLocaleString()} ETB`}</Typography>

                )
            }
        },

        {
            field: 'createdAt',
            headerName: 'Start Date',
            width: 130,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`${new Date(cellValue['row']['createdAt']).toLocaleDateString()}`}</Typography>

                )
            }
        },

        {
            field: 'actions',
            headerName: 'Action',
            width: 130,
            renderCell: (cellValue) => {
                return (
                    <Grid item>
                        <Tooltip title='Dashboard'>
                            <IconButton onClick={() => {
                                navigate(`single-project-dashboard/${cellValue['row']['id']}`)
                            }}>
                                <DashboardOutlined sx={{ color: mainColor, fontSize: 14 }} />
                            </IconButton>
                        </Tooltip>
                    </Grid>

                )
            }
        },
    ]
    return (
        <>
            <Grid container>
                <Grid item lg={5}>
                    <Typography sx={{ pl: 1, color: '#444', fontSize: 13 }}>Donations</Typography>
                    <Typography sx={{ p: 1, fontWeight: 'bold', fontSize: 25 }}>{`${overallDonated} USD`}</Typography>

                    <Box sx={{ width: 250 }}>
                        <PieChart totalDonated={totalDonated + 1 || 1} totalNeeded={totalNeeded + 1 || 1} />
                    </Box>
                </Grid>

                <Grid item lg={7} >
                    <Grid container rowGap={2} columnGap={2} alignItems='center' justifyContent='center'>

                        <TechnicalAdminDashboardCard backgroundColor={dashboardColor1} title='Donated Today' icon={<MoneyOutlined sx={{ color: 'white', fontSize: 35 }} />} text={`${todayDonation} USD`} />

                        <TechnicalAdminDashboardCard backgroundColor={dashboardColor2} title='Projects' icon={<Check sx={{ color: 'white', fontSize: 35 }} />} text={projectsCount} />

                        <TechnicalAdminDashboardCard backgroundColor={dashboardColor3} title='Companies' icon={<LocalDiningOutlined sx={{ color: 'white', fontSize: 35 }} />} text={companiesCount || 0} />

                        <TechnicalAdminDashboardCard backgroundColor={dashboardColor4} title='Donors' icon={<PersonPin sx={{ color: 'white', fontSize: 35 }} />} text={donorsCount || 0} />

                    </Grid>
                </Grid>
            </Grid>

            <Divider sx={{ m: 3 }} />

            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Projects</Typography>

            <DataGrid
                disableSelectionOnClick={true}
                rows={projects || []}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableColumnSelector
            />

        </>
    )
}

export default FinancialOfficerDashboard