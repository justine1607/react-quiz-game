import React from 'react';
import PropTypes from 'prop-types';

function ThemeBgImage({ isLightOn }) {
    return (
        <>
            <img
                className={` theme-Bg-Img ${isLightOn ? 'light-pattern' : 'dark-pattern'}`}
                src="/images/pattern-background-desktop-light.svg"
                alt="light-pattern"
            />
            <img
                className={` theme-Bg-Img ${isLightOn ? 'dark-pattern' : 'light-pattern'}`}
                src="/images/pattern-background-desktop-dark.svg"
                alt="dark-pattern"
            />
            {/* You can add more content like light-toggle icons if necessary */}
        </>
    );
}
ThemeBgImage.propTypes = {
    isLightOn: PropTypes.bool, // Validating that isLightOn should be a boolean and is required
};
export default ThemeBgImage;
