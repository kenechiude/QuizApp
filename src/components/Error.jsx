export default function Error({ errorMsg, dispatch }) {
  return (
    <div>
      <h3>{errorMsg || "Unexpected Error occured"}</h3>
      <button className="btn" onClick={() => dispatch({ type: "retry" })}>
        Retry
      </button>
    </div>
  );
}
