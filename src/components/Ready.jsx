import { useQuestion } from "../QuestionContext";

export default function Ready() {
  const { dispatch } = useQuestion();

  return (
    <div>
      <h2>Write message LATER!!!</h2>
      <button className="btn" onClick={() => dispatch({ type: "start" })}>
        Start
      </button>
    </div>
  );
}
