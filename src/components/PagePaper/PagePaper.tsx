import React from "react";
import {Box, Container, Paper} from "@mui/material";

interface PagePaperProps {
    children?: React.ReactNode;
}

function PagePaper({children}: PagePaperProps) {
    return (
        <Box sx={{py: 2, maxWidth: 'xl', display: 'flex', flexGrow: 1, width: '100%'}}>
            <Container maxWidth={false} sx={{display: 'flex'}}>
                <Paper sx={{padding: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)', width: '100%'}}>
                    {children}
                </Paper>
            </Container>
        </Box>
    )
}

export default PagePaper;
