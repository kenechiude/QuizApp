import { useQuestion } from "../QuestionContext";

export default function Answers() {
  const { data, clickedAnswer, dispatch } = useQuestion();
  const answers = [...data.incorrectAnswers, data.correctAnswer].sort();

  return (
    <>
      <h3>{data.question.text}</h3>
      <div className="answers">
        {answers.map((ans) => (
          <button
            disabled={clickedAnswer}
            onClick={() => dispatch({ type: "answered", payload: ans })}
            className={`${
              data.correctAnswer === ans && clickedAnswer && "correctAns"
            } ans-btn ${clickedAnswer === ans && "active"} ${
              !clickedAnswer && "hover"
            }`}
            key={ans}
          >
            {ans}
          </button>
        ))}
      </div>
    </>
  );
}
