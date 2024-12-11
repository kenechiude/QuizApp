import { useQuestion } from "../QuestionContext";
import { useEffect } from "react";
import QuestionInfo from "./QuestionInfo";
import Answers from "./Answers";
import QuestionBtns from "./QuestionBtns";

export default function Question() {
  const { data, isAtEnd, clickedAnswer, dispatch, timeLeft } = useQuestion();
  if (timeLeft === 0) dispatch({ type: "finish" });

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "reduceTimer" });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <>
      <QuestionInfo data={data} dispatch={dispatch} />
      <Answers data={data} dispatch={dispatch} clickedAnswer={clickedAnswer} />
      <QuestionBtns
        timeLeft={timeLeft}
        clickedAnswer={clickedAnswer}
        isAtEnd={isAtEnd}
        dispatch={dispatch}
      />
    </>
  );
}
