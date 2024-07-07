import { Box, Typography, useTheme } from "@mui/material";
import React, { FC } from "react";
import FlexBetween from "./FlexBetween";

// Define the props type for the BoxHeader component
type Props = {
    title: string;
    sideText: string;
    subTitle?: string;
    icon?: React.ReactNode;
};

/**
 * BoxHeader component
 * Renders a header section with a title, optional subtitle, optional icon, and side text.
 * The layout is flexbox-based for easy alignment.
 *
 * @param {Props} props - The props for the component.
 * @param {string} props.title - The main title of the header.
 * @param {string} props.sideText - Text to display on the side.
 * @param {string} [props.subTitle] - Optional subtitle of the header.
 * @param {React.ReactNode} [props.icon] - Optional icon to display next to the title.
 * @returns {JSX.Element} The rendered BoxHeader component.
 */
const BoxHeader: FC<Props> = ({ icon, title, subTitle, sideText }) => {
    const { palette } = useTheme();

    return (
        <FlexBetween color={palette.grey[400]} margin="1rem 1rem 0 1rem">
            <FlexBetween>
                {icon}
                <Box width="100%">
                    <Typography variant="h4" mb="-0.1rem">
                        {title}
                    </Typography>
                    {subTitle && (
                        <Typography variant="h6">{subTitle}</Typography>
                    )}
                </Box>
            </FlexBetween>
            <Typography
                variant="h5"
                fontWeight="700"
                color={palette.secondary[500]}
            >
                {sideText}
            </Typography>
        </FlexBetween>
    );
};

export default BoxHeader;
