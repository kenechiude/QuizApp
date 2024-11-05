export default function Progress({
  points,
  totalPoints,
  currentIndex,
  numQuestion,
}) {
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
