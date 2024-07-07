import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { capitalizeFirstChar } from "@/utilities/capitalizeFirstChar";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { FC, useMemo, useState } from "react";
import {
    CartesianGrid,
    Label,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import regression, { DataPoint } from "regression";

type FormattedData = {
    name: string;
    "Actual Revenue": number;
    "Trend Line": number;
    "Forecast Revenue": number;
}[];

// Prediction component
const Prediction: FC = () => {
    const { palette } = useTheme();
    const { data: kpiData } = useGetKpisQuery();
    const [isPredictions, setIsPredictions] = useState<Boolean>(false);

    // useMemo hook to format the KPI data and calculate the regression line
    const formattedData = useMemo<FormattedData>(() => {
        if (!kpiData) return [];
        const monthData = kpiData[0].monthlyData;

        // Format the monthly data into an array of data points [index, revenue]
        const formatted: Array<DataPoint> = monthData.map(
            ({ revenue }, i: number) => [i, revenue]
        );

        // Calculate the linear regression line based on the formatted data points
        const regressionLine = regression.linear(formatted);

        // Map the monthly data to an array of objects with the necessary properties
        return monthData.map(({ month, revenue }, i: number) => ({
            name: capitalizeFirstChar(month), // Capitalize the first character of the month name
            "Actual Revenue": revenue, // Actual revenue for the month
            "Trend Line": regressionLine.points[i][1], // Y-value of the regression line for the current month
            "Forecast Revenue": regressionLine.predict(i + 12)[1], // Predicted revenue for 12 months ahead
        }));
    }, [kpiData]);

    return (
        <DashboardBox
            width="100%"
            height="100%"
            padding="1rem"
            overflow="hidden"
        >
            {/* Header with title and button to toggle predictions */}
            <FlexBetween m="1rem 2.5rem" gap="1rem">
                <Box>
                    <Typography variant="h3">Revenue Insights</Typography>
                    <Typography variant="h6">
                        Visualizing current and forecasted revenue using linear
                        regression analysis
                    </Typography>
                </Box>
                <Button
                    onClick={() => setIsPredictions(!isPredictions)}
                    sx={{
                        color: palette.grey[900],
                        backgroundColor: palette.grey[700],
                        boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
                    }}
                >
                    {!isPredictions ? "Show" : "Hide"} Forecast
                </Button>
            </FlexBetween>
            {/* Line chart to display revenue data */}
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={formattedData}
                    margin={{
                        top: 20,
                        right: 75,
                        left: 20,
                        bottom: 80,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={palette.grey[800]}
                    />
                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        style={{ fontSize: "10px" }}
                    >
                        <Label
                            value="Month"
                            offset={-5}
                            position="insideBottom"
                        />
                    </XAxis>
                    <YAxis
                        domain={[12000, 26000]}
                        axisLine={{ strokeWidth: "0" }}
                        style={{ fontSize: "10px" }}
                        tickFormatter={(v) => `$${v}`}
                    >
                        <Label
                            value="Revenue (USD)"
                            angle={-90}
                            offset={-5}
                            position="insideLeft"
                        />
                    </YAxis>
                    <Tooltip />
                    <Legend verticalAlign="top" />
                    <Line
                        type="monotone"
                        dataKey="Actual Revenue"
                        stroke={palette.primary.main}
                        strokeWidth={0}
                        dot={{ strokeWidth: 5 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Trend Line"
                        stroke="#8884d8"
                        dot={false}
                    />
                    {isPredictions && (
                        <Line
                            strokeDasharray="5 5"
                            dataKey="Forecast Revenue"
                            stroke={palette.secondary[500]}
                        />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </DashboardBox>
    );
};

export default Prediction;
