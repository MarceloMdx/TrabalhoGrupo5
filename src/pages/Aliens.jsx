import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { aliensService } from "../services/aliensService";
import FormAlien from "../components/FormAlien";
import ListaAliens from "../components/ListaAliens";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import "./Aliens.css";

function Aliens() {
const { token } = useAuth();
const [aliens, setAliens] = useState([]);
const [carregando, setCarregando] = useState(true);
const [erro, setErro] = useState(null);
const [mostrarFormulario, setMostrarFormulario] = useState(false);
const [alienEditando, setAlienEditando] = useState(null);
const [mensagemSucesso, setMensagemSucesso] = useState("");
const [formAlien, setFormAlien] = useState({
    nome: "",
    especie: "",
    planeta: "",
    periculosidade: 1,
    descricao: "",
});

useEffect(() => {
    carregarAliens();
}, []);

async function carregarAliens() {
    try {
    setCarregando(true);
    setErro(null);
    const dados = await aliensService.listarAliens(token);
    setAliens(Array.isArray(dados) ? dados : dados.data || []);
    } catch (error) {
    console.error("Erro ao carregar aliens:", error);
    setErro("Não conseguimos carregar os aliens. Tente novamente.");
    } finally {
    setCarregando(false);
    }
}

function abrirFormularioCadastro() {
    setAlienEditando(null);
    setFormAlien({
    nome: "",
    especie: "",
    planeta: "",
    periculosidade: 1,
    descricao: "",
    });
    setMostrarFormulario(true);
}

function abrirFormularioEdicao(alien) {
    setAlienEditando(alien);
    setFormAlien({
    nome: alien.nome,
    especie: alien.especie,
    planeta: alien.planeta,
    periculosidade: alien.periculosidade,
    descricao: alien.descricao,
    });
    setMostrarFormulario(true);
}

function fecharFormulario() {
    setMostrarFormulario(false);
    setAlienEditando(null);
    setFormAlien({
    nome: "",
    especie: "",
    planeta: "",
    periculosidade: 1,
    descricao: "",
    });
}

async function cadastrarOuEditarAlien(event) {
    event.preventDefault();

    try {
    setCarregando(true);

    if (alienEditando) {
        await aliensService.atualizarAlien(alienEditando.id, formAlien, token);
        setMensagemSucesso(`Alien "${formAlien.nome}" atualizado com sucesso!`);
    } else {
        await aliensService.criarAlien(formAlien, token);
        setMensagemSucesso(`Alien "${formAlien.nome}" cadastrado com sucesso!`);
    }

    fecharFormulario();
    await carregarAliens();

    setTimeout(() => setMensagemSucesso(""), 3000);
    } catch (error) {
    console.error("Erro ao salvar alien:", error);
    setErro(
        alienEditando
        ? "Erro ao atualizar alien. Tente novamente."
        : "Erro ao cadastrar alien. Tente novamente."
    );
    } finally {
    setCarregando(false);
    }
}

async function deletarAlien(id) {
    try {
    setCarregando(true);
    await aliensService.deletarAlien(id, token);
    setMensagemSucesso("Alien deletado com sucesso!");
    await carregarAliens();
    setTimeout(() => setMensagemSucesso(""), 3000);
    } catch (error) {
    console.error("Erro ao deletar alien:", error);
    setErro("Erro ao deletar alien. Tente novamente.");
    } finally {
    setCarregando(false);
    }
}

if (carregando && aliens.length === 0) {
    return <Loading />;
}

return (
    <section className="aliens-page">
    <div className="page-header">
        <h1>Catálogo de Aliens</h1>
        <button
        className="btn btn-primary"
        onClick={abrirFormularioCadastro}
        disabled={carregando}
        >
        Novo Alien
        </button>
    </div>

    {mensagemSucesso && (
        <div className="alert alert-success" role="alert">
        {mensagemSucesso}
        </div>
    )}

    {erro && (
        <ErrorMessage
        titulo="Erro"
        mensagem={erro}
        />
    )}

    <ListaAliens
        aliens={aliens}
        onEditar={abrirFormularioEdicao}
        onDeletar={deletarAlien}
        carregando={carregando}
    />

    {mostrarFormulario && (
        <div className="modal-overlay" onClick={fecharFormulario}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <FormAlien
            cadastrarAlien={cadastrarOuEditarAlien}
            fecharModal={fecharFormulario}
            formAlien={formAlien}
            setFormAlien={setFormAlien}
            editando={!!alienEditando}
            />
        </div>
        </div>
    )}
    </section>
);
}

export default Aliens;
