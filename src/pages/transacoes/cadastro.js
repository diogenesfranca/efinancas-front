import { Helmet } from 'react-helmet-async';
import { Button, Container, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { atualizarDespesa, cadastrarDespesa, obterDespesa } from 'src/apis/eFinancasDespesasApi';
import { atualizarReceita, cadastrarReceita, obterReceita } from 'src/apis/eFinancasReceitasApi';
import { useNavigate, useParams } from 'react-router-dom';
import { listarContas } from 'src/apis/eFinancasContasApi';
import { listarCategorias } from 'src/apis/eFinancasCategoriasApi';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CadastroTransacao() {
  const navigate = useNavigate();
  const [contas, setContas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(0);
  const [data, setData] = useState(obterDataAtual());
  const [idConta, setIdConta] = useState('');
  const [idsCategorias, setIdsCategorias] = useState([]);
  const { tipo, id } = useParams();
  const tipoTransacao = tipo === 'despesas' ? 'despesa' : 'receita';

  const handleChangeCategorias = event => {
    const { value } = event.target;
    setIdsCategorias(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    async function carregarDados() {
      const contas = (await listarContas()).data;
      setContas(contas);
      const categorias = (await listarCategorias()).data;
      setCategorias(categorias);

      if (!id)
        return;

      let transacao;

      if (tipo === 'despesas')
        transacao = (await obterDespesa(id)).data;
      else
        transacao = (await obterReceita(id)).data;

      setDescricao(transacao.descricao);
      setValor(transacao.valor);
      setData(transacao.data);
      setIdConta(transacao.idConta);
      setIdsCategorias(transacao.idsCategorias);
    }

    carregarDados();
  }, [tipo, id]);

  async function salvarTransacao() {
    try {
      if (id && tipo === 'despesas')
        await atualizarDespesa(id, descricao, valor, data, idConta, idsCategorias);
      else if (!id && tipo === 'despesas')
        await cadastrarDespesa(descricao, valor, data, idConta, idsCategorias);
      else if (id && tipo !== 'despesas')
        await atualizarReceita(id, descricao, valor, data, idConta, idsCategorias);
      else
        await cadastrarReceita(descricao, valor, data, idConta, idsCategorias);

      return navigate(`/transacoes/${tipo}`);
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
          <FormControl fullWidth>
            <InputLabel>Conta</InputLabel>
            <Select value={idConta} label="Conta" onChange={e => setIdConta(e.target.value)} >
              {contas.map(c => <MenuItem key={c.id} value={c.id}>{c.descricao}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Categorias</InputLabel>
            <Select multiple value={idsCategorias} onChange={handleChangeCategorias} input={<OutlinedInput label="Categorias" />} MenuProps={MenuProps} >
              {categorias.map(c => <MenuItem key={c.id} value={c.id} >{c.descricao} </MenuItem>)}
            </Select>
          </FormControl>
          <div> <Button variant="contained" onClick={() => salvarTransacao()}>Salvar</Button> </div>
        </Stack>
      </Container>
    </>
  );
}

function obterDataAtual() {
  const date = new Date();
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
}
