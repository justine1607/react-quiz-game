import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './ThemeContext.jsx';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

// Import global styles
import './styles/reset.scss';
import './styles/theme.scss';
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </React.StrictMode>
);
