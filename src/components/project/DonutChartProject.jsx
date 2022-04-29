import { Box } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart() {

    const data = {
        labels: ['Sub Project I', 'Sub Project II', 'Sub Project III'],
        datasets: [
            {
                label: 'Attendance for Week 1',
                data: [25, 24, 25],
                borderColor: ['rgba(255,206,86,0.2)'],
                backgroundColor: [
                    'rgba(232,99,132,1)',
                    'rgba(232,211,6,1)',
                    'rgba(54,162,235,1)',
                ],
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