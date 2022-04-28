import { Check, LocalDiningOutlined, MoneyOutlined, PersonPin } from "@mui/icons-material"
import { Box, Divider, Grid, LinearProgress, Typography } from "@mui/material"
import { lightGreen } from "@mui/material/colors"
import { DataGrid } from "@mui/x-data-grid"
import LineChart from "../../components/LineChartProject"
import TechnicalAdminDashboardCard from "../../components/TechnicalAdminDashboardCard"
import { dashboardColor1, dashboardColor2, dashboardColor3, dashboardColor4, lightGreenBg, lightRedBg, lightRedText, lightYellowGg, lightYellowText } from "../../themes/color"

const DashboardPage = () => {

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
            name: 'Bishoftu Rizort',
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
        {
            field: 'id',
            headerName: 'NO',
            width: 150,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{cellValue['row']['id']}</Typography>

                )
            }
        },
        {
            field: 'name',
            headerName: 'Project Name',
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
                    <Box sx={{ display : 'flex',alignItems : 'center',justifyContent : 'center',width: 120, borderRadius: 2, px: 2, py: 1, backgroundColor: getBackgroundColorFromStatus(cellValue['row']['status']) }}>
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
    return (
        <>
            <Grid container>
                <Grid item lg={5}>
                    <Typography sx={{ pl: 1, color: '#444', fontSize: 13 }}>Donations</Typography>
                    <Typography sx={{ p: 1, fontWeight: 'bold', fontSize: 25 }}>$32,000,000</Typography>

                    <LineChart />
                </Grid>

                <Grid item lg={7} >
                    <Grid container rowGap={2} columnGap={2} alignItems='center' justifyContent='center'>

                        <TechnicalAdminDashboardCard backgroundColor={dashboardColor1} title='Donated Today' icon={<MoneyOutlined sx={{ color: 'white', fontSize: 35 }} />} text='$45,000' />

                        <TechnicalAdminDashboardCard backgroundColor={dashboardColor2} title='Projects Completed' icon={<Check sx={{ color: 'white', fontSize: 35 }} />} text={8} />

                        <TechnicalAdminDashboardCard backgroundColor={dashboardColor3} title='In Progress' icon={<LocalDiningOutlined sx={{ color: 'white', fontSize: 35 }} />} text={112} />

                        <TechnicalAdminDashboardCard backgroundColor={dashboardColor4} title='Donors' icon={<PersonPin sx={{ color: 'white', fontSize: 35 }} />} text={112} />

                    </Grid>
                </Grid>
            </Grid>

            <Divider sx={{ m: 3 }} />

            <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>Projects</Typography>

            <DataGrid
                disableSelectionOnClick={true}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableColumnSelector
            />

        </>
    )
}

export default DashboardPage