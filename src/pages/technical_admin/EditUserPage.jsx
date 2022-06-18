import { Typography, Box, Grid, Button } from "@mui/material"

import { backgroundColor, dashboardColor1, mainColor } from "../../themes/color";
import { useForm } from "react-hook-form";
import { grey } from "@mui/material/colors";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { queryClient } from "../..";
import { useNavigate, useParams } from "react-router-dom";
// import { getAllCompanies } from "../../controller/company";
import { getUserByUsername, updateUser } from "../../controller/user";
import { ROLES } from "../../configs/roles";
import FullPageLoading from "../../components/FullPageLoadingPage";
import { PersonOutline } from "@mui/icons-material";
import { validatePhoneNumber } from "../../configs/phone_validator";

const EditUserPage = () => {
    const { username } = useParams()

    const { register, handleSubmit, formState: { errors } } = useForm()
    // const { data: companies } = useQuery('company', getAllCompanies)
    const { data: user, isLoading: loadingUser } = useQuery(['users', username], () => getUserByUsername(username))




    const navigate = useNavigate()

    const { mutate, isLoading } = useMutation(updateUser, {
        onError: (error, variables, context) => {
            error.response.data && error.response.data.errors && error.response.data.errors.forEach(error => {
                toast(error, { type: 'error', position: toast.POSITION.BOTTOM_RIGHT, })
            })
        },
        onSuccess: (data, variables, context) => {
            toast('Edited user successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            navigate('/technical-admin')
            queryClient.invalidateQueries(['users'])
        },
    })


    const handleEditCompany = async (data) => {
        mutate({ ...data, id: user && user.user && user.user.id })
        // console.log()
        // if (data.password !== data.confirmPassword) {
        //     toast('Password did not match', { type: 'warning', position: toast.POSITION.BOTTOM_RIGHT, })
        //     return
        // }
        // mutate({ ...data, company_id: value.id })

    }

    // const {
    //     getRootProps,
    //     getInputProps,
    //     getListboxProps,
    //     getOptionProps,
    //     groupedOptions,
    //     value
    // } = useAutocomplete({
    //     id: 'companies',
    //     options: companies,
    //     getOptionLabel: (option) => option.name,
    // });



    const FontWeight = 600
    if (loadingUser) {
        return <FullPageLoading />
    }
    return (
        <>


            <Box sx={{ backgroundColor: backgroundColor, p: 4, borderRadius: 1 }}>
                <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 1 }}>

                    <Typography sx={{ textAlign: 'center' }} variant="h6" component='h2' fontWeight={FontWeight}>
                        Edit User
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <PersonOutline sx={{ border: `1px solid ${mainColor}`, color: mainColor, fontSize: 60, p: 1, borderRadius: '50%', mt: 2 }} />
                    </Box>
                    <Box>
                        <Box padding={2} marginX={2}>
                            <form autoComplete='false' onSubmit={handleSubmit(handleEditCompany)}>

                                <Box padding={2}>
                                    <Grid container justifyContent='space-between' alignItems='center'>
                                        <Grid item sm={12} lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Name</Typography>
                                            <input defaultValue={user && user.user && user.user.name} {...register('name', { required: true })} type="text" placeholder='Name'
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                            {errors.name && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter name.</Typography>}

                                        </Grid>
                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Email</Typography>
                                            <input defaultValue={user && user.user && user.user.email}  {...register('email', { required: true })} type="email" placeholder='Email'
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                            {errors.email && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter E-mail.</Typography>}

                                        </Grid>
                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Address</Typography>
                                            <input defaultValue={user && user.user && user.user.address}  {...register('address', { required: true })} type="text" placeholder='Address'
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                            {errors.address && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter addres.</Typography>}

                                        </Grid>
                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Phone</Typography>
                                            <input defaultValue={user && user.user && user.user.phone}  {...register('phone', {
                                                required: true, validate: {
                                                    validatePhoneNumber: (phone) => {
                                                        return validatePhoneNumber(phone)
                                                    }
                                                }
                                            })} type="tel" placeholder='Phone'
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                            {errors.phone && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter phone number.</Typography>}

                                        </Grid>

                                        {/* <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Username</Typography>
                                            <input {...register('username', { required: true })} type="text" placeholder='Username'
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                            {errors.username && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter username.</Typography>}

                                        </Grid> */}

                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Role</Typography>
                                            {/* <input {...register('role')} type="text" placeholder='Role' required={true}
                                        style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} /> */}
                                            <select defaultValue={user && user.user && user.user.role} {...register('role', { required: true })} style={{ backgroundColor: 'white', width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }}>
                                                <option value={ROLES.PROJECT_MANAGER}>Project Manager</option>
                                                <option value={ROLES.BUDGET_AND_PROCUREMENT_MANAGER}>Budget &amp; Procurement Manager</option>
                                                <option value={ROLES.FINANCIAL_OFFICER}>Financial Officer</option>
                                                <option value={ROLES.EXTERNAL_AUDITOR}>External Auditor</option>
                                                {/* <option value='PROJECT_MANAGER'>Project Manager</option> */}

                                            </select>

                                            {errors.role && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please select role for the user.</Typography>}

                                        </Grid>

                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>

                                        </Grid>

                                        {/* <Grid item lg={5} xs={12} sx={{ mx: 2 }}>

                                            {
                                                companies ? <div>
                                                    <div {...getRootProps()}>
                                                        <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Company</Typography>

                                                        <input {...register('cid')} placeholder='Company Manager' style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} {...getInputProps()} />
                                                        {errors.cid && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please select company.</Typography>}

                                                    </div>
                                                    {groupedOptions.length > 0 ? (
                                                        <ul style={{ margin: 0, padding: 0 }} {...getListboxProps()}>
                                                            {groupedOptions.map((option, index) => (
                                                                <Box sx={{ p: 0.5, px: 3, backgroundColor: grey[100], width: '100%', my: 0.5, borderRadius: 1, cursor: 'pointer' }}>
                                                                    <Typography sx={{ fontSize: 14 }} {...getOptionProps({ option, index })}>{option.name}</Typography>
                                                                </Box>
                                                            ))}
                                                        </ul>
                                                    ) : null}
                                                </div> : <></>
                                            }

                                        </Grid> */}
                                        {/* 
                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Password</Typography>
                                            <input {...register('password', { required: true })} type="password" placeholder='Password'
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                            {errors.password && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter password.</Typography>}

                                        </Grid>

                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Confirm Password</Typography>
                                            <input {...register('confirmPassword', { required: true })} type="password" placeholder='Confirm Password'
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                            {errors.confirmPassword && <Typography sx={{ fontSize: 11.5, color: 'red', mb: 1, mt: 1, ml: 1 }}>Please enter password.</Typography>}
                                        </Grid> */}

                                        {/* <Grid item lg={12} xs={12} sx={{ mx: 2, my: 2 }} >
                                            <label style={{ fontSize: 12, color: 'black' }} for='active'>Active? </label>

                                            <input id='active' {...register('active')} type="checkbox" placeholder='Active'
                                                style={{ outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, color: '#444' }} />
                                        </Grid> */}

                                    </Grid>


                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                                    <Button disabled={isLoading} type='submit' variant="contained" size="large" sx={{ backgroundColor: dashboardColor1, marginLeft: 2 }}>
                                        Edit
                                    </Button>
                                </Box>

                            </form>

                        </Box>
                    </Box>
                </Box>
            </Box>

        </>)
}
export default EditUserPage