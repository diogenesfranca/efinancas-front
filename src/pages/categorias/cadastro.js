import { Helmet } from 'react-helmet-async';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { cadastrarCategoria, atualizarCategoria, obterCategoria } from 'src/apis/eFinancasCategoriasApi';
import { useNavigate, useParams } from 'react-router-dom';

export default function () {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState("");
  const { id } = useParams();

  useEffect(() => {
    async function carregarDados() {
      const response = await obterCategoria(id);
      setCategoria(response.data.descricao);
    }

    if (id)
      carregarDados();
  }, []);

  async function salvarCategoria(id, categoria) {
    try {
      if(id)
        await atualizarCategoria(id, categoria)
      else
        await cadastrarCategoria(categoria);

      return navigate('/categorias');
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
          {`${id ? 'Alterar' : 'Cadastrar'} Categoria`}
        </Typography>
        <Stack spacing={2}>
          <TextField label="Categoria" variant="outlined" value={categoria} onChange={e => setCategoria(e.target.value)} />
          <div> <Button variant="contained" onClick={() => salvarCategoria(id, categoria)}>Salvar</Button> </div>
        </Stack>
      </Container>
    </>
  );
}
