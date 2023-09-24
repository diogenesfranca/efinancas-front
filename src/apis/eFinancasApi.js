import axios from "axios";
import apiUrl from "./apiUrl";

const obterCategoria = (id) => axios.get(`${apiUrl}/v1/categorias/${id}`);

const listarCategorias = () => axios.get(`${apiUrl}/v1/categorias`);

const atualizarCategoria = (id, categoria) => axios.put(`${apiUrl}/v1/categorias/${id}?categoria=${categoria}`);

export { obterCategoria, listarCategorias, atualizarCategoria };