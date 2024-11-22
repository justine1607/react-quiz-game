import React, { useState } from 'react'
import '../styles/reset.scss'
import '../styles/theme.scss'
import '../styles/style.scss'
import {useNavigate, useNavigation} from "react-router-dom";
import ThemeColor from "./ThemeColor.jsx";
import PropTypes from 'prop-types';

function Start({ isLightOn, lightToggle }) {
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
    return (
        <>
            <main>
                <div className="theme-container">
                    <div className="container">
                        <ThemeColor isLightOn={isLightOn} lightToggle={lightToggle} />
                        <div className="front">
                            <div className='text-container'>
                                <h3 className={`text ${isLightOn ? 'theme-subject-dark' : 'block'}`}>Welcome to the </h3>
                                <h3 className={`bold-headline text ${isLightOn ? 'theme-subject-dark' : 'block'}`}>Frontend Quiz!</h3>
                                <p className={`bd-text ${isLightOn ? 'dark-bd-text' : 'block'}`}>Pick a subject to get started.</p>
                            </div>
                            <div className='subject-wrapper'>
                                <span className='html-style' onClick={NavigateToHtml}>
                                    <img className='html-background' src="/images/icon-html.svg" alt="html-icon"/>
                                    <h3>
                                        HTML
                                    </h3>
                                </span>
                                <span className='css-style' onClick={NavigateToCss}>
                                    <img className='css-background' src="/images/icon-css.svg" alt="css-icon"/>
                                    <h3>
                                        CSS
                                    </h3>
                                </span>
                                <span className='js-style' onClick={NavigateToJavaScript}>
                                     <img className='js-background' src="/images/icon-js.svg" alt="js-icon"/>
                                    <h3>
                                        JavaScript
                                    </h3>
                                </span>
                                <span className='access-style' onClick={NavigateToAccessibility}>
                                     <img className='access-background' src="../public/images/icon-accessibility.svg"
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
    isLightOn: PropTypes.bool.isRequired,  // `isLightOn` should be a boolean and is required
    lightToggle: PropTypes.func.isRequired,  // `lightToggle` should be a function and is required
};
export default Start
