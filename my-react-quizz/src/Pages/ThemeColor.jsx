import React, {useEffect, useRef, useState} from 'react';
import ThemeBg from './ThemeBgImage.jsx';
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";

function ThemeColor({ isLightOn, lightToggle }) {
    const containerRef = useRef(null)
    const navigate = useNavigate()
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter' && containerRef.current === document.activeElement) {
                lightToggle(); // Toggle the light/dark theme when Enter is pressed
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [lightToggle]);

    return (
        <>
            <ThemeBg isLightOn={isLightOn} />
            <div className="lights" ref={containerRef}>
                <img className={`img-light ${isLightOn ? 'none' : 'block'}`} src="/images/icon-sun-dark.svg" alt="sun-dark" />
                <img className={`img-light ${isLightOn ? 'block' : 'none'}`} src="/images/icon-sun-light.svg" alt="sun-light" />
                <div className="light-toggle" onClick={lightToggle}>
                    <button className={`circle ${isLightOn ? 'active' : ''}`}></button>
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
