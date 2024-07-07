import { Box, useMediaQuery } from "@mui/material";
import { FC } from "react";
import DashboardOverview from "./DashboardOverview";
import FinancialDashboard from "./FinancialDashboard";
import FinancialOverview from "./FinancialOverview";

// Grid template for large screens
const gridTemplateLargeScreens: string = `
    "a b c"
    "a b c"
    "a b c"
    "a b f"
    "d e f"
    "d e f"
    "d h i"
    "g h i"
    "g h j"
    "g h j"
`;

// Grid template for medium screens
const gridTemplateMediumScreens: string = `
    "a b"
    "a b"
    "c d"
    "c d"
    "e f"
    "e f"
    "g h"
    "g h"
    "g h"
    "i j"
    "i j"
`;

// Grid template for small screens
const gridTemplateSmallScreens: string = `
    "a"
    "a"
    "b"
    "b"
    "c"
    "c"
    "d"
    "d"
    "e"
    "e"
    "f"
    "f"
    "g"
    "g"
    "g"
    "h"
    "h"
    "h"
    "i"
    "i"
    "j"
    "j"
`;

const Dashboard: FC = () => {
    const isAboveLargeScreens = useMediaQuery("(min-width: 1200px)");
    const isAboveMediumScreens = useMediaQuery(
        "(min-width: 800px) and (max-width: 1199px)"
    );

    return (
        <Box
            width="100%"
            height="100%"
            display="grid"
            gap="1.5rem"
            sx={
                isAboveLargeScreens ? {
                        gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
                        gridTemplateRows: "repeat(10, minmax(70px, 1fr))",
                        gridTemplateAreas: gridTemplateLargeScreens,
                    }: isAboveMediumScreens? {
                        gridTemplateColumns: "repeat(2, minmax(370px, 1fr))",
                        gridTemplateRows: "repeat(11, minmax(80px, 1fr))",
                        gridTemplateAreas: gridTemplateMediumScreens,
                    }: {
                        gridAutoColumns: "1fr",
                        gridAutoRows: "80px",
                        gridTemplateAreas: gridTemplateSmallScreens,
                    }
            }
        >
            <FinancialOverview />
            <FinancialDashboard />
            <DashboardOverview />
        </Box>
    );
};

export default Dashboard;
