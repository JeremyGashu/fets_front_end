import { CalendarMonthOutlined, Check } from "@mui/icons-material"
import { Box, Button, Divider, Grid, Typography } from "@mui/material"
import { green, grey, red } from "@mui/material/colors"
import { mainColor } from "../../themes/color"

export const TaskDetailCardCompleted = () => {
    return (
        <Box sx={{ p: 2, width: '100%', backgroundColor: 'white', minHeight: 220, my: 1, borderRadius: 3, boxShadow: `1px 1px 3px 5px  ${grey[100]}` }}>
            <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: grey[700], my: 3 }}>
                Task Name
            </Typography>

            <Typography sx={{ fontSize: 13, color: grey[600] }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet porro atque eaque sed facere corporis dolores ullam obcaecati cupiditate vel ex, harum.
            </Typography>

            <Typography sx={{ fontSize: 11, color: mainColor, py: 1, borderRadius: 2, }}>
                Sub project name
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Grid container justifyContent='flex-end' alignItems='center'>
                <Grid item>
                    <Check sx={{ color: green[800] }} />
                </Grid>
                <Grid item sx={{ ml: 0.5 }}>
                    <Typography sx={{ fontSize: 13, color: green[700] }}>Done</Typography>
                </Grid>
            </Grid>


        </Box>
    )
}


export const TaskDetailCardOngoing = ({ task = {} }) => {
    return (
        <Box sx={{ p: 2, width: '100%', backgroundColor: 'white', minHeight: 220, my: 1, borderRadius: 3, boxShadow: `1px 1px 3px 5px  ${grey[100]}` }}>
            <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: grey[700], my: 3 }}>
                {task.name}
            </Typography>

            <Typography sx={{ fontSize: 13, color: grey[600] }}>
                {task.description}
            </Typography>

            {/* <Typography sx={{ fontSize: 11, color: mainColor, py: 1, borderRadius: 2, }}>
                {Sub project name}
            </Typography> */}

            <Divider sx={{ my: 1 }} />

            <Grid container justifyContent='flex-end' alignItems='center'>
                <Grid item>
                    <CalendarMonthOutlined sx={{ color: grey[400] }} />
                </Grid>
                <Grid item sx={{ ml: 0.5 }}>
                    <Typography sx={{ fontSize: 13, color: grey[700] }}>{(new Date(task.estimatedDuration)).toDateString()}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export const TaskDetailCardNeedApproval = () => {
    return (
        <Box sx={{ p: 2, width: '100%', backgroundColor: 'white', minHeight: 220, my: 1, borderRadius: 3, boxShadow: `1px 1px 3px 5px  ${grey[100]}` }}>
            <Typography sx={{ fontSize: 14, fontWeight: 'bold', color: grey[700], my: 3 }}>
                Task Name
            </Typography>

            <Typography sx={{ fontSize: 13, color: grey[600] }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet porro atque eaque sed facere corporis dolores ullam obcaecati cupiditate vel ex, harum.
            </Typography>

            <Typography sx={{ fontSize: 11, color: mainColor, py: 1, borderRadius: 2, }}>
                Sub project name
            </Typography>

            <Divider sx={{ my: 1 }} />

            <Grid container justifyContent='flex-end'>
                <Grid item>
                    <Button sx={{ fontSize: 13, color: green[700] }}>Approve</Button>
                </Grid>
                <Grid item>
                    <Button sx={{ fontSize: 13, color: red[700] }}>Decline</Button>
                </Grid>
            </Grid>
        </Box>
    )
}
