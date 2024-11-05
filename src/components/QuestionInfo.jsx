export default function QuestionInfo({ data }) {
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

  return (
    <div className="que-info">
      <span className="category">{data.category.replaceAll("_", " ")}</span>
      <span className={diffClassName}>{data.difficulty}</span>
    </div>
  );
}
