import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/reset.scss'
import '../styles/score.scss'
import ThemeColor from "./ThemeColor.jsx";


function Score ({ quizData, isLightOn, lightToggle  }){
    const location = useLocation();
    const navigateBAckToQuiz = useNavigate()
    const { score, totalQuestions, quizTitle, quizIcon } = location.state || { score: 0, totalQuestions: 0 };
    const goBackToQuiz = () => {
        const route = quizTitle?.toLowerCase();
        navigateBAckToQuiz(`/${route}`);
    };

    const quizTitleData =  quizData?.quizzes.find(
        (item) => item.title === quizTitle && item.icon
    )
    const quizTitleText = quizTitleData?.title;
    const quizIconData = quizData?.icon;

    if (!quizData){
        return <div>loading...</div>;
    }
    return(
        <>
            <main>
                <div className="theme-container">
                    <div className="container">
                        <span className='accessibility-style theme-course-style'>
                            <div className="accessibility-img-wrapper theme-course-wrapper">
                                <img className='subject-background' src={quizIcon}
                                     alt={`${quizIconData} Icon`}/>
                               <h3 className={`subject-name ${isLightOn ? 'theme-subject-dark' : 'theme-subject-light'}`}>{quizTitleText}</h3>
                            </div>
                           <ThemeColor isLightOn={isLightOn} lightToggle={lightToggle}/>
                        </span>
                            <div className="score-container">
                            <div className="text-container">
                                <h3 className={` theme-static-text-score ${isLightOn ? 'headline-text-dark' : 'headline-text-light'}`}>Quiz completed</h3>
                                <h2 className={` theme-static-sub-text-score ${isLightOn ? 'sub-text-dark' : 'sub-text-light'}`}>You scored... </h2>
                            </div>
                            <div className="card-container">
                                <div className={`score-card ${isLightOn ? 'score-bg-dark' : 'score-bg-light'}`}>
                                    <div className="accessibility-img-wrapper">
                                        <img className='subject-background' src={quizIcon}
                                             alt={`${quizIcon} Icon`}/>
                                        <h3 className={`subject-name ${isLightOn ? 'theme-subject-dark' : 'theme-subject-light'}`}>{quizTitleText}</h3>
                                    </div>
                                    <div className="total-score">
                                        <h3 className={`score ${isLightOn ? 'score-dark' : 'score-light'}`}>{score}</h3>
                                        <p className={`total-question ${isLightOn? 'dark-total-question' : 'light-total-question'}`}>out of {totalQuestions}</p>
                                    </div>
                                </div>
                                <button className="play-again theme-button" onClick={goBackToQuiz}>
                                    play again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
Score.propTypes = {
    isLightOn: PropTypes.bool,
};
export default Score