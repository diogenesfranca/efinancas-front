import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { atualizarConta, cadastrarConta, obterConta } from 'src/apis/eFinancasContasApi';
import { useNavigate, useParams } from 'react-router-dom';

export default function CadastroConta() {
  const navigate = useNavigate();
  const [conta, setConta] = useState("");
  const [saldo, setSaldo] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    async function carregarDados() {
      const response = await obterConta(id);
      setConta(response.data.descricao);
      setSaldo(response.data.saldo);
    }

    if (id)
      carregarDados();

  }, [id]);

  async function salvarConta(id, conta, saldo) {
    try {
      if (id)
        await atualizarConta(id, conta, saldo);
      else
        await cadastrarConta(conta, saldo);

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
          {`${id ? 'Alterar' : 'Cadastrar'} Conta`}
        </Typography>
        <Stack spacing={2}>
          <TextField label="Conta" variant="outlined" value={conta} onChange={e => setConta(e.target.value)} />
          <TextField label="Saldo" variant="outlined" value={saldo} onChange={e => setSaldo(e.target.value)} type="number" />
          <div> <Button variant="contained" onClick={() => salvarConta(id, conta, saldo)}>Salvar</Button> </div>
        </Stack>
      </Container>
    </>
  );
}
