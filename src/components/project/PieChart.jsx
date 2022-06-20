import { Box } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';

function PieChart({ totalDonated = 1, totalNeeded = 1 }) {

    const data = {

        labels: ['Total Donated', 'Total Needed'],
        datasets: [
            {
                data: [totalDonated, totalNeeded],
                borderColor: ['rgba(255,206,86,0.2)'],
                backgroundColor: ['#C93756', '#26A65B'],
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

export default PieChart