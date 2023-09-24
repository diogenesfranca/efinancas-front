import axios from "axios";
import apiUrl from "./apiUrl";

const obterCategoria = (id) => axios.get(`${apiUrl}/v1/categorias/${id}`);

const listarCategorias = () => axios.get(`${apiUrl}/v1/categorias`);

const cadastrarCategoria = (categoria) => axios.post(`${apiUrl}/v1/categorias?categoria=${categoria}`);

const atualizarCategoria = (id, categoria) => axios.put(`${apiUrl}/v1/categorias/${id}?categoria=${categoria}`);

const removerCategoria = id => axios.delete(`${apiUrl}/v1/categorias/${id}`);

export { obterCategoria, listarCategorias, cadastrarCategoria, atualizarCategoria, removerCategoria };