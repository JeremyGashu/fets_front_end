import { Typography, Box, Paper, Grid, Button } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { queryClient } from "../.."
import { validatePhoneNumber } from "../../configs/phone_validator"
import { getCompanyById, updateCompany } from "../../controller/company"
import { dashboardColor1, mainColor } from "../../themes/color"
const UpdateCompany = () => {
    const FontWeight = 600
    const { register, setValue, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const { id } = useParams()

    const { data: company, isSuccess } = useQuery(['company', id], () => getCompanyById(id))
    if (isSuccess) {
        setValue('name', company && company.company && company.company.name)
        setValue('email', company && company.company && company.company.email)
        setValue('address', company && company.company && company.company.address)
        setValue('phone', company && company.company && company.company.phone)
        setValue('description', company && company.company && company.company.description)
    }
    // console.log(company)

    const { mutate, isLoading } = useMutation(updateCompany, {
        onError: (error, variables, context) => {
            console.log(error)
            console.log(variables)
            console.log(context)
        },
        onSuccess: (data, variables, context) => {
            toast('Edited company successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            navigate('/technical-admin')
            queryClient.invalidateQueries(['company'])
        },
    })

    const handleAddCompany = async (data) => {
        mutate({ ...data, id })
    }
    return <>
        <Box>
            <Typography sx={{ textAlign: 'center', mb: 2 }} variant="h6" component='h2' fontWeight={FontWeight}>
                Edit Company
            </Typography>

            <Box marginRight={2}>
                <Paper>
                    <Box paddingBottom={2}>

                        {/* <Box padding={2}>
                            <Stack sx={{ flexDirection: "row" }}>
                                <Box marginX={2} sx={{ backgroundColor: "#BBBBBB", width: 80, height: 80, borderRadius: 2 }}>

                                </Box>
                                <Box sx={{}}>
                                    <Box paddingY={1}>
                                        <Typography variant="body1" component='h2' fontWeight={FontWeight}>
                                            Select Your Company Logo
                                        </Typography>
                                    </Box>
                                    <Box paddingY={1}>
                                        <Button variant="contained" size="small" sx={{ backgroundColor: dashboardColor1 }}>
                                            Upload
                                        </Button>
                                    </Box>
                                </Box>

                            </Stack>
                        </Box> */}

                        <form onSubmit={handleSubmit(handleAddCompany)}>

                            <Box padding={2}>
                                <Grid container justifyContent='space-between' alignItems='center'>
                                    <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                        <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Name</Typography>
                                        <input defaultValue={company && company.company && company.company.name} {...register('name', { required: true })} type="text" placeholder='Name'
                                            style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        {errors.name && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter company name.</Typography>}

                                    </Grid>
                                    <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                        <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Email</Typography>
                                        <input defaultValue={company && company.company && company.company.email}  {...register('email', { required: true })} type="email" placeholder='Email'
                                            style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        {errors.email && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter E-mail.</Typography>}

                                    </Grid>
                                    <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                        <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Phone</Typography>
                                        <input defaultValue={company && company.company && company.company.address} {...register('address', { required: true })} type="text" placeholder='Address'
                                            style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        {errors.address && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter address.</Typography>}

                                    </Grid>


                                    <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                        <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Address</Typography>
                                        <input defaultValue={company && company.company && company.company.phone}  {...register('phone', {
                                            required: true, validate: {
                                                validatePhoneNumber: (phone) => {
                                                    return validatePhoneNumber(phone)
                                                }
                                            }
                                        })} type="tel" placeholder='Phone'
                                            style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        {errors.phone && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter phone.</Typography>}

                                    </Grid>
                                    <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                        <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Description</Typography>
                                        <textarea defaultValue={company && company.company && company.company.description}  {...register('description', { required: true })} placeholder='Description about the company...' style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        {errors.description && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter description.</Typography>}

                                    </Grid>

                                </Grid>
                            </Box>
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                                <Button disabled={isLoading} type='submit' variant="contained" size="large" sx={{ backgroundColor: dashboardColor1, marginLeft: 2 }}>
                                    Save Changes
                                </Button>
                            </Box>

                        </form>
                    </Box>
                </Paper>
            </Box>
        </Box>
    </>
}

export default UpdateCompany