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

                // Check if the focused element has the data-subject attribute
                const subject = focusedElement?.dataset?.subject;
                console.log(subject)

                if (subject) {
                    // Navigate to the corresponding route based on the subject
                    navigate(`/${subject}`);
                }
            }
        };

        // Add the event listener for the "Enter" key press
        document.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [navigate]);

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
                                <button className='html-style' onClick={NavigateToHtml} data-subject="html">
                                    <img className='html-background' src="/images/icon-html.svg" alt="html-icon"/>
                                    <h3>
                                        HTML
                                    </h3>
                                </button>
                                <button className='css-style' onClick={NavigateToCss} data-subject="css">
                                    <img className='css-background' src="/images/icon-css.svg" alt="css-icon"/>
                                    <h3>
                                        CSS
                                    </h3>
                                </button>
                                <button className='js-style' onClick={NavigateToJavaScript} data-subject="javascript">
                                     <img className='js-background' src="/images/icon-js.svg" alt="js-icon"/>
                                    <h3>
                                        JavaScript
                                    </h3>
                                </button>
                                <button className='access-style' onClick={NavigateToAccessibility} data-subject="accessibility">
                                     <img className='access-background' src="/images/icon-accessibility.svg"
                                          alt="accessibilty-icon"/>
                                     <h3>
                                       Accessibility
                                     </h3>
                                </button>
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
