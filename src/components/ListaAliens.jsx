import "./ListaAliens.css";

function ListaAliens({ aliens, onEditar, onDeletar, carregando }) {
  if (carregando) {
    return <div className="loading-message">Carregando aliens...</div>;
  }

  if (!aliens || aliens.length === 0) {
    return <div className="empty-message">Nenhum alien registrado ainda.</div>;
  }

  return (
    <div className="aliens-list">
    {aliens.map((alien) => (
        <div key={alien.id} className="alien-card">
        <div className="alien-header">
            <h3>{alien.nome}</h3>
            <span className={`periculosidade-badge nivel-${Math.ceil(alien.periculosidade / 2)}`}>
            {alien.periculosidade}/10
            </span>
        </div>

        <div className="alien-info">
            <p>
            <strong>Espécie:</strong> {alien.especie}
            </p>
            <p>
            <strong>Planeta:</strong> {alien.planeta}
            </p>
            <p>
            <strong>Descrição:</strong> {alien.descricao}
            </p>
        </div>

        <div className="alien-actions">
            <button
            className="btn btn-sm btn-warning"
            onClick={() => onEditar(alien)}
            title="Editar alien"
            >
            Editar
            </button>
            <button
            className="btn btn-sm btn-danger"
            onClick={() => {
                if (
                window.confirm(
                    `Tem certeza que deseja deletar ${alien.nome}?`
                )
                ) {
                onDeletar(alien.id);
                }
            }}
            title="Deletar alien"
            >
            Deletar
            </button>
        </div>
        </div>
    ))}
    </div>
);
}

export default ListaAliens;
