import { CalendarMonthOutlined, Check, CloseOutlined, InfoOutlined } from "@mui/icons-material"
import { Box, Button, Dialog, DialogActions, Popover, DialogContent, DialogTitle, Divider, Grid, IconButton, Typography } from "@mui/material"
import { green, grey, red, } from "@mui/material/colors"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { getUserName, getUserType } from "../../configs/localstorage_handler"
import { ROLES } from "../../configs/roles"
import { mainColor } from "../../themes/color"
export const TaskDetailCardCompleted = ({ task = {} }) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Box sx={{ p: 2, width: '100%', backgroundColor: 'white', minHeight: 220, my: 1, borderRadius: 3, boxShadow: `1px 1px 3px 5px  ${grey[100]}` }}>

            <Popover
                id='pop-over-id'
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{
                    px: 2, borderRadius: 4, maxWidth: 200, backgroundColor: 'transparent', py: 2, position: 'relative'
                }}>
                    <Grid container alignItems='center' justifyContent='space-between' direction='row'>
                        <Grid item>
                            <Typography sx={{ fontSize: 12, color: '#444' }}>Comment</Typography>

                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleClose}>
                                <CloseOutlined sx={{ color: 'red', fontSize: 14 }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Divider sx={{ mb: 3 }} />
                    {
                        task && task.remark && <Typography sx={{ fontSize: 13 }}>
                            {
                                task.remark
                            }
                        </Typography>
                    }

                    {
                        task && !task.remark && <Typography sx={{ fontSize: 13 }}>
                            No Remark Was Added!
                        </Typography>
                    }

                </Box>
            </Popover>

            <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: grey[700], my: 3 }}>
                {task.name}
            </Typography>

            <Typography sx={{ fontSize: 13, color: grey[600] }}>
                {task.description}
            </Typography>

            {/* <Typography sx={{ fontSize: 11, color: mainColor, py: 1, borderRadius: 2, }}>
                Sub project name
            </Typography> */}

            <Divider sx={{ my: 1 }} />

            <Grid container justifyContent='flex-end' alignItems='center'>
                <Grid item>
                    <Check sx={{ color: green[800] }} />
                </Grid>
                <Grid item sx={{ ml: 0.5 }}>
                    <Typography sx={{ fontSize: 13, color: green[700] }}>Done</Typography>
                </Grid>

                <Grid item sx={{ ml: 0.5 }}>
                    <IconButton onClick={handleClick}>
                        <InfoOutlined sx={{ color: mainColor, fontSize: 17 }} />
                    </IconButton>
                </Grid>
            </Grid>

        </Box>
    )
}


