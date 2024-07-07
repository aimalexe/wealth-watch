import { Box } from "@mui/material";
import { styled } from "@mui/system";

/**
 * DashboardBox component
 * A styled Box component used for creating dashboard sections with specific styles.
 * This component uses Material-UI's styled API to apply custom styles based on the theme.
 *
 * @param {object} props - The props for the component.
 * @returns {JSX.Element} The styled DashboardBox component.
 */
const DashboardBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.light,
    borderRadius: "1rem",
    boxShadow: "0.15rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, 0.8)",
}));

export default DashboardBox;
