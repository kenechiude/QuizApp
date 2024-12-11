import { ContextProvider, useQuestion } from "./QuestionContext";
import Header from "./components/Header";
import Body from "./components/Body";

export default function App() {
  return (
    <ContextProvider>
      <Header />
      <Body />
    </ContextProvider>
  );
}
