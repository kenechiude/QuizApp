import { useQuestion } from "../QuestionContext";

export default function Error() {
  const { errorMsg, dispatch } = useQuestion();

  return (
    <div>
      <h3>{errorMsg || "Unexpected Error occured"}</h3>
      <button className="btn" onClick={() => dispatch({ type: "retry" })}>
        Retry
      </button>
    </div>
  );
}
