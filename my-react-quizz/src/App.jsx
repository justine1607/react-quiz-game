import React, {useState, useEffect, useRef} from 'react'
import './styles/reset.scss'
import './styles/theme.scss'
import './styles/start.scss';
import QuizBlock from './Pages/Quiz-block.jsx';
import QuestionAnswerPage from './Pages/Question-AnswerPage.jsx';
import {Route, Routes, useNavigate} from "react-router-dom";
import ScorePage from "./Pages/ScorePage.jsx";
import NotFoundPage from "./Pages/NotFoundPage.jsx";

function App() {
    const containerRef = useRef(null);
    const navigate = useNavigate();
    const [isLightOn, setIsLightOn] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const lightToggle = () => {
        setIsLightOn((prev) => !prev);
    };
    useEffect(() => {
        document.body.style.background = isLightOn ? 'var(--darknavy)' : 'var(--lightgrey)';
    }, [isLightOn]);

    useEffect(() => {
        fetch('/data.json')
            .then((response) => response.json())
            .then((data) => setQuizData(data))
            .catch((error) => console.error('Error fetching quiz data:', error));
    }, []);

    const handleKeyDown = (event) => {
        const focusableElements = containerRef.current.querySelectorAll('button, a, input, select, textarea, [contenteditable], [tabindex]:not([tabindex="-1"])');
        const focusableArray = Array.from(focusableElements);
        const currentIndex = focusableArray.indexOf(document.activeElement);

        switch (event.key) {
            case 'ArrowDown':
                if (currentIndex < focusableArray.length - 1) {
                    focusableArray[currentIndex + 1].focus();
                } else {
                    focusableArray[0].focus(); // Loop back to the first element
                }
                break;
            case 'ArrowUp':
                if (currentIndex > 0) {
                    focusableArray[currentIndex - 1].focus();
                } else {
                    focusableArray[focusableArray.length - 1].focus(); // Loop back to the last element
                }
                break;
            case 'Tab':
                event.preventDefault(); // Prevent default tab behavior
                if (event.shiftKey) {
                    // Shift + Tab
                    if (currentIndex > 0) {
                        focusableArray[currentIndex - 1].focus();
                    } else {
                        focusableArray[focusableArray.length - 1].focus(); // Loop to the last element
                    }
                } else {
                    // Tab
                    if (currentIndex < focusableArray.length - 1) {
                        focusableArray[currentIndex + 1].focus();
                    } else {
                        focusableArray[0].focus(); // Loop back to the first element
                    }
                }
                break;
            case 'Backspace':
                navigate('/'); // Navigate back to the home route
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <>
            <Routes>

                <Route path="/" element= { <QuizBlock containerRef={containerRef} handleKeyDown={handleKeyDown} quizData={quizData} isLightOn={isLightOn} lightToggle={lightToggle}/> } />
                <Route path="/quiz/:quizIndex" element= {<QuestionAnswerPage containerRef={containerRef} handleKeyDown={handleKeyDown} isLightOn={isLightOn} lightToggle={lightToggle}/> } />
                <Route path="/results/" element={<ScorePage containerRef={containerRef} handleKeyDown={handleKeyDown} isLightOn={isLightOn} lightToggle={lightToggle}/>} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    )
}

export default App
