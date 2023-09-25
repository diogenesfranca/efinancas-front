import axios from "axios";
import apiUrl from "./apiUrl";

const obterDespesa = (id) => axios.get(`${apiUrl}/v1/despesas/${id}`);

const listarDespesas = () => axios.get(`${apiUrl}/v1/despesas`);

const cadastrarDespesa = (descricao, valor, data, idConta, idsCategorias) => axios.post(`${apiUrl}/v1/despesas`, { descricao, valor, data, idConta, idsCategorias });

const atualizarDespesa = (id, descricao, valor, data, idConta, idsCategorias) => axios.put(`${apiUrl}/v1/despesas/${id}`, { descricao, valor, data, idConta, idsCategorias });

const removerDespesa = id => axios.delete(`${apiUrl}/v1/despesas/${id}`);

export { obterDespesa, listarDespesas, cadastrarDespesa, atualizarDespesa, removerDespesa };