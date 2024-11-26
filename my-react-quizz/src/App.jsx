import React, { useState, useEffect } from 'react'
import './styles/reset.scss'
import './styles/theme.scss'
import './styles/start.scss'
// import {useNavigate, useNavigation} from "react-router-dom";
import Start from './Pages/StartMenu.jsx';
import ThemeBg from "./Pages/ThemeBgImage.jsx";
import ThemeColor from "./Pages/ThemeColor.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AccessibilityPage from "./Pages/AccessiblityPage.jsx";
import JavaScriptPage from "./Pages/JavaScriptPage.jsx";
import CssPage from "./Pages/CssPage.jsx";
import HtmlPage from "./Pages/HtmlPage.jsx";
import ScorePage from "./Pages/ScorePage.jsx";
import NotFoundPage from "./Pages/NotFoundPage.jsx";

function App() {
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

    return (
        <>
            <Routes>
                <Route path="/" element={<Start isLightOn={isLightOn} lightToggle={lightToggle}/>} />
                <Route path="/accessibility" element={<AccessibilityPage quizData={quizData} isLightOn={isLightOn} lightToggle={lightToggle}/>} />
                <Route path="/javascript" element={<JavaScriptPage quizData={quizData} isLightOn={isLightOn} lightToggle={lightToggle}/>} />
                <Route path="/css" element={<CssPage quizData={quizData} isLightOn={isLightOn} lightToggle={lightToggle}/>} />
                <Route path="/html" element={<HtmlPage quizData={quizData} isLightOn={isLightOn} lightToggle={lightToggle}/>} />
                <Route path="/results" element={<ScorePage quizData={quizData} isLightOn={isLightOn} lightToggle={lightToggle}/>} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    )
}

export default App
