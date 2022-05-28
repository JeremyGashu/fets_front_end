import { Typography, Box, Grid, Button, useAutocomplete } from "@mui/material"

import { backgroundColor, dashboardColor1, mainColor } from "../../themes/color";
import { useForm } from "react-hook-form";
import { grey } from "@mui/material/colors";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { getAllCompanies } from "../../controller/company";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateProjectsPage = () => {

    const navigate = useNavigate()

    const { register, handleSubmit } = useForm()
    const { data: companies } = useQuery('company', getAllCompanies)
    const { projectContract } = useSelector(state => state.contracts)
    const { address } = useSelector(state => state.contracts)



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

    const handleCreateProject = async (data) => {
        // console.log(value.id)
        projectContract.methods.addProject(data.name, data.description, data.location, data.estimatedBudget, (new Date(data.estimatedDuration)).getTime(), value.id, data.accountNumber).send({ from: address }).then(res => {
            toast('Added Project Successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            navigate('/technical-admin')
        })
            .catch(err => {
                console.log(err)
            })
    }

    const FontWeight = 600
    return (
        <>


            <Box sx={{ backgroundColor: backgroundColor, p: 4, borderRadius: 1 }}>
                <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 1 }}>

                    <Typography variant="h6" component='h2' fontWeight={FontWeight}>
                        Add Project
                    </Typography>
                    <Box marginY={2}>
                        <Box padding={2} marginX={2}>
                            <form autoComplete='false' onSubmit={handleSubmit(handleCreateProject)}>

                                <Box padding={2}>
                                    <Grid container justifyContent='space-between' alignItems='center'>
                                        <Grid item sm={12} lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Name</Typography>
                                            <input {...register('name')} type="text" placeholder='Name' required={true}
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        </Grid>

                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Location</Typography>
                                            <input {...register('location')} type="text" placeholder='Location' required={true}
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        </Grid>

                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Estimated Budget</Typography>
                                            <input min={1} {...register('estimatedBudget')} type="number" placeholder='Estimated Budget...' required={true}
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        </Grid>

                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Estimated Completion Date</Typography>
                                            <input {...register('estimatedDuration')} type="date" placeholder='Estimated Completion Date...' required={true}
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        </Grid>

                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Account Number</Typography>
                                            <input {...register('accountNumber')} type="text" placeholder='Account Number...' required={true}
                                                style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        </Grid>

                                        <Grid item lg={5} xs={12} sx={{ mx: 2 }}>

                                            {
                                                companies ? <div>
                                                    <div {...getRootProps()}>
                                                        <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Company</Typography>
                                                        <input style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} {...getInputProps()} />
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
                                            <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Description</Typography>
                                            <textarea {...register('description')} placeholder='Description about the company...' style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} />
                                        </Grid>

                                        <Grid item lg={12} xs={12} sx={{ mx: 2, my: 2 }} >
                                            <label style={{ fontSize: 12, color: 'black' }} for='active'>Add Mapping Now ? </label>

                                            <input id='active' type="checkbox" placeholder='Active'
                                                style={{ outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, color: '#444' }} />
                                        </Grid>

                                    </Grid>

                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                                    <Button type='submit' variant="contained" size="large" sx={{ backgroundColor: dashboardColor1, marginLeft: 2 }}>
                                        Create
                                    </Button>
                                </Box>

                            </form>

                        </Box>
                    </Box>
                </Box>
            </Box>

        </>)
}
export default CreateProjectsPage