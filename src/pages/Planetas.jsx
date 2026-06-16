import { useEffect, useState } from "react";
import FormPlaneta from "../components/FormPlaneta";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import "../planetas.css";

const url = "/planetas";

function Planetas() {
    const { nomeUsuario } = useAuth();
    const [planetas, setPlanetas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [planetaEmEdicao, setPlanetaEmEdicao] = useState(null);
    const [formPlaneta, setFormPlaneta] = useState({
        nome: "",
        galaxia: "",
        clima: "",
        habitavel: false,
        descricao: "",
    });

function limparFormulario() {
        setFormPlaneta({
        nome: "",
        galaxia: "",
        clima: "",
        habitavel: false,
        descricao: "",
        });
        setPlanetaEmEdicao(null);
        setModoEdicao(false);
    }

function fecharModal() {
        setModalAberto(false);
        limparFormulario();
    }

function abrirModalCadastro() {
        limparFormulario();
        setModalAberto(true);
    }

function abrirModalEdicao(planeta) {
        setPlanetaEmEdicao(planeta);
        setFormPlaneta({
        nome: planeta.nome,
        galaxia: planeta.galaxia,
        clima: planeta.clima,
        habitavel: planeta.habitavel,
        descricao: planeta.descricao,
    });
        setModoEdicao(true);
        setModalAberto(true);
    }

    function exibirMensagem(texto, tipo) {
        setMensagem(texto);
        setTipoMensagem(tipo);
        setTimeout(() => {
        setMensagem("");
        setTipoMensagem("");
        }, 4000);
    }

    async function buscarPlanetas() {
        try {
        setLoading(true);
        const resposta = await api.get(url);
        setPlanetas(resposta.data);
        } catch (error) {
        console.error("Erro ao buscar planetas:", error);
        exibirMensagem("Erro ao carregar planetas.", "erro");
        } finally {
        setLoading(false);
        }
    }

    async function cadastrarPlaneta(event) {
        event.preventDefault();

        try {
        const resposta = await api.post(url, formPlaneta);
        setPlanetas((listaAtual) => [...listaAtual, resposta.data]);
        limparFormulario();
        setModalAberto(false);
        exibirMensagem("Planeta cadastrado com sucesso!", "sucesso");
        } catch (error) {
        console.error("Erro ao cadastrar planeta:", error);
        exibirMensagem("Erro ao cadastrar planeta.", "erro");
        }
    }

    async function atualizarPlaneta(event) {
        event.preventDefault();

        if (!planetaEmEdicao) return;

        try {
        const resposta = await api.put(`${url}/${planetaEmEdicao.id}`, formPlaneta);
        setPlanetas((listaAtual) =>
            listaAtual.map((planeta) =>
            planeta.id === planetaEmEdicao.id ? resposta.data : planeta
            )
        );
        limparFormulario();
        setModalAberto(false);
        exibirMensagem("Planeta atualizado com sucesso!", "sucesso");
        } catch (error) {
        console.error("Erro ao atualizar planeta:", error);
        exibirMensagem("Erro ao atualizar planeta.", "erro");
        }
    }

    async function deletarPlaneta(id) {
        if (
        !window.confirm(
            "Tem certeza que deseja deletar este planeta? Esta ação não pode ser desfeita."
        )
        ) {
        return;
        }

        try {
        await api.delete(`${url}/${id}`);
        setPlanetas((listaAtual) =>
            listaAtual.filter((planeta) => planeta.id !== id)
        );
        exibirMensagem("Planeta deletado com sucesso!", "sucesso");
        } catch (error) {
        console.error("Erro ao deletar planeta:", error);
        exibirMensagem("Erro ao deletar planeta.", "erro");
        }
    }

    function manipularSubmitForm(event) {
        if (modoEdicao) {
        atualizarPlaneta(event);
        } else {
        cadastrarPlaneta(event);
        }
    }

    useEffect(() => {
        buscarPlanetas();
    }, []);

    return (
        <section className="planetas-page">
        <h1>Planetas</h1>
        {nomeUsuario && <p className="usuario-logado">Olá, {nomeUsuario}</p>}

        <button
            className="open-modal-button"
            onClick={abrirModalCadastro}
            type="button"
        >
            Cadastrar planeta
        </button>

        {modalAberto && (
            <div className="modal-overlay">
            <div className="modal-content">
                <FormPlaneta
                submeterForm={manipularSubmitForm}
                fecharModal={fecharModal}
                formPlaneta={formPlaneta}
                setFormPlaneta={setFormPlaneta}
                modoEdicao={modoEdicao}
                />
            </div>
            </div>
        )}

        {mensagem && (
            <p className={`mensagem ${tipoMensagem}`}>{mensagem}</p>
        )}

        {loading ? (
            <p>Carregando planetas...</p>
        ) : planetas.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
            Nenhum planeta cadastrado. Cadastre um novo planeta para começar!
            </p>
        ) : (
            <div className="alien-list">
            {planetas.map((planeta) => (
                <article className="alien-card" key={planeta.id}>
                <h3>
                    {planeta?.nome === "string"
                    ? "Nome não disponível"
                    : planeta?.nome}
                </h3>
                <p>
                    <strong>Galáxia:</strong> {planeta?.galaxia}
                </p>
                <p>
                    <strong>Clima:</strong> {planeta?.clima}
                </p>
                <p>
                    <strong>Habitável:</strong> {planeta?.habitavel ? "Sim" : "Não"}
                </p>
                <p>
                    <strong>Descrição:</strong> {planeta?.descricao}
                </p>
                <div className="card-actions">
                    <button
                    className="btn-edit"
                    onClick={() => abrirModalEdicao(planeta)}
                    type="button"
                    >
                    Editar
                    </button>
                    <button
                    className="btn-delete"
                    onClick={() => deletarPlaneta(planeta.id)}
                    type="button"
                    >
                    Deletar
                    </button>
                </div>
                </article>
            ))}
            </div>
        )}
        </section>
    );
}

export default Planetas;