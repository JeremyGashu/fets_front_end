import { Close, Delete } from "@mui/icons-material"
import { Box, Grid, IconButton, Typography, Dialog, Button } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { queryClient } from "../.."
import { deleteCompany } from "../../controller/company"
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useState } from "react"

const CompanyListItem = ({ name, location, id }) => {

    const navigate = useNavigate()

    const { mutate } = useMutation(deleteCompany, {
        onError: (error, variables, context) => {
            console.log(error)
            console.log(variables)
            console.log(context)
        },
        onSuccess: (data, variables, context) => {
            toast('Deleted company successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            navigate('/technical-admin')
            queryClient.invalidateQueries(['company'])


        },
    })

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);

    };

    return (
        <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: 3, m: 2 }} className='project-list-item' >

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
                            <Typography sx={{}}>Delete Company</Typography>
                        </Grid>

                    </Grid>
                </DialogTitle>
                <DialogContent dividers>

                    <Typography gutterBottom>
                        Are you sure you want to Delete Company?
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
                        // e.stopPropagation()
                        mutate({ id })

                    }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Grid container direction='row' justifyContent='space-between' alignItems='center' >
                <Grid item lg={2} sm={2} md={2}>
                    <Box sx={{ width: 40, height: 40, backgroundColor: grey[300], borderRadius: 2, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ fontSize: 23, color: grey[700] }}>{name[0]}</Typography>
                    </Box>
                </Grid>

                <Grid item lg={7} sm={7} md={7}>
                    <Typography sx={{ color: 'black', fontSize: 13 }}>{name}</Typography>
                    <Typography sx={{ color: '#444', fontSize: 11 }}>{location}</Typography>
                </Grid>

                <Grid lg={1} item sx={{ mr: 3 }}>
                    <IconButton onClick={(e) => {
                        e.stopPropagation()
                        handleClickOpen()

                    }}>
                        <Close fontSize='small' sx={{ color: 'red' }} />
                    </IconButton>
                </Grid>
            </Grid>


        </Box>
    )
}

export default CompanyListItem