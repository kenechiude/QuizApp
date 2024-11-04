export default function Question({ data, isAtEnd, clickedAnswer, dispatch }) {
  function checkClassName(difficulty) {
    switch (difficulty) {
      case "easy":
        return "green";
      case "medium":
        return "yellow";
      case "hard":
        return "red";
    }
  }
  const diffClassName = checkClassName(data.difficulty);
  const answers = [...data.incorrectAnswers, data.correctAnswer].sort();

  return (
    <div>
      <div className="que-info">
        <span className="category">{data.category.replaceAll("_", " ")}</span>
        <span className={diffClassName}>{data.difficulty}</span>
      </div>

      {/* TODO: REMOVE LATER */}
      <p>{data.correctAnswer}</p>

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
      {clickedAnswer && !isAtEnd && (
        <button
          className="btn btn-next"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      )}
      {isAtEnd && (
        <button className="btn" onClick={() => dispatch({ type: "finish" })}>
          Finish
        </button>
      )}
    </div>
  );
}
