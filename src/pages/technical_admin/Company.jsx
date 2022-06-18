import { AddOutlined, EditOutlined, } from "@mui/icons-material"
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useState } from "react"
import { useQuery } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import CompanyDescriptionComponent from "../../components/company/CompanyDescriptionComponent"
import CompanyListItem from "../../components/company/CompanyListItem"
import FullPageLoading from "../../components/FullPageLoadingPage"
import { getAllCompanies } from "../../controller/company"
import { backgroundColor, mainColor } from "../../themes/color"

const CompanyPage = () => {
    const { isLoading, data } = useQuery('company', getAllCompanies)
    const navigate = useNavigate()

    const [selectedCompany, setSelectedCompany] = useState()

    if (isLoading) {
        return <FullPageLoading />
    }
    return (
        <>
            <Grid container>
                <Grid item sx={{ minHeight: '100vh', backgroundColor: backgroundColor, borderRadius: 2 }} lg={4}>
                    {
                        !isLoading && data && <Grid container direction='row' alignItems='center' sx={{ p: 1 }}>
                            <Grid item sx={{}}>
                                <input type="text" style={{ width: 220, outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 12, padding: '8px 15px', margin: 5, color: '#444' }} />
                            </Grid>

                            <Grid item sx={{ backgroundColor: mainColor, borderRadius: '20%', m: 1 }}>
                                <Link to={'add-company'}>
                                    <IconButton size='small'>
                                        <AddOutlined sx={{ color: 'white', alignSelf: 'center' }} />
                                    </IconButton>
                                </Link>
                            </Grid>
                        </Grid>
                    }

                    {
                        !isLoading && data && <Box className='project-list-container' sx={{ maxHeight: '90vh', overflowY: 'scroll' }}>
                            {/* <CompanyListItem name='Mulxi Company Limited' location='Adama, Ethiopia' />
                            <CompanyListItem name='Mulxi Company Limited' location='Adama, Ethiopia' />
                            <CompanyListItem name='Mulxi Company Limited' location='Adama, Ethiopia' />
                            <CompanyListItem name='Mulxi Company Limited' location='Adama, Ethiopia' />
                            <CompanyListItem name='Mulxi Company Limited' location='Adama, Ethiopia' />
                            <CompanyListItem name='Mulxi Company Limited' location='Adama, Ethiopia' />
                            <CompanyListItem name='Mulxi Company Limited' location='Adama, Ethiopia' /> */}

                            {
                                data.map(company => {
                                    return <div onClick={() => {
                                        setSelectedCompany(company)
                                    }}>
                                        <CompanyListItem id={company.id} name={company.name} location={company.address} />
                                    </div>
                                })
                            }
                        </Box>
                    }

                </Grid>

                {
                    selectedCompany && <Grid item lg={8} sx={{ px: 2, position: 'relative' }} >
                        <Box sx={{ height: 170, backgroundColor: grey[300], borderRadius: 1 }}>
                            <Typography sx={{ fontSize: 38, color: grey[700], ml: 3 }}>{selectedCompany.name}</Typography>
                        </Box>

                        <Box sx={{ height: 60, width: 60, backgroundColor: grey[400], borderRadius: 1, position: 'relative', bottom: 30, ml: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: 32, color: grey[700] }}>{selectedCompany.name && selectedCompany.name[0]}</Typography>

                        </Box>

                        <IconButton onClick={() => {
                            navigate(`update-company/${selectedCompany.id}`)
                        }}>
                            <EditOutlined sx={{ color: mainColor }} />
                        </IconButton>

                        <Divider sx={{ mx: 3, mb: 2 }} />

                        <CompanyDescriptionComponent phone={selectedCompany.phone} email={selectedCompany.email} name={selectedCompany.name} location={selectedCompany.address} description={selectedCompany.description} />
                    </Grid>
                }

                {
                    !selectedCompany && <Grid item lg={8} sx={{ px: 2, }} >
                        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Typography sx={{ color: grey[700], fontSize: 12, textAlign: 'center', my: 2 }}>No company selected...</Typography>
                        </Box>
                    </Grid>
                }


            </Grid>
        </>
    )
}

export default CompanyPage