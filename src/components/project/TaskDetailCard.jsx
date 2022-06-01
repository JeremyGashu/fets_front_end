import { CalendarMonthOutlined, Check } from "@mui/icons-material"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Typography } from "@mui/material"
import { green, grey, red } from "@mui/material/colors"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { getUserType } from "../../configs/localstorage_handler"
import { ROLES } from "../../configs/roles"
import { mainColor } from "../../themes/color"
export const TaskDetailCardCompleted = ({ task = {} }) => {

    return (
        <Box sx={{ p: 2, width: '100%', backgroundColor: 'white', minHeight: 220, my: 1, borderRadius: 3, boxShadow: `1px 1px 3px 5px  ${grey[100]}` }}>
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
            </Grid>

        </Box>
    )
}


export const TaskDetailCardOngoing = ({ task = {} }) => {
    return (
        <Box sx={{ p: 2, width: '100%', backgroundColor: 'white', minHeight: 220, my: 1, borderRadius: 3, boxShadow: `1px 1px 3px 5px  ${grey[100]}` }}>
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
            </Grid>
        </Box>
    )
}

export const TaskDetailCardNeedApproval = ({ task = {} }) => {

    const { taskContract, address } = useSelector(state => state.contracts)
    const [approveModalOpen, setApproveModalOpen] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const handleAddCompletion = (data) => {
        taskContract.methods.financialManagerSubmitBudgetAllocation(task.id, +data.amount).send({ from: address }).then(res => {
            toast('Approved task completion successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            setApproveModalOpen(false)
        })
            .catch(err => {

            })
    }

    // const history = 
    // console.log(mappingContract)

    return (
        <Box sx={{ p: 2, width: '100%', backgroundColor: 'white', minHeight: 220, my: 1, borderRadius: 3, boxShadow: `1px 1px 3px 5px  ${grey[100]}` }}>

            <Dialog
                onClose={() => {
                    setApproveModalOpen(false)
                }}
                aria-labelledby="customized-dialog-title"
                open={approveModalOpen}
                sx={{ zIndex: 999999 }}
            >
                <DialogTitle id="customized-dialog-title" onClose={() => {
                    setApproveModalOpen(false)
                }}>
                    <Typography>Submit task completion?</Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleSubmit(handleAddCompletion)}>

                        <input placeholder='Amount Spended...' {...register('amount', { required: true })} min={1} type="number" style={{ width: '100%', marginBottom: 5, outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                        {errors.amount && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter amount</Typography>}


                        <DialogActions>

                            <Button sx={{
                                width: 150,
                                color: grey[600]
                            }} autoFocus onClick={() => {
                                setApproveModalOpen(false)
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
                <Grid item>
                    <Button onClick={() => {
                        let type = getUserType()
                        switch (type) {
                            case ROLES.FINANCIAL_OFFICER:
                                setApproveModalOpen(true)
                                break;
                            case ROLES.BUDGET_AND_PROCUREMENT_MANAGER:
                                taskContract.methods.budgetAndProcurementManagerApproveTaskCompletion(task.id).send({ from: address }).then(res => {
                                    toast('Approved task completion successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
                                    //TODO - add money
                                    // window.location.r
                                })
                                    .catch(err => {

                                    })
                                break;
                            case ROLES.PROJECT_MANAGER:
                                taskContract.methods.projectManagerApproveTaskCompletion(task.id).send({ from: address }).then(res => {
                                    toast('Approved task completion successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
                                    //TODO - add money
                                    // window.location.r
                                })
                                    .catch(err => {

                                    })
                                break;
                            default:
                                break;
                        }
                    }} sx={{ fontSize: 13, color: green[700] }}>Approve</Button>
                </Grid>
                <Grid item>
                    <Button sx={{ fontSize: 13, color: red[700] }}>Decline</Button>
                </Grid>
            </Grid>
        </Box>
    )
}
