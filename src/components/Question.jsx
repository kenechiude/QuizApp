export default function Question({ data }) {
  console.log(data);
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
  // console.log(answers);

  return (
    <div>
      <div className="que-info">
        <span className="category">{data.category.replaceAll("_", " ")}</span>
        <span className={diffClassName}>{data.difficulty}</span>
      </div>
      <h3>{data.question.text}</h3>
      <div className="answers">
        {answers.map((ans) => (
          <button className="ans-btn" key={ans}>
            {ans}
          </button>
        ))}
      </div>
    </div>
  );
}
