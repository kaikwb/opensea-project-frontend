import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'normalize.css';
import './index.css';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const theme = createTheme(({
    palette: {
        primary: {
            main: '#1F2D5A',
        }
    }
}));

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </React.StrictMode>,
)
