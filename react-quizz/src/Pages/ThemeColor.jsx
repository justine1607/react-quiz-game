import React, { useEffect, useState } from 'react';
import ThemeBg from './ThemeBgImage.jsx';
import PropTypes from 'prop-types';

function ThemeColor({ isLightOn, lightToggle }) {

    return (
        <>
            <ThemeBg isLightOn={isLightOn} />
            <div className="lights">
                <img className={`img-light ${isLightOn ? 'none' : 'block'}`} src="/images/icon-sun-dark.svg" alt="sun-dark" />
                <img className={`img-light ${isLightOn ? 'block' : 'none'}`} src="/images/icon-sun-light.svg" alt="sun-light" />
                <div className="light-toggle" onClick={lightToggle}>
                    <span className={`circle ${isLightOn ? 'active' : ''}`}></span>
                </div>
                <img className={`img-light ${isLightOn ? 'block' : 'none'}`} src="/images/icon-moon-light.svg" alt="moon-light" />
                <img className={`img-light ${isLightOn ? 'none' : 'block'}`} src="/images/icon-moon-dark.svg" alt="moon-dark" />
            </div>
        </>
    );
}
ThemeColor.propTypes = {
    isLightOn: PropTypes.bool.isRequired,
    lightToggle: PropTypes.func.isRequired,
};
export default ThemeColor;
