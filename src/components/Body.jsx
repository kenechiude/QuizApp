import { useQuestion } from "../QuestionContext";
import Loader from "./Loader";
import Ready from "./Ready";
import Question from "./Question";
import Error from "./Error";
import Progress from "./Progress";
import Finish from "./Finish";

export default function Body() {
  const { status } = useQuestion();

  return (
    <div className="container">
      {status === "loading" && <Loader />}
      {status === "ready" && <Ready dispatch={dispatch} />}
      {status === "finished" && <Finish />}
      {status === "start" && (
        <>
          <Progress />
          <Question />
        </>
      )}
      {status === "error" && <Error />}
    </div>
  );
}
