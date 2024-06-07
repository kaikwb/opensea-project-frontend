import React from "react";
import {Box} from "@mui/material";

interface ContentProps {
    children?: React.ReactNode;
}

function Content({children}: ContentProps) {
    return (
        <>
            <Box
                component="main"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    flexGrow: 1,
                    maxWidth: 'xl',
                    width: 1
                }}
            >
                {children}
            </Box>
        </>
    );
}

export default Content;
