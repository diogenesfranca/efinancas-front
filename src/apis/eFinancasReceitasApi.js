import axios from "axios";
import apiUrl from "./apiUrl";

const obterReceita = (id) => axios.get(`${apiUrl}/v1/receitas/${id}`);

const listarReceitas = () => axios.get(`${apiUrl}/v1/receitas`);

const cadastrarReceita = (descricao, valor, data, idConta, idsCategorias) => axios.post(`${apiUrl}/v1/receitas`, { descricao, valor, data, idConta, idsCategorias });

const atualizarReceita = (id, descricao, valor, data, idConta, idsCategorias) => axios.put(`${apiUrl}/v1/receitas/${id}`, { descricao, valor, data, idConta, idsCategorias });

const removerReceita = id => axios.delete(`${apiUrl}/v1/receitas/${id}`);

export { obterReceita, listarReceitas, cadastrarReceita, atualizarReceita, removerReceita };