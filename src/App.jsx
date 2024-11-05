import { useEffect, useReducer } from "react";
import Loader from "./components/Loader";
import Ready from "./components/Ready";
import Question from "./components/Question";
import Header from "./components/Header";
import Error from "./components/Error";
import Progress from "./components/Progress";
import Finish from "./components/Finish";

const POINT_AND_TIME_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questionData: action.payload,
        status: "ready",
      };
    case "start":
      return {
        ...state,
        status: "start",
        timeLeft: state.questionData.length * POINT_AND_TIME_PER_QUESTION,
      };
    case "retry":
      return {
        ...state,
        retry: state.retry + 1,
        status: "loading",
        points: 0,
        currentIndex: 0,
        clickedAnswer: null,
      };
    case "answered":
      // TODO!: ALLOCATE DIFFERENT POINTS DEPENDING ON THE QUE DIFFICULTY

      return {
        ...state,
        points:
          action.payload ===
          state.questionData[state.currentIndex].correctAnswer
            ? state.points + POINT_AND_TIME_PER_QUESTION
            : state.points,
        clickedAnswer: action.payload,
      };
    case "nextQuestion":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        clickedAnswer: null,
      };
    case "reduceTimer":
      return { ...state, timeLeft: state.timeLeft - 1 };
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
  timeLeft: 0,
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
    timeLeft,
  } = state;

  const numQuestion = questionData.length;

  // TODO!: ALLOCATE DIFFERENT POINTS DEPENDING ON THE QUE DIFFICULTY
  const totalPoints = numQuestion * POINT_AND_TIME_PER_QUESTION;
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
        {status === "finished" && (
          <Finish
            points={points}
            totalPoints={totalPoints}
            numQuestion={numQuestion}
            dispatch={dispatch}
          />
        )}
        {status === "start" && (
          <>
            <Progress
              points={points}
              totalPoints={totalPoints}
              currentIndex={currentIndex}
              numQuestion={numQuestion}
            />
            <Question
              data={questionData[currentIndex]}
              isAtEnd={isAtEnd}
              clickedAnswer={clickedAnswer}
              dispatch={dispatch}
              timeLeft={timeLeft}
            />
          </>
        )}
        {status === "error" && (
          <Error errorMsg={errorMsg} dispatch={dispatch} />
        )}
      </div>
    </>
  );
}
