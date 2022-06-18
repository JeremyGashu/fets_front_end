import { Check, CreateOutlined, Delete, EditOutlined, Visibility, Warning } from "@mui/icons-material"
import { Box, Button, Grid, IconButton, Switch, Typography, Dialog, Tooltip } from "@mui/material"
import { green, grey } from "@mui/material/colors"
import { DataGrid } from "@mui/x-data-grid"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import FullPageLoading from "../../components/FullPageLoadingPage"
import { changeUserActivity, deleteUser, getAllUsers } from "../../controller/user"
import { backgroundColor, mainColor } from "../../themes/color"

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { toast } from "react-toastify"
import { queryClient } from "../.."



const UserPage = () => {

    const navigate = useNavigate()
    const { data, isLoading } = useQuery('users', getAllUsers)
    const [selectdUser, setSelectedUser] = useState()
    // const navigate = useNavigate()

    const { mutate } = useMutation(deleteUser, {
        onError: (error, variables, context) => {
            error.response.data && error.response.data.errors && error.response.data.errors.forEach(error => {
                toast(error, { type: 'error', position: toast.POSITION.BOTTOM_RIGHT, })
            })
        },
        onSuccess: (data, variables, context) => {
            toast('Deleted company successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            navigate('/technical-admin')
            queryClient.invalidateQueries(['users'])
            handleClose()
        },
    })

    const [userType, setUserType] = useState('ALL')

    const filterUserByType = (data) => {
        if (userType === 'ALL') return data
        return data.filter(user => user.role === userType)
    }

    const handleChangeUserStatus = async (id, val) => {
        await changeUserActivity(id, val)
        queryClient.invalidateQueries('users')
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null)
    };

    let columns = [

        {
            field: 'name',
            headerName: 'Name',
            width: 140,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{cellValue['row']['name']}</Typography>

                )
            }
        },

        {
            field: 'email',
            headerName: 'Email',
            width: 140,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{cellValue['row']['email']}</Typography>

                )
            }
        },

        {
            field: 'status',
            headerName: 'Status',
            width: 140,
            renderCell: (cellValue) => {
                return (
                    <Grid container justifyContent='space-evenly' alignItems='center' sx={{ py: 1, borderRadius: 1 }}>
                        {cellValue['row']['status'] === 'active' && <Check sx={{ fontSize: 13, color: green }} />}
                        {cellValue['row']['status'] === 'inactive' && <Warning sx={{ fontSize: 13, color: 'yellow' }} />}
                        <Typography sx={{ color: cellValue['row']['status'] ? mainColor : 'red', fontSize: 13, fontWeight: 'bold' }}>{cellValue['row']['status'] ? 'Active' : 'Inactive'}</Typography>
                        <Switch onChangeCapture={(e) => {
                            handleChangeUserStatus(cellValue['row']['id'], e.target.checked)
                        }} color={cellValue['row']['status'] ? 'success' : 'error'} checked={cellValue['row']['status']} onChange={(e) => {
                            // setSelectedRole(cellValue['row'])
                            // disableRoleMutation.mutate({ ...cellValue['row'], status: e.target.checked ? 'active' : 'inactive' })

                        }} size='small' sx={{ size: 15 }} />

                    </Grid>
                )
            }
        },

        {
            field: 'phone',
            headerName: 'Phone',
            width: 120,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{cellValue['row']['phone']}</Typography>

                )
            }
        },
        {
            field: 'company',
            headerName: 'Company',
            width: 120,
            renderCell: (cellValue) => {
                return (
                    <>
                        {
                            cellValue['row']['role'] !== 'TECHNICAL_ADMIN'
                                ?
                                <div onClick={() => {
                                    console.log(`company-detail/${cellValue['row']['company'] && cellValue['row']['company']['id']}`)
                                    navigate(`company-detail/${cellValue['row']['company'] && cellValue['row']['company']['id']}`)
                                }}>
                                    <Typography className='capitalize' sx={{ fontSize: 13, color: mainColor, textDecoration: 'underline', cursor: 'pointer', '&:hover': { color: green } }}>{cellValue['row']['company'] && cellValue['row']['company']['name']}</Typography>
                                </div>
                                :
                                <Typography sx={{ fontSize: 13, }}>---</Typography>
                        }
                    </>

                )
            }
        },

        {
            field: 'username',
            headerName: 'Username',
            width: 120,
            renderCell: (cellValue) => {
                return (
                    <Typography sx={{ fontSize: 13, }}>{cellValue['row']['username']}</Typography>

                )
            }
        },
        // {
        //     field: 'role',
        //     headerName: 'Role',
        //     width: 150,
        //     renderCell: (cellValue) => {
        //         return (
        //             <Typography sx={{ fontSize: 13, }}>{cellValue['row']['role'].toLowerCase().replace('_', ' ')}</Typography>

        //         )
        //     }
        // },

        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (cellValue) => {
                return (
                    <Grid container direction='row'>
                        <Grid item>
                            <Tooltip title='Delete User'>
                                <IconButton>
                                    <Delete onClick={() => {
                                        handleClickOpen()
                                        setSelectedUser(cellValue['row'])
                                    }} sx={{ color: 'red', fontSize: 18 }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>

                        <Grid item>
                            <Tooltip title='View Details'>
                                <IconButton onClick={() => {
                                    console.log()
                                    navigate(`user-project-detail/${cellValue['row']['username']}`)
                                }}>
                                    <Visibility sx={{ fontSize: 18, color: mainColor }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>

                        <Grid item>
                            <Tooltip title='Edit User'>
                                <IconButton onClick={() => {
                                    console.log(cellValue['row']['id'])
                                    navigate(`edit-user/${cellValue['row']['username']}`)
                                }}>
                                    <EditOutlined sx={{ fontSize: 18, color: mainColor }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>

                )
            }
        }
    ]


    if (isLoading) {
        return <FullPageLoading />
    }
    return (
        <>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{ zIndex: 999999 }}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Grid container alignItems='center'>
                        <Grid item>
                            <Delete sx={{ fontSize: 22 }} />
                        </Grid>
                        <Grid item>
                            <Typography sx={{}}>Delete User</Typography>
                        </Grid>

                    </Grid>
                </DialogTitle>
                <DialogContent dividers>

                    <Typography gutterBottom>
                        Are you sure you want to Delete User?
                    </Typography>
                </DialogContent>
                <DialogActions>

                    <Button sx={{
                        width: 150,
                        color: grey[600]
                    }} autoFocus onClick={handleClose}>
                        Cancel
                    </Button>


                    <Button sx={{
                        width: 150, backgroundColor: 'red', color: 'white', '&:hover': {
                            backgroundColor: 'red'
                        }
                    }} autoFocus onClick={() => {
                        mutate({ id: setSelectedUser && selectdUser.id })
                    }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Box sx={{ backgroundColor: backgroundColor, width: '100%', minHeight: '70vh', p: 2, borderRadius: 1 }}>
                <Grid container justifyContent='space-between' alignItems='center'>
                    <Grid item>
                        <Typography sx={{ fontSize: 24, fontWeight: 'bold' }}>Users</Typography>
                    </Grid>
                    <Grid item>
                        <Button startIcon={<CreateOutlined />} size='medium' sx={{
                            backgroundColor: mainColor, color: 'white', '&:hover': {
                                backgroundColor: mainColor
                            },
                            m: 2
                        }} type='primary' onClick={() => {
                            navigate('create-user')
                        }}>Add User</Button>
                    </Grid>
                </Grid>

                <Box sx={{ p: 2, backgroundColor: 'white', height: '100%' }}>
                    <Grid container sx={{ mx: 5 }} justifyContent='flex-start'>
                        <div onClick={() => { setUserType('ALL') }}>
                            <Grid item>
                                <Typography className='user-type' sx={{ fontWeight: 'bold', fontSize: 13, color: grey[userType === 'ALL' ? 900 : 500], mr: 3, my: 1 }}>All Users</Typography>
                            </Grid>
                        </div>

                        <div onClick={() => { setUserType('PROJECT_MANAGER') }}>
                            <Grid item>
                                <Typography className='user-type' sx={{ fontWeight: 'bold', fontSize: 13, color: grey[userType === 'PROJECT_MANAGER' ? 900 : 500], mr: 3, my: 1 }}>Project Managers</Typography>
                            </Grid>
                        </div>

                        <div onClick={() => { setUserType('FINANCIAL_OFFICER') }}>
                            <Grid item>
                                <Typography className='user-type' sx={{ fontWeight: 'bold', fontSize: 13, color: grey[userType === 'FINANCIAL_OFFICER' ? 900 : 500], mr: 3, my: 1 }}>Financial Officers</Typography>
                            </Grid>
                        </div>

                        <div onClick={() => { setUserType('BUDGET_PROCUREMENT_MANAGER') }}>
                            <Grid item>
                                <Typography className='user-type' sx={{ fontWeight: 'bold', fontSize: 13, color: grey[userType === 'BUDGET_PROCUREMENT_MANAGER' ? 900 : 500], mr: 3, my: 1 }}>Budget & Proc. Managers</Typography>
                            </Grid>
                        </div>

                        <div onClick={() => { setUserType('EXTERNAL_AUDITOR') }}>
                            <Grid item>
                                <Typography className='user-type' sx={{ fontWeight: 'bold', fontSize: 13, color: grey[userType === 'EXTERNAL_AUDITOR' ? 900 : 500], mr: 3, my: 1 }}>External Auditors</Typography>
                            </Grid>
                        </div>
                    </Grid>

                    <Box sx={{ height: 380, mt: 4 }}>
                        <DataGrid
                            disableSelectionOnClick={true}
                            rows={(data && filterUserByType(data)) || []}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableColumnSelector
                        />
                    </Box>
                </Box>

            </Box>
        </>
    )
}

export default UserPage