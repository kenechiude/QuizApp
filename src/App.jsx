import { useEffect, useReducer } from "react";
import Loader from "./components/Loader";
import Ready from "./components/Ready";
import Question from "./components/Question";
import Header from "./components/Header";
import Error from "./components/Error";

const POINT_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questionData: action.payload,
        status: "ready",
      };
    case "start":
      return { ...state, status: "start" };
    case "retry":
      return { ...state, retry: state.retry + 1, status: "loading" };
    case "answered":
      return {
        ...state,
        points:
          action.payload ===
          state.questionData[state.currentIndex].correctAnswer
            ? state.points + POINT_PER_QUESTION
            : state.points,
        clickedAnswer: action.payload,
      };
    case "nextQuestion":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        clickedAnswer: null,
      };
    case "finish":
      return { ...state, status: "finished" };
    case "error":
      return { ...state, status: "error", errorMsg: action.payload };
  }
}

const initialState = {
  currentIndex: 0,
  questionData: [],
  status: "loading",
  clickedAnswer: null,
  retry: 0,
  points: 0,
  errorMsg: null,
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    currentIndex,
    questionData,
    status,
    clickedAnswer,
    retry,
    points,
    errorMsg,
  } = state;

  // console.log(points);

  const numQuestion = questionData.length;
  // console.log(numQuestion);
  const isAtEnd = numQuestion === currentIndex + 1;

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://the-trivia-api.com/v2/questions");
        if (!res.ok) throw new Error("failed to fetch");

        const data = await res.json();

        dispatch({ type: "dataRecieved", payload: data });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
        // console.error(err);
      }
    }

    getData();
  }, [retry]);

  return (
    <>
      <Header />
      <div className="container">
        {status === "loading" && <Loader />}
        {status === "ready" && <Ready dispatch={dispatch} />}
        {status === "start" && (
          <Question
            data={questionData[currentIndex]}
            isAtEnd={isAtEnd}
            clickedAnswer={clickedAnswer}
            dispatch={dispatch}
          />
        )}
        {status === "error" && (
          <Error errorMsg={errorMsg} dispatch={dispatch} />
        )}
      </div>
    </>
  );
}
