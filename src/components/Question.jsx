import { useEffect } from "react";
import QuestionInfo from "./QuestionInfo";
import Answers from "../Answers";
import QuestionBtns from "./QuestionBtns";

export default function Question({
  data,
  isAtEnd,
  clickedAnswer,
  dispatch,
  timeLeft,
}) {
  if (timeLeft === 0) dispatch({ type: "finish" });

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "reduceTimer" });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <QuestionInfo data={data} />

      {/* TODO: REMOVE LATER */}
      <p>{data.correctAnswer}</p>

      <Answers data={data} dispatch={dispatch} clickedAnswer={clickedAnswer} />
      <QuestionBtns
        timeLeft={timeLeft}
        clickedAnswer={clickedAnswer}
        isAtEnd={isAtEnd}
        dispatch={dispatch}
      />
    </div>
  );
}
