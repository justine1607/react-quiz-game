import React, { useState, useRef, useEffect} from 'react'
import '../styles/reset.scss'
import '../styles/theme.scss'
import '../styles/start.scss'
import {useNavigate} from "react-router-dom";
import ThemeColor from "./ThemeColor.jsx";
import PropTypes from 'prop-types';

function Start({ isLightOn, lightToggle,containerRef, handleKeyDown }) {
    const navigate = useNavigate();
    const NavigateToHtml = () =>{
        navigate('/html')
    }
    const NavigateToCss = () =>{
        navigate('/css')
    }
    const NavigateToJavaScript = () =>{
        navigate('/javascript')
    }
    const NavigateToAccessibility = () =>{
        navigate('/accessibility')
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                // Get the currently focused element
                const focusedElement = document.activeElement;

                // Check if the focused element has a tabIndex (ensures it's an interactive element)
                if (focusedElement && focusedElement.getAttribute('tabIndex') !== null) {
                    // Find the subject based on the class name
                    const subject = focusedElement.classList[0]?.split('-')[0]; // Extract 'html', 'css', etc.

                    // Map the subject class to a navigation path
                    switch (subject) {
                        case 'html':
                            navigate('/html');
                            break;
                        case 'css':
                            navigate('/css');
                            break;
                        case 'js':
                            navigate('/javascript');
                            break;
                        case 'access':
                            navigate('/accessibility');
                            break;
                        default:
                            break;
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
    return (
        <>
            <main>
                <div className="theme-container">
                    <div className="container" ref={containerRef}>
                        <ThemeColor isLightOn={isLightOn} lightToggle={lightToggle} />
                        <div className="front">
                            <div className='text-container'>
                                <h3 className={`text ${isLightOn ? 'header-dark' : 'block'}`}>Welcome to the </h3>
                                <h3 className={`bold-headline text ${isLightOn ? 'headline-dark' : 'block'}`}>Frontend Quiz!</h3>
                                <p className={`bd-text ${isLightOn ? 'dark-bd-text' : 'block'}`}>Pick a subject to get started.</p>
                            </div>
                            <div className='subject-wrapper'>
                                <span className='html-style' onClick={NavigateToHtml} tabIndex={0}>
                                    <img className='html-background' src="/images/icon-html.svg" alt="html-icon"/>
                                    <h3>
                                        HTML
                                    </h3>
                                </span>
                                <span className='css-style' onClick={NavigateToCss} tabIndex={0}>
                                    <img className='css-background' src="/images/icon-css.svg" alt="css-icon"/>
                                    <h3>
                                        CSS
                                    </h3>
                                </span>
                                <span className='js-style' onClick={NavigateToJavaScript} tabIndex={0}>
                                     <img className='js-background' src="/images/icon-js.svg" alt="js-icon"/>
                                    <h3>
                                        JavaScript
                                    </h3>
                                </span>
                                <span className='access-style' onClick={NavigateToAccessibility} tabIndex={0}>
                                     <img className='access-background' src="/images/icon-accessibility.svg"
                                          alt="accessibilty-icon"/>
                                     <h3>
                                       Accessibility
                                     </h3>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
Start.propTypes = {
    isLightOn: PropTypes.bool.isRequired,
    lightToggle: PropTypes.func.isRequired,
};
export default Start
