import { useEffect, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questionData: action.payload,
        status: "ready",
        error: false,
      };
    case "error":
      return { ...state, error: true };
  }
}
const initialState = {
  currentIndex: 0,
  questionData: [],
  status: "loading",
  error: null,
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
  const { currentIndex, questionData, status, error } = state;

  console.log(currentIndex, questionData, status, error);
  return (
    <div>
      <h1>QuizApp</h1>
    </div>
  );
}
