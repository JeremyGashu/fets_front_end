import { Box, Grid, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserName } from '../../configs/localstorage_handler'
import { backgroundColor } from '../../themes/color'

const HistoryExternalAuditor = () => {


    const { taskContract } = useSelector(state => state.contracts)
    const [events, setEvents] = useState([])

    const getStatusFromStatusNumber = (status) => {
        switch (status) {
            case 0:
                return <Typography sx={{ fontSize: 11, color: '#444', backgroundColor: backgroundColor, px: 1, py: 0.5, borderRadius: 1 }}>CREATED</Typography>
            case 2:
                return <Typography sx={{ fontSize: 11, color: '#444', backgroundColor: backgroundColor, px: 1, py: 0.5, borderRadius: 1 }}>ALLOCATED BY FINANCIAL MANAGER</Typography>
            case 1:
                return <Typography sx={{ fontSize: 11, color: '#444', backgroundColor: backgroundColor, px: 1, py: 0.5, borderRadius: 1, textTransform: 'uppercase' }}>Approved By Financial Officer</Typography>
            case 3:
                return <Typography sx={{ fontSize: 11, color: '#444', backgroundColor: backgroundColor, px: 1, py: 0.5, borderRadius: 1, textTransform: 'uppercase' }}>Approved By Project Manager</Typography>
            case 4:
                return <Typography sx={{ fontSize: 11, color: '#444', backgroundColor: backgroundColor, px: 1, py: 0.5, borderRadius: 1, textTransform: 'uppercase' }}>Approved By External Auditor</Typography>

            default:
                return <Typography>UNDEFINED</Typography>
        }
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
            field: 'projectId',
            headerName: 'Project',
            width: 100,
            renderCell: (cellValue) => {
                return (
                    <Link to={`project-detail/${cellValue['row']['projectId']}`}>
                        <Typography sx={{ fontSize: 13, }}>View Project</Typography>
                    </Link>

                )
            }
        },
        {
            field: 'from',
            headerName: 'From Status',
            width: 200,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{getStatusFromStatusNumber(cellValue['row']['from'])}</Typography>

                )
            }
        },


        {
            field: 'to',
            headerName: 'To Status',
            width: 220,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{getStatusFromStatusNumber(cellValue['row']['to'])}</Typography>

                )
            }
        },

        {
            field: 'date',
            headerName: 'Date',
            width: 150,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{`${new Date(cellValue['row']['date']).toLocaleDateString()}`}</Typography>

                )
            }
        }
    ]

    const loadUpdates = async () => {
        taskContract && taskContract.getPastEvents('ChangedTaskStatus',
            {
                // filter: { to: '0x28c6c06298d514db089934071355e5743bf21d60' },
                fromBlock: 0,
                toBlock: 'latest',
            },
            (err, e) => {
                let counter = 0
                let tempEvents = e.map(ev => {

                    return {
                        from: +ev.returnValues.from,
                        to: +ev.returnValues.to,
                        date: +ev.returnValues.date,
                        username: ev.returnValues.username,
                        projectId: +ev.returnValues.projectId,
                        id: ++counter
                    }
                })
                tempEvents = tempEvents.filter(ev => ev.username === getUserName())

                setEvents(tempEvents)
            });
    }

    useEffect(() => {
        loadUpdates()
        taskContract.events
            .ChangedTaskStatus({})
            .on("data", (event) => {
                loadUpdates()
            });
        //eslint-disable-next-line
    }, [taskContract])
    return (
        <Box sx={{ height: '90vh', width: '100%' }}>
            <Grid container justifyContent='space-between' alignItems='center' direction='row' sx={{ my: 3, px: 10 }}>
                <Grid item>
                    <Typography sx={{ color: '#444', fontSize: 18, fontWeight: 'bold' }}>TXN History</Typography>
                </Grid>

                {/* <Grid item>
                    <input onChange={e => {
                        let val = e.target.value
                        if (val === '') {
                            setSearching(false)
                            setResult([])
                            return
                        }
                        setSearching(true)
                        let res = events || []
                        let filtered = res.filter(r => r.username.toLowerCase().includes(val.toLowerCase()))
                        setResult(filtered)

                    }} type="text" placeholder='Search by username...'
                        style={{ width: "500px", outline: 'none', border: `0.5px solid ${mainColor}`, borderRadius: 7, padding: '8px 15px', color: '#444' }} />
                </Grid> */}
            </Grid>
            {/* <Divider /> */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ height: '450px', width: '840px' }}>
                    <DataGrid
                        className='grid-display-scroll-none'
                        disableSelectionOnClick={true}
                        rows={events}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableColumnSelector
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default HistoryExternalAuditor