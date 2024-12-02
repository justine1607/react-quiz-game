import React, { useState } from 'react';
import '../styles/reset.scss'
import '../styles/theme.scss'
import '../styles/start.scss'
import {useNavigate} from "react-router-dom";
import ThemeColor from "./ThemeColor.jsx";
const QuizApp = ({ quizData, isLightOn, lightToggle, containerRef, handleKeyDown }) => {
    const navigate = useNavigate()
    const [currentQ, setCurrentQIndex] = useState(0)
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);
    if (!quizData) {
        return <div>No quizzes available</div>;
    }

    const handleSubjectClick = (quizIndex) => {
        setActiveQuestionIndex(quizIndex);
        setCurrentQIndex(0);
        navigate(`/quiz/${quizIndex}`, {
            state:{ quizData, quizIndex}
        });
    };


    return (
        <>
            <div className="theme-container">
                <div className="container" ref={containerRef}>
                    <ThemeColor isLightOn={isLightOn} lightToggle={lightToggle} />
                    <div className="flex front">
                        <div className="text-container">
                            <h3 className={`text ${isLightOn ? 'header-dark' : 'block'}`}>Welcome to the </h3>
                            <h3 className={`bold-headline text ${isLightOn ? 'headline-dark' : 'block'}`}>Frontend Quiz!</h3>
                            <p className={`bd-text ${isLightOn ? 'dark-bd-text' : 'block'}`}>Pick a subject to get started.</p>
                        </div>
                        <div className="subject-wrapper">
                            {quizData.quizzes.map((item, quizIndex) => (
                                <div className="subject-title" key={quizIndex}>
                                    <button className="" onClick={() => handleSubjectClick(quizIndex)}>
                                        <img src={item.icon} alt={`${item.title} icon`} />
                                        <h3>{item.title}</h3>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
        ;
};

export default QuizApp;
