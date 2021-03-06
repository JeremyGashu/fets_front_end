import { Typography, Box, Grid, Button, useAutocomplete } from "@mui/material"

import { backgroundColor, dashboardColor1, mainColor } from "../../themes/color";
import { useForm } from "react-hook-form";
import { grey } from "@mui/material/colors";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllUsers } from "../../controller/user";
import { ROLES } from "../../configs/roles";
import { useEffect } from "react";
import { useState } from "react";

const CreateMappingPage = () => {
    const [mapping, setMapping] = useState({})

    const navigate = useNavigate()
    const { id } = useParams()

    const { handleSubmit } = useForm()

    const { data: users } = useQuery('users', getAllUsers)
    const { mappingContract } = useSelector(state => state.contracts)
    const { address } = useSelector(state => state.contracts)

    useEffect(() => {
        mappingContract && mappingContract.methods.getMappingById(id).call().then(res => {
            console.log(res)
            let tempMapping = {
                projectId: +res.projectId,
                externalAuditorUsername: res.externalAuditorUsername,
                projectManagerUsername: res.projectManagerUsernmae,
                financialOfficerUsername: res.financialOfficerUsername,
                budgetAndProcurementManagerUsername: res.budgetAndProcurementManagerUsername
            }
            console.log(tempMapping)
            setMapping(tempMapping)
        })
            .catch(err => {
                console.log(err)
            })

        // eslint-disable-next-line
    }, [id])



    const {
        getRootProps: getRootPropProjectManager,
        getInputProps: getInputPropsProjectManager,
        getListboxProps: getListboxPropsProjectManager,
        getOptionProps: getOptionPropsProjectManager,
        groupedOptions: groupedOptionsProjectManager,
        value: valueProjectManager
    } = useAutocomplete({
        id: 'users',
        options: (users && users.filter(user => user.role === ROLES.PROJECT_MANAGER)) || [],
        getOptionLabel: (option) => option.name,
        // value: mapping && users.find(user => user.username === mapping.projectManagerUsername)
    });


    const {
        getRootProps: getRootPropFinancial,
        getInputProps: getInputPropsFinancial,
        getListboxProps: getListboxPropsFinancial,
        getOptionProps: getOptionPropsFinancial,
        groupedOptions: groupedOptionsFinancial,
        value: valueFinancial
    } = useAutocomplete({
        id: 'users',
        options: (users && users.filter(user => user.role === ROLES.FINANCIAL_OFFICER)) || [],
        getOptionLabel: (option) => option.name,
        // value: mapping && users.find(user => user.username === mapping.financialOfficerUsername)


    });
    //TODO add the props to accept changes

    const {
        getRootProps: getRootPropProcurement,
        getInputProps: getInputPropsProcurement,
        getListboxProps: getListboxPropsProcurement,
        getOptionProps: getOptionPropsProcurement,
        groupedOptions: groupedOptionsProcurement,
        value: valueProcurement
    } = useAutocomplete({
        id: 'users',
        options: (users && users.filter(user => user.role === ROLES.BUDGET_AND_PROCUREMENT_MANAGER)) || [],
        getOptionLabel: (option) => option.name,
    });

    const {
        getRootProps: getRootPropExternal,
        getInputProps: getInputPropsExternal,
        getListboxProps: getListboxPropsExternal,
        getOptionProps: getOptionPropsExternal,
        groupedOptions: groupedOptionsExternal,
        value: valueExternal
    } = useAutocomplete({
        id: 'users',
        options: (users && users.filter(user => user.role === ROLES.EXTERNAL_AUDITOR)) || [],
        getOptionLabel: (option) => option.name,
        // value: mapping && users.find(user => user.username === mapping.externalAuditorUsername)

    });

    const handleAddMapping = async (data) => {

        mappingContract.methods.addMapping(id, valueFinancial.username, valueProjectManager.username, valueProcurement.username, valueExternal.username).send({ from: address }).then(res => {
            console.log(res)
            toast('Added User & Project Mapping Successfully!', { type: 'success', position: toast.POSITION.BOTTOM_RIGHT, })
            navigate('/technical-admin')
        })
            .catch(err => {
                toast('Some error Encountered!', { type: 'warning', position: toast.POSITION.BOTTOM_RIGHT, })
            })
    }

    const FontWeight = 600
    return (
        <>


            <Box sx={{ backgroundColor: backgroundColor, p: 4, borderRadius: 1 }}>
                <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 1 }}>

                    <Typography variant="h6" component='h2' fontWeight={FontWeight}>
                        Add Project &amp; User Mapping
                    </Typography>
                    <Box marginY={2}>
                        <Box padding={2} marginX={2}>
                            <form autoComplete='false' onSubmit={handleSubmit(handleAddMapping)}>

                                <Box padding={2}>
                                    <Grid container justifyContent='center' alignItems='center'>


                                        <Grid item lg={6} xs={12} sx={{ mx: 2 }}>

                                            {
                                                users ? <div>
                                                    <div {...getRootPropProjectManager()}>
                                                        <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Project Manager</Typography>
                                                        <input placeholder={mapping.projectManagerUsername !== null ? users.find(user => user.username === mapping.projectManagerUsername) && users.find(user => user.username === mapping.projectManagerUsername).name : 'Project Manager'} style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} {...getInputPropsProjectManager()} />
                                                    </div>
                                                    {groupedOptionsProjectManager.length > 0 ? (
                                                        <ul style={{ margin: 0, padding: 0 }} {...getListboxPropsProjectManager()}>
                                                            {groupedOptionsProjectManager.map((option, index) => (
                                                                <Box key={Math.random()} sx={{ p: 0.5, px: 3, backgroundColor: grey[100], width: '100%', my: 0.5, borderRadius: 1, cursor: 'pointer' }}>
                                                                    <Typography sx={{ fontSize: 14 }} {...getOptionPropsProjectManager({ option, index })}>{option.name}</Typography>
                                                                </Box>
                                                            ))}
                                                        </ul>
                                                    ) : null}
                                                </div> : <></>
                                            }

                                        </Grid>


                                        <Grid item lg={6} xs={12} sx={{ mx: 2 }}>

                                            {
                                                users ? <div>
                                                    <div {...getRootPropFinancial()}>
                                                        <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Financial Officer</Typography>
                                                        <input placeholder={mapping.financialOfficerUsername !== null ? users.find(user => user.username === mapping.financialOfficerUsername) && users.find(user => user.username === mapping.financialOfficerUsername).name : 'Financial Officer'} style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} {...getInputPropsFinancial()} />
                                                    </div>
                                                    {groupedOptionsFinancial.length > 0 ? (
                                                        <ul style={{ margin: 0, padding: 0 }} {...getListboxPropsFinancial()}>
                                                            {groupedOptionsFinancial.map((option, index) => (
                                                                <Box sx={{ p: 0.5, px: 3, backgroundColor: grey[100], width: '100%', my: 0.5, borderRadius: 1, cursor: 'pointer' }}>
                                                                    <Typography sx={{ fontSize: 14 }} {...getOptionPropsFinancial({ option, index })}>{option.name}</Typography>
                                                                </Box>
                                                            ))}
                                                        </ul>
                                                    ) : null}
                                                </div> : <></>
                                            }

                                        </Grid>

                                        <Grid item lg={6} xs={12} sx={{ mx: 2 }}>

                                            {
                                                users ? <div>
                                                    <div {...getRootPropProcurement()}>
                                                        <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>Budget &amp; Procurement Manager</Typography>
                                                        <input placeholder={mapping.budgetAndProcurementManagerUsername !== null ? users.find(user => user.username === mapping.budgetAndProcurementManagerUsername) && users.find(user => user.username === mapping.budgetAndProcurementManagerUsername).name : 'Budget & Procurement Manager'} style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} {...getInputPropsProcurement()} />
                                                    </div>
                                                    {groupedOptionsProcurement.length > 0 ? (
                                                        <ul style={{ margin: 0, padding: 0 }} {...getListboxPropsProcurement()}>
                                                            {groupedOptionsProcurement.map((option, index) => (
                                                                <Box sx={{ p: 0.5, px: 3, backgroundColor: grey[100], width: '100%', my: 0.5, borderRadius: 1, cursor: 'pointer' }}>
                                                                    <Typography sx={{ fontSize: 14 }} {...getOptionPropsProcurement({ option, index })}>{option.name}</Typography>
                                                                </Box>
                                                            ))}
                                                        </ul>
                                                    ) : null}
                                                </div> : <></>
                                            }

                                        </Grid>

                                        <Grid item lg={6} xs={12} sx={{ mx: 2 }}>

                                            {
                                                users ? <div>
                                                    <div {...getRootPropExternal()}>
                                                        <Typography sx={{ fontSize: 14, color: grey[400], my: 1 }}>External Auditor</Typography>
                                                        <input placeholder={mapping.externalAuditorUsername !== null ? users.find(user => user.username === mapping.externalAuditorUsername) && users.find(user => user.username === mapping.externalAuditorUsername).name : ''} style={{ width: "100%", outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 5, padding: '8px 15px', color: '#444' }} {...getInputPropsExternal()} />
                                                    </div>
                                                    {groupedOptionsExternal.length > 0 ? (
                                                        <ul style={{ margin: 0, padding: 0 }} {...getListboxPropsExternal()}>
                                                            {groupedOptionsExternal.map((option, index) => (
                                                                <Box sx={{ p: 0.5, px: 3, backgroundColor: grey[100], width: '100%', my: 0.5, borderRadius: 1, cursor: 'pointer' }}>
                                                                    <Typography sx={{ fontSize: 14 }} {...getOptionPropsExternal({ option, index })}>{option.name}</Typography>
                                                                </Box>
                                                            ))}
                                                        </ul>
                                                    ) : null}
                                                </div> : <></>
                                            }

                                        </Grid>

                                        <Grid item lg={6} xs={12} sx={{ mx: 2 }}>

                                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                                <Button type='submit' variant="contained" size="large" sx={{ backgroundColor: dashboardColor1, marginLeft: 2 }}>
                                                    Create
                                                </Button>
                                            </Box>
                                        </Grid>



                                    </Grid>

                                </Box>


                            </form>

                        </Box>
                    </Box>
                </Box>
            </Box>

        </>)
}
export default CreateMappingPage