import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { atualizarConta, obterConta } from 'src/apis/eFinancasContasApi';
import { useNavigate, useParams } from 'react-router-dom';

export default function () {
  const navigate = useNavigate();
  const [conta, setConta] = useState(null);
  const [saldo, setSaldo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    obterConta(id).then((response) => {
      setConta(response.data.descricao);
      setSaldo(response.data.saldo);
    });
  }, []
  );

  async function salvarConta(id, conta, saldo) {
    try {
      await atualizarConta(id, conta, saldo);
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
          Alterar Conta
        </Typography>
        {conta !== null &&
          <Stack spacing={2}>
            <TextField label="Conta" variant="outlined" value={conta} onChange={e => setConta(e.target.value)} />
            <TextField label="Saldo" variant="outlined" value={saldo} onChange={e => setSaldo(e.target.value)} type="number" />
            <div>
              <Button variant="contained" onClick={() => salvarConta(id, conta, saldo)}>Salvar</Button>
            </div>
          </Stack>
        }
      </Container>
    </>
  );
}
