import { Close } from "@mui/icons-material"
import { Box, Grid, IconButton, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { queryClient } from "../.."
import { deleteCompany } from "../../controller/company"

const CompanyListItem = ({ name, location, id }) => {

    const navigate = useNavigate()

    const { mutate } = useMutation(deleteCompany, {
        onError: (error, variables, context) => {
            console.log(error)
            console.log(variables)
            console.log(context)
        },
        onSuccess: (data, variables, context) => {
            toast('Deleted company successfully!', { type: 'success' })
            navigate('/technical-admin')
            queryClient.invalidateQueries(['company'])


        },
    })

    return (
        <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: 3, m: 2 }} className='project-list-item' >

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
                        mutate({ id })
                    }}>
                        <Close fontSize='small' sx={{ color: 'red' }} />
                    </IconButton>
                </Grid>
            </Grid>


        </Box>
    )
}

export default CompanyListItem