import "../ErrorMessage.css";

function ErrorMessage({
  titulo = "Sinal Perdido!",
  mensagem = "Não foi possível estabelecer comunicação com a nave."
}) {
  return (
    <div className="error-container">
      <div className="alien">👽</div>

      <h2>{titulo}</h2>

      <p>{mensagem}</p>

      <button
        className="btn btn-success mt-3"
        onClick={() => window.location.reload()}
      >
        🪐 Recalcular Rota
      </button>
    </div>
  );
}

export default ErrorMessage;