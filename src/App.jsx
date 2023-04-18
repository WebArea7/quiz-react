import {useState} from 'react'
import axios from "axios";

function App() {
  const API_URL = 'https://opentdb.com/api.php'
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [score, setScore] = useState(0)

  const handleQuestions = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${API_URL}?amount=5&type=boolean`)
      let data = response.data.results
      data.map((question) => {
        question.question = question.question.replace(/&quot;/g, '"')
        question.question = question.question.replace(/&#039;/g, "'")
        question.question = question.question.replace(/&amp;/g, '&')
        question.question = question.question.replace(/&ldquo;/g, '“')
        question.question = question.question.replace(/&rdquo;/g, '”')
        question.question = question.question.replace(/&rsquo;/g, '’')
        question.question = question.question.replace(/&hellip;/g, '…')
        question.question = question.question.replace(/&ndash;/g, '–')
        question.question = question.question.replace(/&mdash;/g, '—')
      })
      setQuestions(data)
      setCurrentQuestion(1)
      setScore(0)
    } catch (e) {
      setError(e)
    }

    setLoading(false)
  }

  function handleNextQuestion(e) {
    e.preventDefault()
    const indexQuestion = currentQuestion - 1
    const {correct_answer} = questions[indexQuestion]
    if (e.target.value === correct_answer) {
      setScore(score + 1)
    }
    setCurrentQuestion(currentQuestion + 1)
  }

  return (
    <div className="quiz-app mt-7">
      <h1 className="text-4xl font-bold text-center">Quiz App</h1>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={handleQuestions}
          className="inline-block rounded bg-neutral-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
          Start Quiz
        </button>
      </div>

      {loading && <p className="mt-7 text-center">Loading...</p>}
      {error && <p className="mt-7 text-center">{error.message}</p>}

      {!loading && !error && questions.length > 0 && (
        <div className="mt-7 w-10/12 mx-auto">
          {currentQuestion <= questions.length && (
            <>
              <div className="w-full bg-neutral-600">
                <div
                  className="bg-green-500 p-0.5 text-center transition-all	 text-xs font-medium leading-none text-white uppercase"
                  style={{width: currentQuestion / questions.length * 100 + "%"}}>
                  {currentQuestion} / {questions.length}
                </div>
              </div>

              {questions.map(({question}, index) => {
                return (
                  <div key={index} className={(currentQuestion !== index + 1) ? "hidden" : "mt-4 text-center"}>
                    <span
                      className="text-neutral-600 text-xs font-medium">Question {index + 1} of {questions.length}</span>
                    <p className="mt-2 text-2xl font-bold">{question}</p>

                    <div className="mt-5">
                      <button
                        type="button"
                        onClick={handleNextQuestion}
                        value="True"
                        className="inline-block rounded bg-green-500 px-6 pb-2 pt-2.5 mr-4 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]">
                        Yes
                      </button>
                      <button
                        type="button"
                        value="False"
                        onClick={handleNextQuestion}
                        className="inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-red-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]">
                        No
                      </button>
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </div>
      )}

      {!loading && !error && questions.length > 0 && currentQuestion > questions.length && (
        <div className="mt-7 text-center">
          <p className="text-2xl font-bold">You scored {score} out of {questions.length}</p>
        </div>
      )}
    </div>
  )
}

export default App
