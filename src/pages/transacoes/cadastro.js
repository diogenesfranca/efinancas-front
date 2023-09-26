import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { atualizarDespesa, cadastrarDespesa, obterDespesa } from 'src/apis/eFinancasDespesasApi';
import { atualizarReceita, cadastrarReceita, obterReceita } from 'src/apis/eFinancasReceitasApi';
import { useNavigate, useParams } from 'react-router-dom';

export default function CadastroTransacao() {
  const navigate = useNavigate();
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(0);
  const [data, setData] = useState(Date.now());
  const { tipo, id } = useParams();
  const tipoTransacao = tipo === 'despesas' ? 'despesa' : 'receita';

  useEffect(() => {
    async function carregarDados() {
      let transacao;

      if (tipo === 'despesas')
        transacao = (await obterDespesa(id)).data;
      else
        transacao = (await obterReceita(id)).data;

      setDescricao(transacao.descricao);
      setValor(transacao.valor);
      setData(transacao.data);
    }

    if (id)
      carregarDados();

  }, [tipo, id]);

  async function salvarTransacao() {
    try {


      return navigate('/contas');
    }
    catch (e) {
      alert(e);
    }
    return null;
  }

  return (
    <>
      <Helmet><title>EFinancas</title></Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {`${id ? 'Alterar' : 'Cadastrar'} ${tipoTransacao}`}
        </Typography>
        <Stack spacing={2}>
          <TextField label="Descrição" variant="outlined" value={descricao} onChange={e => setDescricao(e.target.value)} />
          <TextField label="Valor" variant="outlined" value={valor} onChange={e => setValor(e.target.value)} type="number" />
          <TextField label="Data" variant="outlined" value={data} onChange={e => setData(e.target.value)} type="date" />
          <div> <Button variant="contained" onClick={() => salvarTransacao()}>Salvar</Button> </div>
        </Stack>
      </Container>
    </>
  );
}
