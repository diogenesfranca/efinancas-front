import axios from "axios";
import apiUrl from "./apiUrl";

const listarCategorias = () => {
    return axios.get(`${apiUrl}/v1/categorias`);
};

export { listarCategorias };