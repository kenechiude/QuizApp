export default function QuestionBtns({
  timeLeft,
  clickedAnswer,
  isAtEnd,
  dispatch,
}) {
  return (
    <div className="question-btn-div">
      <button className="btn-timer">
        {Math.trunc(timeLeft / 60)}:{timeLeft % 60}
      </button>
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
