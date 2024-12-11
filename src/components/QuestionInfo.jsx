import { useQuestion } from "../QuestionContext";

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

export default function QuestionInfo() {
  const { data, dispatch } = useQuestion();
  const diffClassName = checkClassName(data.difficulty);

  return (
    <div className="que-info-div">
      <div className="que-info">
        <span className="category">{data.category.replaceAll("_", " ")}</span>
        <span className={diffClassName}>{data.difficulty}</span>
      </div>
      <button
        className="btn-finish-now"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish Now!
      </button>
    </div>
  );
}
