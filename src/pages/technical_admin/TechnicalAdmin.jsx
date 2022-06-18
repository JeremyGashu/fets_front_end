import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react'
import { Avatar, Badge, Divider, Grid, Menu, MenuItem, Tooltip } from '@mui/material';
import { Dashboard, EditOutlined, GraphicEqOutlined, GroupOutlined, HouseOutlined, Logout, Notifications } from '@mui/icons-material';
import { mainColor } from '../../themes/color';
import company_logo from '../../assets/company_logo.png'
import DashboardPage from './Dashboard';
import CompanyPage from './Company';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import CreateCompany from '../project_manager/CreateCompany';
import FeedsPage from '../feed/FeedsPage';
import CreateFeed from '../feed/CreateFeed';
import FeedDetailPage from '../feed/FeedDetailPage';
import UserPage from './User';
import CreateUser from './CreateUsers';
import TechnicalAdminProjectManagement from './ProjectsPage';
import CreateProjectsPage from './CreateProjectPage';
import { logOut } from '../../controller/auth';
import CreateMappingPage from './CreateMapping';
import SingleCompanyDetail from './SingleCompanyInfoPage';
import UserProjectDetail from './UserProjectDetail';
import ProjectDetail from '../project/ProjectDetail';
import EditUserPage from './EditUserPage';





const drawerWidth = 250;

const TechnicalAdminSidebar = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const navigate = useNavigate()


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!localStorage.getItem('authData')) {
        return <Navigate to='/login' />
    }

    const dashboardElement = [
        {
            name: 'Dashboard',
            component: <DashboardPage />,
            icon: <Dashboard sx={{ color: selectedIndex === 0 ? 'white' : '#444' }} />

        },
        {
            name: 'Projects',
            component: <TechnicalAdminProjectManagement />,
            icon: <GraphicEqOutlined sx={{ color: selectedIndex === 1 ? 'white' : '#444' }} />
        },

        {
            name: 'Users',
            component: <UserPage />,
            icon: <GroupOutlined sx={{ color: selectedIndex === 2 ? 'white' : '#444' }} />
        },
        {
            name: 'Companies',
            component: <CompanyPage />,
            icon: <HouseOutlined sx={{ color: selectedIndex === 3 ? 'white' : '#444' }} />
        },
        {
            name: 'Feeds',
            component: <FeedsPage />,
            icon: <EditOutlined sx={{ color: selectedIndex === 4 ? 'white' : '#444' }} />
        },
    ]


    const drawer = (
        <Box>
            {/* <Typography sx={{ fontWeight: 'bold', fontSize: 20, p: 2 }}>FETS Logo</Typography> */}
            <img style={{ maxWidth: 165, margin: 10, marginLeft: 35 }} src={company_logo} alt="Logo" />
            {/* <img height={50} style={{ padding: 5, margin: 3, textAlign: 'center', cursor: 'pointer' }} src={cncm_logo} alt='CNCM Logo' /> */}
            <Divider />
            <Grid container alignItems='center' justifyContent='space-around' sx={{ m: 1, mt: 3 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: '8px', backgroundColor: '#AAAAAA' }}>

                </Box>
                <Grid item>
                    <Typography sx={{ fontSize: 13 }}>
                        Technical Admin
                    </Typography>
                    <Typography sx={{ fontSize: 10, color: '#444' }}>
                        TA Name
                    </Typography>
                </Grid>

            </Grid>
            <Divider sx={{ m: 2, p: 1, mt: 1 }} />
            <List>
                {dashboardElement.map((menu, index) => (
                    <Box key={Math.random()} sx={{ m: 1 }}>
                        <ListItem style={{ borderRadius: 7 }} onClick={() => {
                            navigate('/technical-admin')
                            setSelectedIndex(index)
                        }} button key={menu.name} sx={{ backgroundColor: selectedIndex === index ? mainColor : 'white', my: 0, py: 1, '&:hover': { backgroundColor: selectedIndex === index ? mainColor : 'white', } }}>
                            <ListItemIcon>
                                {
                                    menu.icon
                                }
                            </ListItemIcon>
                            <ListItemText disableTypography primary={<Typography sx={{ color: selectedIndex === index ? 'white' : '#444', fontSize: 12, fontWeight: 'bold' }}>{menu.name}</Typography>} />
                        </ListItem>
                    </Box>
                ))}



            </List>
        </Box>
    )

    const container = window !== undefined ? () => window().document.body : undefined


    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        backgroundColor: 'white',
                        boxShadow: '3px 2px 3px #10444444'
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, color: mainColor, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* <Divider /> */}
                        <Grid container justifyContent='flex-end' alignItems='center'>
                            <Grid item>

                                <Grid container>
                                    <Grid item>
                                        <IconButton sx={{ mr: 1 }}>
                                            <Badge badgeContent={<Typography sx={{ color: mainColor }}>{4}</Typography>}>
                                                <Notifications sx={{ color: mainColor, fontSize: 25 }} />
                                            </Badge>
                                        </IconButton>
                                    </Grid>

                                    <Tooltip title="Account settings">
                                        <IconButton
                                            onClick={handleClick}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                        </IconButton>
                                    </Tooltip>

                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem onClick={async () => {
                                            // console.log('Log out')
                                            await logOut()
                                            navigate('/')
                                        }}>
                                            <ListItemIcon>
                                                <IconButton>
                                                    <Logout fontSize="small" sx={{ color: mainColor, fontSize: 14 }} />
                                                </IconButton>

                                            </ListItemIcon>
                                            <Typography sx={{ fontSize: 14 }}>Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                {/* <Divider /> */}
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />


                    {
                        <Routes>
                            <Route path='*' element={dashboardElement[selectedIndex]['component']} />
                            <Route path='add-company' element={<CreateCompany />} />
                            <Route path='create-feed' element={<CreateFeed />} />
                            <Route path='feed-detail/:id' element={<FeedDetailPage />} />
                            <Route path='create-user' element={<CreateUser />} />
                            <Route path='create-project' element={<CreateProjectsPage />} />
                            <Route path='add-mapping/:id' element={<CreateMappingPage />} />
                            <Route path='company-detail/:id' element={<SingleCompanyDetail />} />
                            <Route path='user-project-detail/:username' element={<UserProjectDetail />} />
                            <Route path='project-detail/:id' element={<ProjectDetail />} />
                            <Route path='edit-user/:username' element={<EditUserPage />} />

                            {/* <Route path='assets/:departmentid' element={<AssetsComponent />} />
                            <Route path='associations/:departmentid' element={<AssociationComponent />} />
                            <Route path='association_members/:associationid' element={<AssociationMembersComponent />} />
                            <Route path='company_members/:companyid' element={<CompanyMembersComponent />} /> */}
                        </Routes>
                    }
                </Box>
            </Box>

        </>
    )
}


export default TechnicalAdminSidebar