import React from "react";
import {Box} from "@mui/material";

interface BodyProps {
    children?: React.ReactNode;
    backgroundImage?: string;
}

function Body({children, backgroundImage}: BodyProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                alignItems: 'center',
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {children}
        </Box>
    );
}

export default Body;
