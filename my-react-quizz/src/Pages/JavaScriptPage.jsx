import React, {useEffect, useRef, useState} from 'react';
import '../styles/reset.scss'
import '../styles/theme.scss'
import {useNavigate} from "react-router-dom";
import ThemeColor from "./ThemeColor.jsx";
import PropTypes from 'prop-types';

function JavaScript({ quizData, isLightOn, lightToggle, containerRef, handleKeyDown }){
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [QuizCta, setQuizCta] = useState('submit answer');
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(null);
    const [Score, setScore] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');

    const navigateScore = useNavigate();
    const NavigateToScore = () =>{
        const finalScore = correctAnswers;
        navigateScore('/results', {
            state: {
                score: finalScore,
                totalQuestions: Questions.length,
                quizTitle:JavaScriptQuizTitle,
                quizIcon:JavaScriptQuizIcon } });
    }
    const JavaScriptData = quizData?.quizzes?.find(
        (item) => item.title === 'JavaScript' && item.icon
    );
    const JavaScriptQuizTitle = JavaScriptData?.title;
    const JavaScriptQuizIcon = JavaScriptData?.icon;
    const Questions = JavaScriptData?.questions || [];
    const currentQuestion = Questions[currentQuestionIndex]?.question;
    const QuizAnswer = Questions[currentQuestionIndex]?.answer;

    const isQuizEnd = currentQuestionIndex >= Questions.length - 1;
    const handleAnswerClick = (option) => {
        if(!hasSubmitted){
            setHasSubmitted(false);
            setSelectedAnswer(option);
        }else{
            setHasSubmitted(true);
        }
    };
    const handleSubmit = () => {
        const isQuizEnd = currentQuestionIndex === Questions.length - 1;
        if (isQuizEnd && hasSubmitted) {
            NavigateToScore();
            return;
        }
        // Check if an answer is selected
        if (!selectedAnswer) {
            setErrorMessage('Please select an option.');
            return;
        }
        // Clear error message if an answer is selected
        setErrorMessage('');

        if (!hasSubmitted) {
            setHasSubmitted(true);
            if (selectedAnswer === QuizAnswer) {
                setCorrectAnswers((prevCount) => {
                    const updatedCount = prevCount + 1;
                    setScore(updatedCount);
                    return updatedCount;
                });
            }else{
                setWrongAnswers((prevCount) => prevCount + 1);
            }
            setQuizCta('Next Question');
        } else {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedAnswer(null);
            setHasSubmitted(false);
            setQuizCta('Submit Answer');
            setErrorMessage('');
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'Enter':
                    if (selectedAnswer) {
                        handleSubmit();
                    }
                    break;
                default:
                    break;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    if (!quizData) {
        return <div>Loading...</div>;
    }

    return(
        <>
            <main>
                <div className="theme-container">
                    <div className="container" ref={containerRef}>
                        <span className='accessibility-style theme-course-style'>
                            <div className="accessibility-img-wrapper theme-course-wrapper">
                                <img className='subject-background' src={JavaScriptQuizIcon} alt="js-icon"/>
                                <h3 className={`subject-name ${isLightOn ? 'theme-subject-dark' : 'theme-subject-light'}`}>{JavaScriptQuizTitle}</h3>
                            </div>
                              <ThemeColor isLightOn={isLightOn} lightToggle={lightToggle} />
                        </span>
                        <div className="accessibility-container">
                            <div className="contents">
                                <div className="quizzes-questions">
                                    <div className="questions">
                                        <p className={`question-title ${isLightOn? 'question-title-dark' : 'question-title-light'}`}>Question {currentQuestionIndex + 1} of {Questions.length}</p>
                                        <h2 className={`question ${isLightOn? 'question-dark': 'question-light'}`}>{currentQuestion || "No question available"}</h2>
                                        {/* Progress Bar */}
                                        <div className="progress-bar">
                                            {Questions.map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`progress-segment ${index <= currentQuestionIndex ? 'active' : ''} ${isLightOn ? 'progress-segment-dark' : 'progress-segment-light'}`}
                                                >
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="quizess-choices" tabIndex={0}>
                                    {Questions[currentQuestionIndex]?.options && Questions[currentQuestionIndex].options.length > 0 ? (
                                        Questions[currentQuestionIndex]?.options.map((option, index) => (
                                            <button
                                                key={index}
                                                className={`cta-choices ${isLightOn ? 'cta-choice-bg-dark' : 'cta-choice-bg-light'}
                                                      ${selectedAnswer === option ? 'selected-choice' : ''} 
                                                      ${hasSubmitted && option === QuizAnswer ? 'correct-answer' : ''} 
                                                      ${hasSubmitted && selectedAnswer === option && selectedAnswer !== QuizAnswer ? 'incorrect-answer' : ''}`}
                                                onClick={() => handleAnswerClick(option)} tabIndex={0}
                                            >
                                                <div className="options-container">
                                                    <p className={`cta-letters ${selectedAnswer === option ? 'selected-letter' : 'not-selected'}`}>{String.fromCharCode(65 + index)}</p>
                                                    <h3 className={`options ${isLightOn ? 'options-dark' : 'option-light'}`}>{option}</h3>
                                                </div>
                                                {hasSubmitted && option === QuizAnswer && (
                                                    <img className='correct-icon' src="/images/icon-correct.svg"
                                                         alt="correct-icon"/>
                                                )}
                                                {hasSubmitted && selectedAnswer === option && selectedAnswer !== QuizAnswer && (
                                                    <img className='incorrect-icon' src="/images/icon-error.svg"
                                                         alt="error-icon"/>
                                                )}


                                            </button>
                                        ))
                                    ) : (
                                        <p>No options available for this question</p>
                                    )}
                                    <button className="submit-btn theme-button" onClick={handleSubmit} tabIndex={0}>
                                        {hasSubmitted && isQuizEnd ? 'View Score' : QuizCta}
                                    </button>
                                    {errorMessage && (
                                        <div className="error-message">
                                            <img className="error-icon" src="/images/icon-error.svg" alt="error-icon"/>
                                            <p>{errorMessage}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
JavaScript.propTypes = {
    isLightOn: PropTypes.bool.isRequired,
    lightToggle: PropTypes.func.isRequired,
};
export default JavaScript