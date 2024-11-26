import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create the context
const ThemeContext = createContext();

// ThemeProvider wraps the app and provides the theme state
export const ThemeProvider = ({ children }) => {
    const [isLightOn, setIsLightOn] = useState(false);

    return (
        <ThemeContext.Provider value={{ isLightOn, setIsLightOn }}>
            {children}
        </ThemeContext.Provider>
    );
};
ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired, // Prop validation for children
};
export const useTheme = () => useContext(ThemeContext);
