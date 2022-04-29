import { AddOutlined, } from "@mui/icons-material"
import { Box, Divider, Grid, IconButton } from "@mui/material"
import { grey } from "@mui/material/colors"
import CompanyDescriptionComponent from "../../components/company/CompanyDescriptionComponent"
import CompanyListItem from "../../components/company/CompanyListItem"
import { backgroundColor, mainColor } from "../../themes/color"

const CompanyPage = () => {
    return (
        <>
            <Grid container>
                <Grid item sx={{ minHeight: '100vh', backgroundColor: backgroundColor, borderRadius: 2 }} lg={4}>
                    <Grid container direction='row' alignItems='center' sx={{ p: 1 }}>
                        <Grid item sx={{}}>
                            <input type="text" style={{ width: 220, outline: 'none', border: `1px solid ${mainColor}`, borderRadius: 12, padding: '8px 15px', margin: 5, color: '#444' }} />
                        </Grid>

                        <Grid item sx={{ backgroundColor: mainColor, borderRadius: '20%', m: 1 }}>
                            <IconButton size='small'>
                                <AddOutlined sx={{ color: 'white', alignSelf: 'center' }} />
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Box className='project-list-container' sx={{maxHeight : '90vh', overflowY : 'scroll'}}>
                        <CompanyListItem name='Mulxi Company Limited' location='Adama, Ethiopia' />
                        <CompanyListItem name='Mulxi Company Limited' location='Adama, Ethiopia' />
                        <CompanyListItem name='Mulxi Company Limited' location='Adama, Ethiopia' />
                        <CompanyListItem name='Mulxi Company Limited' location='Adama, Ethiopia' />
                        <CompanyListItem name='Mulxi Company Limited' location='Adama, Ethiopia' />
                        <CompanyListItem name='Mulxi Company Limited' location='Adama, Ethiopia' />
                        <CompanyListItem name='Mulxi Company Limited' location='Adama, Ethiopia' />
                    </Box>

                </Grid>

                <Grid item lg={8} sx={{ px: 2, position: 'relative' }} >
                    <Box sx={{ height: 170, backgroundColor: grey[300], borderRadius: 1 }}>
                        {/*Cover Image*/}
                    </Box>

                    <Box sx={{ height: 60, width: 60, backgroundColor: grey[400], borderRadius: 1, position: 'relative', bottom: 30, ml: 3 }}>
                        {/*Profile Image*/}
                    </Box>

                    <Divider sx={{ mx: 3, mb: 2 }} />

                    <CompanyDescriptionComponent name='Mulxi Company Limited' location='Adama, Ethiopia' description='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat in labore maiores ab quibusdam distinctio asperiores sed assumenda accusamus, atque ratione perferendis ipsa cumque iste ducimus qui iure odio illum iusto culpa voluptatum eveniet harum? Modi tenetur, consequatur, eos doloremque autem illo corporis minima explicabo dolore impedit iste magnam pariatur iusto sapiente ratione doloribus. Quam quidem quaerat explicabo dicta commodi culpa deleniti dolorum tempore.' />
                </Grid>


            </Grid>
        </>
    )
}

export default CompanyPage