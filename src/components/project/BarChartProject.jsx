import { useRef } from "react";
import Chart from 'chart.js/auto';
import { Box } from "@mui/material";
import { useEffect } from "react";
import { grey } from "@mui/material/colors";

const ProjectBarChart = ({ projects = [] }) => {
    let raisedMnoey = '#F06292';
    let estimatedBudget = '#4DB6AC';
    let chartRef = useRef();

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        let estimatedBudgetData = {
            label: "Estimated Budget",
            data: projects.map(p => p.estimatedBudget),
            backgroundColor: estimatedBudget,
            yAxisID: "y-axis-density"
        };

        let fundedMonetData = {
            label: "Raised Budget",
            data: projects.map(p => p.fundedMoney + 100),
            backgroundColor: raisedMnoey,
            yAxisID: "y-axis-gravity"
        };
        let overallData = {
            labels: projects.map(p => p.name),
            datasets: [estimatedBudgetData, fundedMonetData]
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
            data: overallData,
            options: chartOptions
        });

        return () => {
            barChart.destroy()
        }
    }, [estimatedBudget, raisedMnoey, projects])





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