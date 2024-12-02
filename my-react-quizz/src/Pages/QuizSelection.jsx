function QuizSelection ({quizData}){
    console.log('quizes data', quizData)
    if (!quizData) {
        return <div>No quizzes available</div>;
    }
    return(
        <>
            <div>hello</div>
            <div>
                {quizData.quizzes.map((quiz, index) => (
                    <div key={index}>
                        {/*<h3>{quiz.title}</h3>*/}
                        {/*<img src={quiz.icon} alt={`${quiz.title} icon`} />*/}
                        {quiz.questions.map((question, qIndex) => (
                            <div key={qIndex}>
                        {/*        <p>{question.question}</p>*/}
                                <ul>
                                    {question.options.map((option, oIndex) => (
                                        <li key={oIndex}>{option}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}

export default QuizSelection