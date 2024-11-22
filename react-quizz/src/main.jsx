import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assuming App is your main component or router
import { ThemeProvider } from './ThemeContext.jsx'; // Import the ThemeProvider
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

// Import global styles
import './styles/reset.scss';
import './styles/theme.scss';
import './styles/accessibility.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </React.StrictMode>
);
