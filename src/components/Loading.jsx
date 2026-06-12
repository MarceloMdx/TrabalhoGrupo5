import "../Loading.css";

function Loading() {
  return (
    <div className="loading-container">

      <div className="stars"></div>

      <div className="ufo">
        🛸
      </div>

      <div className="beam"></div>

      <p className="loading-text">
        Transmitindo dados interestelares...
      </p>

    </div>
  );
}

export default Loading;