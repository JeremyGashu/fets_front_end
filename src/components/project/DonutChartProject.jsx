import { Box } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart({ projects = [] }) {
    console.log(projects)

    const data = {

        labels: projects.map(p => p.name),
        datasets: [
            {
                data: projects.map(p => (p.approved || 1) + (p.unapproved || 1)),
                borderColor: ['rgba(255,206,86,0.2)'],
                backgroundColor: projects.map(p => {
                    return '#' + Math.floor(Math.random() * 16777215).toString(16)
                }),
                pointBackgroundColor: 'rgba(255,206,86,0.2)',
            }

        ]
    }



    return (
        <Box sx={{ p: 2, m: 1 }}>
            <Doughnut data={data} />
        </Box>
    )
}

export default DoughnutChart