export const TaskDetailCardOngoing = ({ task = {} }) => {


    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Box sx={{ p: 2, width: '100%', backgroundColor: 'white', minHeight: 220, my: 1, borderRadius: 3, boxShadow: `1px 1px 3px 5px  ${grey[100]}` }}>


            <Popover
                id='pop-over-id'
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{
                    px: 2, borderRadius: 4, maxWidth: 200, backgroundColor: 'transparent', py: 2, position: 'relative'
                }}>
                    <Grid container alignItems='center' justifyContent='space-between' direction='row'>
                        <Grid item>
                            <Typography sx={{ fontSize: 12, color: '#444' }}>Comment</Typography>

                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleClose}>
                                <CloseOutlined sx={{ color: 'red', fontSize: 14 }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Divider sx={{ mb: 3 }} />
                    {
                        task && task.remark && <Typography sx={{ fontSize: 13 }}>
                            {
                                task.remark
                            }
                        </Typography>
                    }

                    {
                        task && !task.remark && <Typography sx={{ fontSize: 13 }}>
                            No Remark Was Added!
                        </Typography>
                    }

                </Box>
            </Popover>

            <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: grey[700], my: 3 }}>
                {task.name}
            </Typography>

            <Typography sx={{ fontSize: 13, color: grey[600] }}>
                {task.description}
            </Typography>

            {/* <Typography sx={{ fontSize: 11, color: mainColor, py: 1, borderRadius: 2, }}>
                {Sub project name}
            </Typography> */}

            <Divider sx={{ my: 1 }} />

            <Grid container justifyContent='flex-end' alignItems='center'>
                <Grid item>
                    <CalendarMonthOutlined sx={{ color: grey[400] }} />
                </Grid>
                <Grid item sx={{ ml: 0.5 }}>
                    <Typography sx={{ fontSize: 13, color: grey[700] }}>{(new Date(task.estimatedDuration)).toLocaleDateString()}</Typography>
                </Grid>
                <Grid item sx={{ ml: 0.5 }}>
                    <IconButton onClick={handleClick}>
                        <InfoOutlined sx={{ color: mainColor, fontSize: 17 }} />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export const TaskDetailCardNeedApproval = ({ task = {} }) => {

    const { taskContract, address } = useSelector(state => state.contracts)
    const [financialManagerApproveOpen, setFinancialManagerApproveOpen] = useState(false)

    const [projectManagerApproveOpen, setProjectManagerApproveOpen] = useState(false)
    const [externalAuditorApproveOpen, setExternalAuditorApproveOpen] = useState(false)
    const [procurementManagerApproveOpen, setProcurementManagerApproveOpen] = useState(false)

    const [projectManagerDeclineOpen, setProjectManagerDeclineOpen] = useState(false)
    const [procurementManagerDeclineOpen, setProcurementManagerDeclineOpen] = useState(false)
    const [externalAuditorDeclineOpen, setExternalAuditorDeclineOpen] = useState(false)

    const { register: registerForDeclineByProjectManager, handleSubmit: handleSubmitForDeclineByPrjectManager, formState: { errors: declineByProjectManagerErrors } } = useForm()
    const { register: registerForDeclineByExternalAuditor, handleSubmit: handleSubmitForDeclineByExternalAuditor, formState: { errors: declineByExternalAuditorErrors } } = useForm()
    const { register: registerForDeclineByProcurementManager, handleSubmit: handleSubmitForDeclineByProcurementManager, formState: { errors: declineByProcurementManagerErrors } } = useForm()

    const { register: registerForFinancialManager, handleSubmit: handleSubmitForFinancialManager, formState: { errors: fmErrors } } = useForm()
    const { register: registerForProjectManager, handleSubmit: handleSubmitForProjectManager, formState: { errors: pmErrors } } = useForm()
    const { register: registerForProcurementManager, handleSubmit: handleSubmitForProcurementManager, formState: { errors: pmmErrors } } = useForm()
    const { register: registerForExternalAuditor, handleSubmit: handleSubmitForExternalAuditor, formState: { errors: eaErrors } } = useForm()


    // const { register, handleSubmit, formState: { errors } } = useForm()
    // const { register, handleSubmit, formState: { errors } } = useForm()
    // const { register, handleSubmit, formState: { errors } } = useForm()

    const handleAFinancialManagerSubmitBudgetAllocation = (data) => {
        taskContract.methods.financialManagerSubmitBudgetAllocation(task.id, +data.amount, data.remark, getUserName(), task.projectId).send({ from: address }).then(res => {
            toast('Approved task completion successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            setFinancialManagerApproveOpen(false)
        })
            .catch(err => {
                toast('Some error encountered!', { type: 'warning', position: toast.POSITION.BOTTOM_RIGHT, })
                setFinancialManagerApproveOpen(false)
            })
    }

    const handleProjectManagerApproveTaskCompletion = (data) => {
        taskContract.methods.projectManagerApproveTaskCompletion(task.id, data.remark, getUserName(), task.projectId).send({ from: address }).then(res => {
            toast('Approved task completion successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            setProjectManagerApproveOpen(false)
        })
            .catch(err => {

            })
    }

    const handleProcurementManagerApproveTaskCompletion = (data) => {
        console.log(data)
        taskContract.methods.budgetAndProcurementManagerApproveTaskCompletion(task.id, data.remark, getUserName(), task.projectId).send({ from: address }).then(res => {
            toast('Approved task completion successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            setProcurementManagerApproveOpen(false)
        })
            .catch(err => {
                toast('Some error encountered!', { type: 'warning', position: toast.POSITION.BOTTOM_RIGHT, })
                setProcurementManagerApproveOpen(false)


            })
    }

    const handleExternalAuditorApproveTaskCompletion = (data) => {
        taskContract.methods.externalAuditorApproveTaskCompletion(task.id, data.remark, getUserName(), task.projectId).send({ from: address }).then(res => {
            toast('Approved task completion successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            setExternalAuditorApproveOpen(false)
        })
            .catch(err => {
                toast('Some error encountered!', { type: 'warning', position: toast.POSITION.BOTTOM_RIGHT, })
                setExternalAuditorApproveOpen(false)


            })
    }

    const handleDeclineByProcurementManager = (data) => {
        console.log(data)
        taskContract.methods.budgetAndProcurementManagerDeclineTaskApproval(task.id, data.remark, getUserName(), task.projectId).send({ from: address }).then(res => {
            toast('Declined task successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            setProjectManagerDeclineOpen(false)
        })
            .catch(err => {
                toast('Some error encountered!', { type: 'warning', position: toast.POSITION.BOTTOM_RIGHT, })
                setProjectManagerDeclineOpen(false)


            })
    }

    const handleDeclineByExternalAuditor = (data) => {
        console.log(data)
        taskContract.methods.externalAuditorDeclinedTaskAllocation(task.id, data.remark, getUserName(), task.projectId).send({ from: address }).then(res => {
            toast('Declined task successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            setExternalAuditorDeclineOpen(false)
        })
            .catch(err => {
                toast('Some error encountered!', { type: 'warning', position: toast.POSITION.BOTTOM_RIGHT, })
                setExternalAuditorDeclineOpen(false)


            })
    }

    const handleDeclineByProjectManager = (data) => {
        console.log(data)
        taskContract.methods.projectManagerDeclineTaskApproval(task.id, data.remark, getUserName(), task.projectId).send({ from: address }).then(res => {
            toast('Declined task successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            setProjectManagerDeclineOpen(false)
        })
            .catch(err => {
                toast('Some error encountered!', { type: 'warning', position: toast.POSITION.BOTTOM_RIGHT, })
                setProjectManagerDeclineOpen(false)


            })

    }

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    // const history = 
    // console.log(mappingContract)

    return (
        <Box sx={{ p: 2, width: '100%', backgroundColor: 'white', minHeight: 220, my: 1, borderRadius: 3, boxShadow: `1px 1px 3px 5px  ${grey[100]}` }}>

            <Dialog
                onClose={() => {
                    setExternalAuditorDeclineOpen(false)
                }}
                aria-labelledby="customized-dialog-title"
                open={externalAuditorDeclineOpen}
                sx={{ zIndex: 999999 }}
            >
                <DialogTitle id="customized-dialog-title" onClose={() => {
                    setExternalAuditorDeclineOpen(false)
                }}>
                    <Typography>Decline Task Completion?</Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleSubmitForDeclineByExternalAuditor(handleDeclineByExternalAuditor)} style={{ maxWidth: 400 }}>

                        <textarea placeholder='Remark...' {...registerForDeclineByExternalAuditor('remark', { required: true })} type="text" style={{ width: '100%', marginBottom: 5, outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                        {declineByExternalAuditorErrors.remark && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter valid remark.</Typography>}

                        <DialogActions>

                            <Button sx={{
                                width: 150,
                                color: grey[600]
                            }} autoFocus onClick={() => {
                                setExternalAuditorDeclineOpen(false)
                            }}>
                                Cancel
                            </Button>

                            <Button type='submit' sx={{
                                width: 150, backgroundColor: mainColor, color: 'white', '&:hover': {
                                    backgroundColor: mainColor
                                }
                            }} autoFocus onClick={() => {
                                // e.stopPropagation()
                                // mutate({ id })
                                // console.log('Clicked')

                            }}>
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>

            <Dialog
                onClose={() => {
                    setProjectManagerDeclineOpen(false)
                }}
                aria-labelledby="customized-dialog-title"
                open={projectManagerDeclineOpen}
                sx={{ zIndex: 999999 }}
            >
                <DialogTitle id="customized-dialog-title" onClose={() => {
                    setProjectManagerDeclineOpen(false)
                }}>
                    <Typography>Decline Task Completion?</Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleSubmitForDeclineByPrjectManager(handleDeclineByProjectManager)} style={{ maxWidth: 400 }}>

                        <textarea placeholder='Remark...' {...registerForDeclineByProjectManager('remark', { required: true })} type="text" style={{ width: '100%', marginBottom: 5, outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                        {declineByProjectManagerErrors.remark && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter valid remark.</Typography>}

                        <DialogActions>

                            <Button sx={{
                                width: 150,
                                color: grey[600]
                            }} autoFocus onClick={() => {
                                setProjectManagerDeclineOpen(false)
                            }}>
                                Cancel
                            </Button>

                            <Button type='submit' sx={{
                                width: 150, backgroundColor: mainColor, color: 'white', '&:hover': {
                                    backgroundColor: mainColor
                                }
                            }} autoFocus onClick={() => {
                                // e.stopPropagation()
                                // mutate({ id })
                                // console.log('Clicked')

                            }}>
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>


            <Dialog
                onClose={() => {
                    setProcurementManagerDeclineOpen(false)
                }}
                aria-labelledby="customized-dialog-title"
                open={procurementManagerDeclineOpen}
                sx={{ zIndex: 999999 }}
            >
                <DialogTitle id="customized-dialog-title" onClose={() => {
                    setProcurementManagerDeclineOpen(false)
                }}>
                    <Typography>Decline Task Completion?</Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleSubmitForDeclineByProcurementManager(handleDeclineByProcurementManager)} style={{ maxWidth: 400 }}>

                        <textarea placeholder='Remark...' {...registerForDeclineByProcurementManager('remark', { required: true })} type="text" style={{ width: '100%', marginBottom: 5, outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                        {declineByProcurementManagerErrors.remark && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter valid remark.</Typography>}

                        <DialogActions>

                            <Button sx={{
                                width: 150,
                                color: grey[600]
                            }} autoFocus onClick={() => {
                                setProcurementManagerDeclineOpen(false)
                            }}>
                                Cancel
                            </Button>

                            <Button type='submit' sx={{
                                width: 150, backgroundColor: mainColor, color: 'white', '&:hover': {
                                    backgroundColor: mainColor
                                }
                            }} autoFocus onClick={() => {
                                // e.stopPropagation()
                                // mutate({ id })
                                // console.log('Clicked')

                            }}>
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>

            <Popover
                id='pop-over-id'
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{
                    px: 2, borderRadius: 4, maxWidth: 200, backgroundColor: 'transparent', py: 2, position: 'relative'
                }}>
                    <Grid container alignItems='center' justifyContent='space-between' direction='row'>
                        <Grid item>
                            <Typography sx={{ fontSize: 12, color: '#444' }}>Comment</Typography>

                        </Grid>
                        <Grid item>
                            <IconButton onClick={handleClose}>
                                <CloseOutlined sx={{ color: 'red', fontSize: 14 }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Divider sx={{ mb: 3 }} />
                    {
                        task && task.remark && <Typography sx={{ fontSize: 13 }}>
                            {
                                task.remark
                            }
                        </Typography>
                    }

                    {
                        task && !task.remark && <Typography sx={{ fontSize: 13 }}>
                            No Remark Was Added!
                        </Typography>
                    }

                </Box>
            </Popover>

            <Dialog
                onClose={() => {
                    setExternalAuditorApproveOpen(false)
                }}
                aria-labelledby="customized-dialog-title"
                open={externalAuditorApproveOpen}
                sx={{ zIndex: 999999 }}
            >
                <DialogTitle id="customized-dialog-title" onClose={() => {
                    setExternalAuditorApproveOpen(false)
                }}>
                    <Typography>Approve Task Completion?</Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleSubmitForExternalAuditor(handleExternalAuditorApproveTaskCompletion)} style={{ maxWidth: 400 }}>

                        <textarea placeholder='Remark...' {...registerForExternalAuditor('remark', { maxLength: 200 })} type="text" style={{ width: '100%', marginBottom: 5, outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                        {eaErrors.remark && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Remark must be less then 200 charsacers.</Typography>}

                        <DialogActions>

                            <Button sx={{
                                width: 150,
                                color: grey[600]
                            }} autoFocus onClick={() => {
                                setExternalAuditorApproveOpen(false)
                            }}>
                                Cancel
                            </Button>

                            <Button type='submit' sx={{
                                width: 150, backgroundColor: mainColor, color: 'white', '&:hover': {
                                    backgroundColor: mainColor
                                }
                            }} autoFocus onClick={() => {
                                // e.stopPropagation()
                                // mutate({ id })
                                // console.log('Clicked')

                            }}>
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>

            <Dialog
                onClose={() => {
                    setFinancialManagerApproveOpen(false)
                }}
                aria-labelledby="customized-dialog-title"
                open={financialManagerApproveOpen}
                sx={{ zIndex: 999999 }}
            >
                <DialogTitle id="customized-dialog-title" onClose={() => {
                    setFinancialManagerApproveOpen(false)
                }}>
                    <Typography>Submit task completion?</Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleSubmitForFinancialManager(handleAFinancialManagerSubmitBudgetAllocation)} style={{ maxWidth: 400 }}>

                        <input placeholder='Amount Spended...' {...registerForFinancialManager('amount', { required: true })} min={1} type="number" style={{ width: '100%', marginBottom: 15, outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                        {fmErrors.amount && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please check amount</Typography>}


                        <textarea placeholder='Remark...' {...registerForFinancialManager('remark', { maxLength: 200 })} type="text" style={{ width: '100%', marginBottom: 5, outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                        {fmErrors.remark && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Remark must be less then 200 charsacers.</Typography>}

                        <DialogActions>

                            <Button sx={{
                                width: 150,
                                color: grey[600]
                            }} autoFocus onClick={() => {
                                setFinancialManagerApproveOpen(false)
                            }}>
                                Cancel
                            </Button>

                            <Button type='submit' sx={{
                                width: 150, backgroundColor: mainColor, color: 'white', '&:hover': {
                                    backgroundColor: mainColor
                                }
                            }} autoFocus onClick={() => {
                                // e.stopPropagation()
                                // mutate({ id })

                            }}>
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>


            <Dialog
                onClose={() => {
                    setProjectManagerApproveOpen(false)
                }}
                aria-labelledby="customized-dialog-title"
                open={projectManagerApproveOpen}
                sx={{ zIndex: 999999 }}
            >
                <DialogTitle id="customized-dialog-title" onClose={() => {
                    setProjectManagerApproveOpen(false)
                }}>
                    <Typography>Approve Task Completion?</Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleSubmitForProjectManager(handleProjectManagerApproveTaskCompletion)} style={{ maxWidth: 400 }}>

                        <textarea placeholder='Remark...' {...registerForProjectManager('remark', { maxLength: 200 })} type="text" style={{ width: '100%', marginBottom: 5, outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                        {pmErrors.remark && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Remark must be less then 200 charsacers.</Typography>}

                        <DialogActions>

                            <Button sx={{
                                width: 150,
                                color: grey[600]
                            }} autoFocus onClick={() => {
                                setProjectManagerApproveOpen(false)
                            }}>
                                Cancel
                            </Button>

                            <Button type='submit' sx={{
                                width: 150, backgroundColor: mainColor, color: 'white', '&:hover': {
                                    backgroundColor: mainColor
                                }
                            }} autoFocus onClick={() => {
                                // e.stopPropagation()
                                // mutate({ id })

                            }}>
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>


            <Dialog
                onClose={() => {
                    setProcurementManagerApproveOpen(false)
                }}
                aria-labelledby="customized-dialog-title"
                open={procurementManagerApproveOpen}
                sx={{ zIndex: 999999 }}
            >
                <DialogTitle id="customized-dialog-title" onClose={() => {
                    setProcurementManagerApproveOpen(false)
                }}>
                    <Typography>Approve Task Completion?</Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleSubmitForProcurementManager(handleProcurementManagerApproveTaskCompletion)} style={{ maxWidth: 400 }}>

                        <textarea placeholder='Remark...' {...registerForProcurementManager('remark', { maxLength: 200 })} type="text" style={{ width: '100%', marginBottom: 5, outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                        {pmmErrors.remark && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Remark must be less then 200 charsacers.</Typography>}

                        <DialogActions>

                            <Button sx={{
                                width: 150,
                                color: grey[600]
                            }} autoFocus onClick={() => {
                                setProcurementManagerApproveOpen(false)
                            }}>
                                Cancel
                            </Button>

                            <Button type='submit' sx={{
                                width: 150, backgroundColor: mainColor, color: 'white', '&:hover': {
                                    backgroundColor: mainColor
                                }
                            }} autoFocus onClick={() => {
                                // e.stopPropagation()
                                // mutate({ id })

                            }}>
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>

            </Dialog>





            <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: grey[700], my: 3 }}>
                {task.name}
            </Typography>

            <Typography sx={{ fontSize: 13, color: grey[600] }}>
                {task.description}            </Typography>

            {/* <Typography sx={{ fontSize: 11, color: mainColor, py: 1, borderRadius: 2, }}>
                {new Date(task.estimatedDuration).toLocaleDateString()}
            </Typography> */}

            <Divider sx={{ my: 1 }} />

            <Grid container justifyContent='flex-end'>

                <Grid item sx={{ ml: 0.5 }}>
                    <IconButton onClick={handleClick}>
                        <InfoOutlined sx={{ color: mainColor, fontSize: 17 }} />
                    </IconButton>
                </Grid>

                <Grid item>
                    <Button onClick={() => {
                        let type = getUserType()
                        switch (type) {
                            case ROLES.FINANCIAL_OFFICER:
                                setFinancialManagerApproveOpen(true)
                                break;
                            case ROLES.BUDGET_AND_PROCUREMENT_MANAGER:
                                setProcurementManagerApproveOpen(true)
                                break;
                            case ROLES.PROJECT_MANAGER:
                                setProjectManagerApproveOpen(true)
                                break;
                            case ROLES.EXTERNAL_AUDITOR:
                                setExternalAuditorApproveOpen(true)
                                break
                            default:
                                break;
                        }
                    }} sx={{ fontSize: 13, color: green[700] }}>Approve</Button>
                </Grid>
                <Grid item>
                    {
                        getUserType() !== ROLES.FINANCIAL_OFFICER ? <Button onClick={() => {
                            let type = getUserType()
                            switch (type) {

                                case ROLES.BUDGET_AND_PROCUREMENT_MANAGER:
                                    setProjectManagerDeclineOpen(true)
                                    break;
                                case ROLES.PROJECT_MANAGER:
                                    setProjectManagerDeclineOpen(true)
                                    break;
                                case ROLES.EXTERNAL_AUDITOR:
                                    console.log('Decline')
                                    setExternalAuditorDeclineOpen(true)
                                    break
                                default:
                                    break;
                            }
                        }} sx={{ fontSize: 13, color: red[700] }}>Decline</Button> : <></>
                    }
                </Grid>
            </Grid>
        </Box>
    )
}
