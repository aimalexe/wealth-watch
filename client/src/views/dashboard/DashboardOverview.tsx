import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
    useGetKpisQuery,
    useGetProductsQuery,
    useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";
import Dashboard from ".";

const DashboardOverview = () => {
    const { palette } = useTheme();
    const pieColors = [palette.primary[800], palette.primary[500]];

    // Fetching data using custom hooks
    const { data: kpiData } = useGetKpisQuery();
    const { data: productData } = useGetProductsQuery();
    const { data: transactionData } = useGetTransactionsQuery();

    // Memoize pie chart data to avoid unnecessary calculations
    const pieChartData = useMemo(() => {
        if (kpiData) {
            const totalExpenses = kpiData[0].totalExpenses;
            return Object.entries(kpiData[0].expensesByCategory).map(
                ([key, value]) => [
                    { name: key, value },
                    { name: `${key} of Total`, value: totalExpenses - value },
                ]
            );
        }
        return [];
    }, [kpiData]);

    // Define columns for product data grid
    const productColumns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "expense",
            headerName: "Expense",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "price",
            headerName: "Price",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
    ];

    // Define columns for transaction data grid
    const transactionColumns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "buyer",
            headerName: "Buyer",
            flex: 0.67,
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.35,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "productIds",
            headerName: "Count",
            flex: 0.1,
            renderCell: (params: GridCellParams) =>
                (params.value as string[]).length,
        },
    ];

    return (
        <>
            {/* Product Data Grid */}
            <DashboardBox gridArea="g">
                <BoxHeader
                    title="List of Products"
                    sideText={`${productData?.length ?? 0} products`}
                />
                <Box
                    mt="0.5rem"
                    p="0 0.5rem"
                    height="75%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[300],
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnSeparator": {
                            visibility: "hidden",
                        },
                    }}
                >
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter
                        rows={productData ?? []}
                        columns={productColumns}
                    />
                </Box>
            </DashboardBox>

            {/* Transaction Data Grid */}
            <DashboardBox gridArea="h">
                <BoxHeader
                    title="Recent Orders"
                    sideText={`${
                        transactionData?.length ?? 0
                    } latest transactions`}
                />
                <Box
                    mt="1rem"
                    p="0 0.5rem"
                    height="80%"
                    sx={{
                        "& .MuiDataGrid-root": {
                            color: palette.grey[300],
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderBottom: `1px solid ${palette.grey[800]} !important`,
                        },
                        "& .MuiDataGrid-columnSeparator": {
                            visibility: "hidden",
                        },
                    }}
                >
                    <DataGrid
                        columnHeaderHeight={25}
                        rowHeight={35}
                        hideFooter
                        rows={transactionData ?? []}
                        columns={transactionColumns}
                    />
                </Box>
            </DashboardBox>

            {/* Pie Chart for Expense Breakdown */}
            <DashboardBox gridArea="i">
                <BoxHeader
                    title="Expense Breakdown By Category"
                    sideText="+4%"
                />
                <FlexBetween
                    mt="0.5rem"
                    gap="0.5rem"
                    p="0 1rem"
                    textAlign="center"
                >
                    {pieChartData.map((data, i) => (
                        <Box key={`${data[0].name}-${i}`}>
                            <PieChart width={110} height={100}>
                                <Pie
                                    stroke="none"
                                    data={data}
                                    innerRadius={18}
                                    outerRadius={35}
                                    paddingAngle={2}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                pieColors[
                                                    index % pieColors.length
                                                ]
                                            }
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                            <Typography variant="h5">{data[0].name}</Typography>
                        </Box>
                    ))}
                </FlexBetween>
            </DashboardBox>

            {/* Overall Summary */}
            <DashboardBox gridArea="j">
                <BoxHeader
                    title="Overall Summary and Explanation Data"
                    sideText="+15%"
                />
                <Box
                    height="15px"
                    margin="1.25rem 1rem 0.4rem 1rem"
                    bgcolor={palette.primary[800]}
                    borderRadius="1rem"
                >
                    <Box
                        height="15px"
                        bgcolor={palette.primary[600]}
                        borderRadius="1rem"
                        width="40%"
                    />
                </Box>
                <Typography margin="0 1rem" variant="h6" overflow="hidden">
                    Our dashboard provides a comprehensive overview of key
                    performance indicators (KPIs), financial metrics, and
                    operational data. It is designed to help you make informed
                    decisions by presenting data in an easily digestible format.
                    The charts and graphs highlight trends and patterns,
                    offering insights into revenue, expenses, and overall
                    performance.
                </Typography>
            </DashboardBox>
        </>
    );
};

export default DashboardOverview;
