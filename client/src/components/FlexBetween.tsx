import { Box } from "@mui/material";
import { styled } from "@mui/system";

/**
 * FlexBetween component
 * A styled Box component that applies flexbox layout with space-between alignment.
 * This component is useful for aligning child elements with space between them.
 *
 * @param {object} props - The props for the component.
 * @returns {JSX.Element} The styled FlexBetween component.
 */
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
});

export default FlexBetween;
