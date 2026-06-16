import { useEffect, useState } from "react";
import api from "../../services/api";
import FormAvistamento from "../../components/Avistamentos/index";
import "./avistamentos.css";

const url = "/avistamentos";

function Avistamentos() {
    const [avistamentos, setAvistamentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [avistamentoEmEdicao, setAvistamentoEmEdicao] = useState(null);
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");
    const [payload, setPayload] = useState({
        titulo: "",
        local: "",
        descricao: "",
        data: "",
        nivelMedo: 1,
    });

    function limparFormulario() {
        setPayload({
            titulo: "",
            local: "",
            descricao: "",
            data: "",
            nivelMedo: 1,
        });
        setAvistamentoEmEdicao(null);
        setModoEdicao(false);
    }

    function fecharModal() {
        setOpenModal(false);
        limparFormulario();
    }

    function abrirModalCadastro() {
        limparFormulario();
        setOpenModal(true);
    }

    function abrirModalEdicao(avistamento) {
        setAvistamentoEmEdicao(avistamento);
        setPayload({
            titulo: avistamento.titulo ?? "",
            local: avistamento.local ?? "",
            descricao: avistamento.descricao ?? "",
            data: avistamento.data ? avistamento.data.slice(0, 10) : "",
            nivelMedo: avistamento.nivelMedo ?? 1,
        });
        setModoEdicao(true);
        setOpenModal(true);
    }

    function exibirMensagem(texto, tipo) {
        setMensagem(texto);
        setTipoMensagem(tipo);
        setTimeout(() => {
            setMensagem("");
            setTipoMensagem("");
        }, 4000);
    }

    async function buscarAvistamentos() {
        try {
            setLoading(true);
            const resposta = await api.get(url);
            setAvistamentos(resposta.data);
        } catch (error) {
            console.error("Erro ao buscar avistamentos:", error);
            exibirMensagem("Erro ao carregar avistamentos.", "erro");
        } finally {
            setLoading(false);
        }
    }

    async function cadastrarAvistamento(event) {
        event.preventDefault();

        try {
            const resposta = await api.post(url, payload);
            setAvistamentos((listaAtual) => [...listaAtual, resposta.data]);
            limparFormulario();
            setOpenModal(false);
            exibirMensagem("Avistamento cadastrado com sucesso!", "sucesso");
        } catch (error) {
            console.error("Erro ao cadastrar avistamento:", error);
            exibirMensagem("Erro ao cadastrar avistamento.", "erro");
        }
    }

    async function atualizarAvistamento(event) {
        event.preventDefault();

        if (!avistamentoEmEdicao) return;

        try {
            const resposta = await api.put(`${url}/${avistamentoEmEdicao.id}`, payload);
            setAvistamentos((listaAtual) =>
                listaAtual.map((avistamento) =>
                    avistamento.id === avistamentoEmEdicao.id ? resposta.data : avistamento
                )
            );
            limparFormulario();
            setOpenModal(false);
            exibirMensagem("Avistamento atualizado com sucesso!", "sucesso");
        } catch (error) {
            console.error("Erro ao atualizar avistamento:", error);
            exibirMensagem("Erro ao atualizar avistamento.", "erro");
        }
    }

    async function deletarAvistamento(id) {
        if (
            !window.confirm(
                "Tem certeza que deseja deletar este avistamento? Esta acao nao pode ser desfeita."
            )
        ) {
            return;
        }

        try {
            await api.delete(`${url}/${id}`);
            setAvistamentos((listaAtual) =>
                listaAtual.filter((avistamento) => avistamento.id !== id)
            );
            exibirMensagem("Avistamento deletado com sucesso!", "sucesso");
        } catch (error) {
            console.error("Erro ao deletar avistamento:", error);
            exibirMensagem("Erro ao deletar avistamento.", "erro");
        }
    }

    function manipularSubmitForm(event) {
        if (modoEdicao) {
            atualizarAvistamento(event);
        } else {
            cadastrarAvistamento(event);
        }
    }

    useEffect(() => {
        buscarAvistamentos();
    }, []);

    return (
        <section className="avistamentos-page">
            <h1>Avistamentos</h1>

            <button
                className="open-modal-button"
                onClick={abrirModalCadastro}
                type="button"
            >
                Cadastrar Avistamento
            </button>

            {openModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <FormAvistamento
                            cadastrarAvistamento={manipularSubmitForm}
                            fecharModal={fecharModal}
                            formAvistamento={payload}
                            modoEdicao={modoEdicao}
                            setFormAvistamento={setPayload}
                        />
                    </div>
                </div>
            )}

            {mensagem && (
                <p className={`mensagem ${tipoMensagem}`}>{mensagem}</p>
            )}

            {loading ? (
                <p>Carregando avistamentos...</p>
            ) : avistamentos.length === 0 ? (
                <p style={{ textAlign: "center", marginTop: "2rem" }}>
                    Nenhum avistamento cadastrado. Cadastre um novo avistamento para comecar!
                </p>
            ) : (
                <div className="avistamento-list">
                    {avistamentos.map((avistamento) => (
                        <article className="avistamento-card" key={avistamento.id}>
                            <h2>{avistamento.titulo}</h2>
                            <p>
                                <strong>Local:</strong> {avistamento.local}
                            </p>
                            <p>
                                <strong>Descricao:</strong> {avistamento.descricao}
                            </p>
                            <p>
                                <strong>Data:</strong> {avistamento.data}
                            </p>
                            <p>
                                <strong>Nivel do medo:</strong> {avistamento.nivelMedo}
                            </p>
                            <div className="card-actions">
                                <button
                                    className="btn-edit"
                                    onClick={() => abrirModalEdicao(avistamento)}
                                    type="button"
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn-delete"
                                    onClick={() => deletarAvistamento(avistamento.id)}
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

export default Avistamentos;
