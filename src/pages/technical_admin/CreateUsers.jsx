import { Typography, Box, Grid, Button, useAutocomplete } from "@mui/material"

import { backgroundColor, dashboardColor1, mainColor } from "../../themes/color";
import { useForm } from "react-hook-form";
import { grey } from "@mui/material/colors";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { queryClient } from "../..";
import { useNavigate } from "react-router-dom";
import { getAllCompanies } from "../../controller/company";
import { createUser } from "../../controller/user";
import { ROLES } from "../../configs/roles";

const CreateUser = () => {

    const { register, handleSubmit } = useForm()
    const { data: companies } = useQuery('company', getAllCompanies)


    const navigate = useNavigate()

    const { mutate } = useMutation(createUser, {
        onError: (error, variables, context) => {
            error.response.data && error.response.data.errors && error.response.data.errors.forEach(error => {
                toast(error, { type: 'error', position: toast.POSITION.BOTTOM_RIGHT, })
            })
        },
        onSuccess: (data, variables, context) => {
            toast('Added user successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            navigate('/technical-admin')
            queryClient.invalidateQueries(['users'])
        },
    })

    const handleAddCompany = async (data) => {
        mutate({ ...data, company_id: value.id })

    }

    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value
    } = useAutocomplete({
        id: 'companies',
        options: companies,
        getOptionLabel: (option) => option.name,
    });



    const FontWeight = 600
    return (
        <>


            <Box sx={{ backgroundColor: backgroundColor, p: 4, borderRadius: 1 }}>
                <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 1 }}>

                    <Typography variant="h6" component='h2' fontWeight={FontWeight}>
                        Add User
                    </Typography>
                    <Box marginY={2}>
                        <Box padding={2} marginX={2}>
                            <form autoComplete='false' onSubmit={handleSubmit(handleAddCompany)}>

                                <Box padding={2}>
                                    <Grid container justifyContent='space-between' alignItems='center'>
                                        <Grid item sm={12} lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Name</Typography>
                                            <input {...register('name')} type="text" placeholder='Name' required={true}
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        </Grid>
                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Email</Typography>
                                            <input {...register('email')} type="email" placeholder='Email' required={true}
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        </Grid>
                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Phone</Typography>
                                            <input {...register('address')} type="text" placeholder='Address' required={true}
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        </Grid>
                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Address</Typography>
                                            <input {...register('phone')} type="text" placeholder='Phone' required={true}
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        </Grid>

                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Username</Typography>
                                            <input {...register('username')} type="text" placeholder='Username' required={true}
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        </Grid>

                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Role</Typography>
                                            {/* <input {...register('role')} type="text" placeholder='Role' required={true}
                                        style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} /> */}
                                            <select {...register('role')} style={{ backgroundColor: 'white', width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }}>
                                                <option value={ROLES.PROJECT_MANAGER}>Project Manager</option>
                                                <option value={ROLES.BUDGET_AND_PROCUREMENT_MANAGER}>Budget &amp; Procurement Manager</option>
                                                <option value={ROLES.FINANCIAL_OFFICER}>Financial Officer</option>
                                                <option value={ROLES.EXTERNAL_AUDITOR}>External Auditor</option>
                                                {/* <option value='PROJECT_MANAGER'>Project Manager</option> */}

                                            </select>
                                        </Grid>

                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>

                                            {
                                                companies ? <div>
                                                    <div {...getRootProps()}>
                                                        <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Company</Typography>

                                                        <input placeholder='Company Manager' style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} {...getInputProps()} />
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

                                        </Grid>

                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Password</Typography>
                                            <input {...register('password')} type="password" placeholder='Password' required={true}
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        </Grid>

                                        <Grid item lg={5} xs={12} sx={{ mx: 2, my: 2 }} >
                                            <label style={{ fontSize: 12, color: 'black' }} for='active'>Active? </label>

                                            <input id='active' {...register('active')} type="checkbox" placeholder='Active'
                                                style={{ outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, color: '#444' }} />
                                        </Grid>

                                    </Grid>


                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                                    <Button type='submit' variant="contained" size="large" sx={{ backgroundColor: dashboardColor1, marginLeft: 2 }}>
                                        Save
                                    </Button>
                                </Box>

                            </form>

                        </Box>
                    </Box>
                </Box>
            </Box>

        </>)
}
export default CreateUser