import axios from "axios";
import apiUrl from "./apiUrl";

const obterConta = (id) => axios.get(`${apiUrl}/v1/contas/${id}`);

const listarContas = () => axios.get(`${apiUrl}/v1/contas`);

const cadastrarConta = (descricao, saldo) => axios.post(`${apiUrl}/v1/contas`, { descricao, saldo });

const atualizarConta = (id, descricao, saldo) => axios.put(`${apiUrl}/v1/contas/${id}`, { descricao, saldo });

export { obterConta, listarContas, cadastrarConta, atualizarConta };