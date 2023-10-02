import axios from "axios";
import apiUrl from "./apiUrl";

const obterHistorico = () => axios.get(`${apiUrl}/v1/historico-financas`);

export { obterHistorico };