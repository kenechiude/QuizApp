import { useQuestion } from "../QuestionContext";

export default function Finish() {
  const { points, totalPoints, numQuestion, dispatch } = useQuestion();

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
