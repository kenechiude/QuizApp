export default function QuestionBtns({
  timeLeft,
  clickedAnswer,
  isAtEnd,
  dispatch,
}) {
  const minutes = Math.trunc(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="question-btn-div">
      <button className="btn-timer">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </button>
      {clickedAnswer && !isAtEnd && (
        <button
          className="btn btn-next"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      )}
      {isAtEnd && clickedAnswer && (
        <button className="btn" onClick={() => dispatch({ type: "finish" })}>
          Finish
        </button>
      )}
    </div>
  );
}
