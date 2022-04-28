import React from 'react';
import Chart from 'chart.js/auto';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useRef } from 'react';

const LineChart = () => {

    let chartRef = useRef();


    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        let chart = new Chart(ctx, {

            type: "line",
            data: {
                labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                datasets: [{
                    data: [10, 20, 0, 15, 0, 1, 30, 10, 45],
                    label: "Total Donated",
                    borderColor: "red",
                    backgroundColor: "red",
                    fill: false,
                    borderWidth: 1,
                }, {
                    data: [70, 90, 44, 60, 83, 0],
                    label: "Total Needed",
                    borderColor: "green",
                    backgroundColor: "green",
                    fill: false,
                    borderWidth: 1,
                },
                ]
            },
        });

        return () => {
            chart.destroy()
        }
    }, [])
    return (
        <Box>
            <canvas
                id="myChart"
                ref={chartRef}
            />
        </Box>
    )
}

export default LineChart