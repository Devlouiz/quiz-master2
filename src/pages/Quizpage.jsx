//import { data } from 'autoprefixer'
import React from 'react'
import { useState,useEffect } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useLocation } from 'react-router-dom'

//const BASE_URL = import.meta.env.VITE_APIURL
const Quizpage = () => {
    const [quizzes, setQuizzes] = useState([])
    const [userAnswers, setUserAnswers] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const location = useLocation()

    useEffect(()=>{
        const FetchData = async () =>{
            setIsLoading(true)
            try {
                const req = await fetch(`https://opentdb.com/api.php?amount=5&difficulty=medium`)
                const quizdata = await req.json()
                const Quizdat = await quizdata.results
                //console.log(Quizdat)
                const shuffledQuizdat = Quizdat.map((quiz) => ({
                    ...quiz,
                    answers: Shufflefun([...quiz.incorrect_answers, quiz.correct_answer]),
                }));
                //console.log(shuffledQuizdat)
                setQuizzes(shuffledQuizdat)
            } catch (e) {
                setError(e)
            }finally{
                setIsLoading(false)
            }
        }
        if (location.state?.fetchData) {
            return () => FetchData()
            //FetchData();
        }
    },[location.state])
    if (isLoading) {
        return (<div className='w-screen
        flex items-center justify-center h-full'>
            <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#845ADD"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
        </div>)
            
    }
    if (error) {
        return <p className='z-50'>Something went wrong Please try again.</p>
    }

    // function to handle the answer click
    const handleAnswerClick  = (quizIndex,answer) =>{
        const isCorrect = answer === quizzes[quizIndex].correct_answer;
        setUserAnswers((prevAnswer) => ({...prevAnswer,[quizIndex]: {answer,isCorrect}}))
    }

    // function to shuffle array 
    const Shufflefun = (array) => {
        const ShuffleArray = [...array];
        for (let i = ShuffleArray.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [ShuffleArray[i], ShuffleArray[j]] = [ShuffleArray[j], ShuffleArray[i]]
        }
        return ShuffleArray
    }

    // function to rephresh the page/quiz

    const handleRetryQuiz = () => {
        //setUserAnswers({});
        window.location.reload();
        setUserAnswers({});
    };
    
  return (
    <div className='absolute inset-0 h-min w-full 
    bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]
    flex flex-col place-items-center justify-center gap-10 text-center
    '>
        <h2 className='font-sans font-extrabold text-4xl
        bg-gradient-to-r from-indigo-700 to-indigo-400 
        inline-block text-transparent bg-clip-text'>Learn More</h2>
        <div className='w-3/4 h-min border-2 bg-white-transparent
        text-gray-text rounded-2xl flex flex-col justify-around px-10 py-16 text-start
        font-sans font-semibold mb-10'>
            {quizzes.map((quiz,quizIndex) =>(
                <div key={quizIndex}>
                    <h3 dangerouslySetInnerHTML={{__html: `${quiz.question}`}}
                    className='mt-5'></h3>
                    <div>
                        {quiz.answers.map((answer,answerIndex) =>(
                            <button 
                            key={answerIndex} 
                            onClick={() => {handleAnswerClick(quizIndex,answer)}}
                            style={{
                                backgroundColor:
                                userAnswers[quizIndex] &&
                                userAnswers[quizIndex].answer === answer &&
                                userAnswers[quizIndex].isCorrect
                                ? '#C9FACB' // correct answer selected
                                : userAnswers[quizIndex] &&
                                  userAnswers[quizIndex].answer === answer &&
                                  !userAnswers[quizIndex].isCorrect
                                ? '#FAC9C9' // incorrect answer selected
                                : userAnswers[quizIndex] &&
                                  !userAnswers[quizIndex].isCorrect &&
                                   answer === quiz.correct_answer
                                ? '#C9FACB' // correct answer for an incorrect choice
                                : 'white', // default color
                            }}
                            className='mx-5 m-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
                            text-black-text font-medium'
                            disabled={userAnswers[quizIndex] !== undefined} // disable buttons after user has answered
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                    <hr className='divide-solid'/>
                </div>
            ))}
            <div className='flex flex-col items-center my-10'>
                <button onClick={handleRetryQuiz}
                className='shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]
                w-60'>Retry Quiz</button>
            </div>
        </div>
    </div>
  )
}

export default Quizpage