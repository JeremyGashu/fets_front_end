import { useRef } from "react";
import Chart from 'chart.js/auto';
import { Box } from "@mui/material";
import { useEffect } from "react";
import { grey } from "@mui/material/colors";

const ProjectBarChart = () => {
    let raisedMnoey = '#F06292';
    let estimatedBudget = '#4DB6AC';
    let chartRef = useRef();

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        let densityData = {
            label: "Estimated Budget",
            data: [5427, 5243, 5514, 3933, 1326, 687, 1271, 1638],
            backgroundColor: estimatedBudget,
            yAxisID: "y-axis-density"
        };

        let gravityData = {
            label: "Raised Budget",
            data: [3000, 1000, 2000, 4000, 3000, 3000, 300, 9000],
            backgroundColor: raisedMnoey,
            yAxisID: "y-axis-gravity"
        };
        let planetData = {
            labels: ['Project 1', 'Project 2', 'Project 3'],
            datasets: [densityData, gravityData]
        };

        let chartOptions = {
            barPercentage: 1,
            categoryPercentage: 0.8,
            scales: {
                "y-axis-density": {
                    grid: {
                        color: grey[100],
                        tickColor: grey[100],
                        borderColor: grey[100]
                    },
                    ticks: {
                        color: estimatedBudget
                    },
                    position: "left"
                },
                "y-axis-gravity": {
                    grid: {
                        color: grey[100],
                        tickColor: grey[100],
                        borderColor: grey[100]
                    },
                    ticks: {
                        color: raisedMnoey
                    },
                    position: "right"
                }
            }
        };

        let barChart = new Chart(ctx, {
            type: "bar",
            data: planetData,
            options: chartOptions
        });

        return () => {
            barChart.destroy()
        }
    }, [estimatedBudget, raisedMnoey])





    return (
        <Box>
            <canvas
                id="barChart"
                ref={chartRef}
            />
        </Box>
    )
}

export default ProjectBarChart