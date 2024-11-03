export default function Ready({ dispatch }) {
  return (
    <div>
      <h2>Write message LATER!!!</h2>
      <button className="btn" onClick={() => dispatch({ type: "start" })}>
        Start
      </button>
    </div>
  );
}
