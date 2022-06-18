import { Group } from "@mui/icons-material";
import { Grid, IconButton, Typography, Popover, Box } from "@mui/material"
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mainColor } from "../../themes/color"

const ProjectUserPopover = ({ id }) => {

    const [mapping, setMapping] = useState()
    const [loadingMapping, setLoadingMapping] = useState(false)
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const { mappingContract } = useSelector(state => state.contracts)

    useEffect(() => {
        mappingContract && mappingContract.methods.getMappingById(id).call().then(res => {
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
    }, [mappingContract])

    return (
        <Grid item>
            <IconButton onClick={handleClick}>
                <Group
                    sx={{ color: mainColor, fontSize: 16 }}
                />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <>
                    {
                        loadingMapping ?? <Typography>Loading...</Typography>
                    }
                    {
                        !loadingMapping && mapping &&
                        <Box sx={{ px: 2, py: 3, borderRadius: 2 }}>
                            <Typography sx={{ fontSize: 12, my: 1 }}>Project Manager {mapping['projectManagerUsername'] ? <span onClick={() => {
                                navigate(`user-project-detail/${mapping['projectManagerUsername']}`)
                            }} style={{ color: mainColor, textDecoration: 'underline', cursor: 'pointer' }}>{mapping['projectManagerUsername']}</span> : <span style={{ color: 'black' }}>Not Assigned</span>}
                            </Typography>

                            <Typography sx={{ fontSize: 12, my: 1 }}>Budget &amp; Procurement Manager {mapping['budgetAndProcurementManagerUsername'] ? <span onClick={() => {
                                navigate(`user-project-detail/${mapping['budgetAndProcurementManagerUsername']}`)
                            }} style={{ color: mainColor, textDecoration: 'underline', cursor: 'pointer' }}>{mapping['budgetAndProcurementManagerUsername']}</span> : <span style={{ color: 'black' }}>Not Assigned</span>}
                            </Typography>

                            <Typography sx={{ fontSize: 12, my: 1 }}>Financial Officer {mapping['financialOfficerUsername'] ? <span onClick={() => {
                                navigate(`user-project-detail/${mapping['financialOfficerUsername']}`)
                            }} style={{ color: mainColor, textDecoration: 'underline', cursor: 'pointer' }}>{mapping['financialOfficerUsername']}</span> : <span style={{ color: 'black' }}>Not Assigned</span>}
                            </Typography>
                            <Typography sx={{ fontSize: 12, my: 1 }}>External Auditor {mapping['externalAuditorUsername'] ? <span onClick={() => {
                                navigate(`user-project-detail/${mapping['externalAuditorUsername']}`)
                            }} style={{ color: mainColor, textDecoration: 'underline', cursor: 'pointer' }}>{mapping['externalAuditorUsername']}</span> : <span style={{ color: 'black' }}>Not Assigned</span>}
                            </Typography>

                        </Box>
                    }
                </>
            </Popover>
        </Grid>
    )
}


export default ProjectUserPopover