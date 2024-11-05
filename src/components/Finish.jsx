export default function Finish({ points, totalPoints, numQuestion, dispatch }) {
  const percentage = (points / totalPoints) * 100;
  return (
    <>
      <div className="finish-display">
        <span>
          {points}/{totalPoints}({percentage}%) Points out of {numQuestion}{" "}
          Questions
        </span>
      </div>
      <button className="btn" onClick={() => dispatch({ type: "retry" })}>
        Start Again
      </button>
    </>
  );
}
