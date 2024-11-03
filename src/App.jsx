import { useEffect, useReducer } from "react";
import Loader from "./components/Loader";
import Ready from "./components/Ready";
import Question from "./components/Question";
import Header from "./components/Header";

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
    case "error":
      return { ...state, status: "error" };
  }
}
const initialState = {
  currentIndex: 0,
  questionData: [],
  status: "loading",
};

export default function App() {
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://the-trivia-api.com/v2/questions");
        if (!res.ok) throw new Error("failed to fetch");

        const data = await res.json();

        dispatch({ type: "dataRecieved", payload: data });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
        console.error(err);
      }
    }

    getData();
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentIndex, questionData, status } = state;

  // console.log(currentIndex, questionData, status);
  return (
    <>
      <Header />
      <div className="container">
        {status === "loading" && <Loader />}
        {status === "ready" && <Ready dispatch={dispatch} />}
        {status === "start" && <Question data={questionData[currentIndex]} />}
      </div>
    </>
  );
}
