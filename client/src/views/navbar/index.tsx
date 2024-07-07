import FlexBetween from "@/components/FlexBetween";
import { Box, Typography, useTheme } from "@mui/material";
import PixIcon from "@mui/icons-material/Pix";
import { Link } from "react-router-dom";
import { FC, useState } from "react";

function capitalizeFirstLetter(str: string): string {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const Navbar: FC = () => {
    const dashboard: string = "dashboard";
    const predictions: string = "predictions";
    const { palette } = useTheme();
    const [selected, setSelected] = useState(dashboard);

    return (
        <FlexBetween
            mb="0.25rem"
            padding="0.5rem 0rem"
            color={palette.grey[300]}
        >
            {/* Left Side */}
            <FlexBetween>
                <FlexBetween gap="0.75rem">
                    <PixIcon sx={{ fontSize: "28px" }} />
                    <Typography variant="h4" fontSize="16px">
                        Wealth Watch
                    </Typography>
                </FlexBetween>
            </FlexBetween>

            {/* Right Side */}
            <FlexBetween gap="2rem">
                <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
                    <Link
                        to="/"
                        onClick={() => setSelected(dashboard)}
                        style={{
                            color:
                                selected === dashboard
                                    ? "inherit"
                                    : palette.grey[700],
                            textDecoration: "inherit",
                        }}
                    >
                        {capitalizeFirstLetter(dashboard)}
                    </Link>
                </Box>
                <Box sx={{ "&:hover": { color: palette.primary[100] } }}>
                    <Link
                        to={"/" + predictions}
                        onClick={() => setSelected(predictions)}
                        style={{
                            color:
                                selected === predictions
                                    ? "inherit"
                                    : palette.grey[700],
                            textDecoration: "inherit",
                        }}
                    >
                        {capitalizeFirstLetter(predictions)}
                    </Link>
                </Box>
            </FlexBetween>
        </FlexBetween>
    );
};

export default Navbar;
