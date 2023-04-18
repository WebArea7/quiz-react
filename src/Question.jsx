import {useState} from 'react'

export default function Question({currentQuestion, questions, question, index, handleNextQuestion}) {
  const [loading, setLoading] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState(false)

  function handleQuestion(e) {
    e.preventDefault()
    setLoading(true)
    const indexQuestion = currentQuestion - 1
    const {correct_answer} = questions[indexQuestion]
    if (e.target.value === correct_answer) {
      setCorrectAnswer(true)
    }

    setTimeout(() => {
      handleNextQuestion(e)
      setLoading(false)
    }, 1000);
  }

  return (
    <div className={(currentQuestion !== index + 1) ? "hidden" : "mt-4 text-center"}>
      <span className="text-neutral-600 text-xs font-medium">Question {index + 1} of {questions.length}</span>
      <p className="mt-2 text-2xl font-bold">{question}</p>
      <div className="mt-5">
        <button
          type="button"
          onClick={handleQuestion}
          value="True"
          disabled={loading}
          className="inline-block rounded bg-green-500 px-6 pb-2 pt-2.5 mr-4 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-green-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]">
          Yes
        </button>
        <button
          type="button"
          value="False"
          disabled={loading}
          onClick={handleQuestion}
          className="inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-red-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]">
          No
        </button>
      </div>

      {correctAnswer && loading && <p className="mt-4 text-green-500">Correct!</p>}
      {!correctAnswer && loading && <p className="mt-4 text-red-500">Wrong!</p>}
    </div>
  )
}