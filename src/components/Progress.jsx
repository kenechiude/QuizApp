import { useQuestion } from "../QuestionContext";

export default function Progress() {
  const { points, totalPoints, currentIndex, numQuestion } = useQuestion();

  return (
    <>
      <div className="progressDetails">
        <span>
          {points}/{totalPoints} Points
        </span>
        <span>
          Question {currentIndex + 1}/{numQuestion}
        </span>
      </div>
      <progress value={points} max={totalPoints} />
    </>
  );
}
