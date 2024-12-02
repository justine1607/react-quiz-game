import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import '../styles/reset.scss'
import '../styles/theme.scss'
import ThemeColor from "./ThemeColor.jsx";

function QuestionAnswer ({isLightOn, lightToggle, containerRef, handleKeyDown }){
    const location = useLocation();
    const { quizData, quizIndex } = location.state;
    const [QuizCta, setQuizCta] = useState('submit answer');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(null);
    const [Score, setScore] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const quiz = quizData.quizzes[quizIndex];
    const questionLenght = quiz.questions.length
    const QuizAnswer = quiz.questions[currentQuestionIndex]?.answer;
    const isQuizEnd = currentQuestionIndex >= quiz.questions.length - 1;

    const navigateScore = useNavigate();
    const NavigateToScore = () =>{
        const finalScore = correctAnswers;
        navigateScore('/results', {
            state: {
                score: finalScore,
                totalQuestions: quiz.questions.length,
                quizTitle:quiz.title,
                quizIcon:quiz.icon } });
    }
    const handleAnswerClick = (option) => {
        setSelectedAnswer(option);
    };

    const handleNextQuestion = () =>{
        const isQuizEnd = currentQuestionIndex === quiz.questions.length - 1;

        if (isQuizEnd && hasSubmitted) {
            NavigateToScore();
            return;
        }

        if (!selectedAnswer) {
            setErrorMessage('Please select an option.');
            return;
        }

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
    }
    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    return (
        <div className="theme-container">
            <div className="container" ref={containerRef}>
                 <span className='accessibility-style theme-course-style'>
                    <div className="subject-style theme-course-wrapper">
                        <img className='subject-background' src={quiz.icon} alt={quiz.title}/>
                        <h3 className={`subject-name ${isLightOn ? 'theme-subject-dark' : 'theme-subject-light'}`}>{quiz.title}</h3>
                    </div>
                      <ThemeColor isLightOn={isLightOn} lightToggle={lightToggle}/>
                 </span>
                <div className="contents">
                    <div className="quizzes-questions">
                        <div className="questions">
                            <p className={`question-title ${isLightOn ? 'question-title-dark' : 'question-title-light'}`}>Question{currentQuestionIndex + 1} of {questionLenght}</p>
                            <h2 className={`question ${isLightOn ? 'question-dark' : 'question-light'}`}>{quiz.questions[currentQuestionIndex].question}</h2>
                            <div className="progress-bar">
                                {quiz.questions.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`progress-segment ${index <= currentQuestionIndex ? 'active' : ''} `}
                                    >
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="quizess-choices">
                        {quiz.questions[currentQuestionIndex]?.options?.length > 0 ? (
                            quiz.questions[currentQuestionIndex].options.map((option, optionIndex) => (
                                <button
                                    key={optionIndex}
                                    className={`cta-choices ${isLightOn ? 'cta-choice-bg-dark' : 'cta-choice-bg-light'}
                                    ${selectedAnswer === option ? 'selected-choice' : ''}
                                    ${hasSubmitted && option === QuizAnswer ? 'correct-answer' : ''}
                                    ${hasSubmitted && selectedAnswer === option && selectedAnswer !== QuizAnswer ? 'incorrect-answer' : ''}`}
                                    onClick={() => handleAnswerClick(option)}
                                >
                                    <div className="options-container">
                                        <p className={`cta-letters ${selectedAnswer === option ? 'selected-letter' : 'not-selected'}`}>
                                            {String.fromCharCode(65 + optionIndex)}
                                        </p>
                                        <h3 className={`options ${isLightOn ? 'options-dark' : 'option-light'}`}>{option}</h3>
                                    </div>
                                    {hasSubmitted && option === QuizAnswer && (
                                        <img
                                            className="correct-icon"
                                            src="/images/icon-correct.svg"
                                            alt="correct-icon"
                                        />
                                    )}
                                </button>
                            ))
                        ) : (
                            <p>No options available for this question</p>
                        )}

                        <button className="submit-btn theme-button" onClick={handleNextQuestion}>
                            {hasSubmitted && isQuizEnd ? 'View Score' : QuizCta}
                        </button>

                        {errorMessage && (
                            <div className="error-message">
                                <img className="error-icon" src="/images/icon-error.svg" alt="error-icon" />
                                <p>{errorMessage}</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default QuestionAnswer