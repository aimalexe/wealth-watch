import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { capitalizeFirstChar } from "@/utilities/capitalizeFirstChar";
import { useTheme } from "@mui/material";
import { FC, useMemo } from "react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

// Rename the component to better describe its purpose
const FinancialOverview: FC = () => {
    // Fetching KPI data using custom hooks
    const { data } = useGetKpisQuery();
    const { palette } = useTheme();

    // Memoize the processed data for AreaChart
    const revenueExpenses = useMemo(
        () =>
            data &&
            data[0]?.monthlyData?.map(({ month, revenue, expenses }) => ({
                name: capitalizeFirstChar(month.substring(0, 3)),
                revenue: revenue,
                expenses: expenses,
            })),
        [data]
    );

    // Memoize the processed data for LineChart
    const revenueProfit = useMemo(
        () =>
            data &&
            data[0]?.monthlyData?.map(({ month, revenue, expenses }) => ({
                name: capitalizeFirstChar(month.substring(0, 3)),
                revenue: revenue,
                profit: (revenue - expenses).toFixed(2),
            })),
        [data]
    );

    // Memoize the processed data for BarChart
    const revenueMonthByMonth = useMemo(
        () =>
            data &&
            data[0]?.monthlyData?.map(({ month, revenue }) => ({
                name: capitalizeFirstChar(month.substring(0, 3)),
                revenue: revenue,
            })),
        [data]
    );

    return (
        <>
            {/* AreaChart for Revenue and Expenses */}
            <DashboardBox gridArea="a">
                <BoxHeader
                    title="Monthly Revenue and Expenses"
                    subTitle="Top line represents revenue, bottom line represents expenses"
                    sideText="+4%"
                />
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={revenueExpenses}
                        margin={{
                            top: 15,
                            right: 25,
                            left: -10,
                            bottom: 60,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="colorRevenue"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0.5}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                            <linearGradient
                                id="colorExpenses"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0.5}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={{ strokeWidth: "0" }}
                            style={{ fontSize: "10px" }}
                            domain={[8000, 23000]}
                        />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            dot={true}
                            stroke={palette.primary.main}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                        <Area
                            type="monotone"
                            dataKey="expenses"
                            dot={true}
                            stroke={palette.primary.main}
                            fillOpacity={1}
                            fill="url(#colorExpenses)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </DashboardBox>

            {/* LineChart for Revenue and Profit */}
            <DashboardBox gridArea="b">
                <BoxHeader
                    title="Monthly Revenue and Profit"
                    subTitle="Top line represents revenue, bottom line represents profit"
                    sideText="+5.5%"
                />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={revenueProfit}
                        margin={{
                            top: 20,
                            right: 0,
                            left: -10,
                            bottom: 55,
                        }}
                    >
                        <CartesianGrid
                            vertical={false}
                            stroke={palette.grey[800]}
                        />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                        />
                        <YAxis
                            yAxisId="left"
                            tickLine={false}
                            axisLine={false}
                            style={{ fontSize: "10px" }}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickLine={false}
                            axisLine={false}
                            style={{ fontSize: "10px" }}
                        />
                        <Tooltip />
                        <Legend
                            height={20}
                            wrapperStyle={{
                                margin: "0 0 10px",
                            }}
                        />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="revenue"
                            stroke={palette.primary.main}
                        />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="profit"
                            stroke={palette.tertiary[500]}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>

            {/* BarChart for Revenue Month by Month */}
            <DashboardBox gridArea="c">
                <BoxHeader
                    title="Monthly Revenue Breakdown"
                    subTitle="Graph representing the revenue month by month"
                    sideText="+6.1%"
                />
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={revenueMonthByMonth}
                        margin={{
                            top: 17,
                            right: 15,
                            left: -5,
                            bottom: 58,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="colorRevenue"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={palette.primary[300]}
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            vertical={false}
                            stroke={palette.grey[800]}
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: "10px" }}
                        />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="url(#colorRevenue)" />
                    </BarChart>
                </ResponsiveContainer>
            </DashboardBox>
        </>
    );
};

export default FinancialOverview;
