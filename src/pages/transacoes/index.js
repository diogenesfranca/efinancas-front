import { Helmet } from 'react-helmet-async';
import { MenuItem } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { listarDespesas, removerDespesa } from 'src/apis/eFinancasDespesasApi';
import { listarReceitas, removerReceita } from 'src/apis/eFinancasReceitasApi';
import { listarContas } from 'src/apis/eFinancasContasApi';
import { listarCategorias } from 'src/apis/eFinancasCategoriasApi';
import { useNavigate, useParams } from "react-router-dom";
import Tabela from 'src/components/tabela';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { capitalizeFirstLetter } from 'src/utils/capitalize';

export default function Transacoes() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [itemRemovido, setItemRemovido] = useState('');
  const { tipo } = useParams();
  const tipoTransacao = tipo === 'despesas' ? 'despesa' : 'receita';

  async function removerConfirmacao(id, descricao) {
    if (window.confirm(`Deseja realmente remover a ${tipoTransacao} ${descricao}?`) === true) {
      try {
        if (tipoTransacao === 'despesa')
          await removerDespesa(id);
        else
          await removerReceita(id);
        setItemRemovido(id);
      }
      catch (e) {
        alert(e);
      }
    }
  }

  const columns: GridColDef[] = [
    { field: 'descricao', headerName: 'Descrição', width: 160 },
    { field: 'valor', headerName: 'Valor', width: 160 },
    { field: 'data', headerName: 'Data', width: 160 },
    { field: 'conta', headerName: 'Conta', width: 160 },
    { field: 'categorias', headerName: 'Categorias', width: 160 },
    {
      field: 'acao', headerName: 'Ação', sortable: false, width: 260, renderCell: params =>
        <>
          <MenuItem onClick={() => navigate(`/transacoes/cadastro/${tipo}/${params.id}`)}>
            <CreateIcon />Alterar
          </MenuItem>
          <MenuItem onClick={() => { removerConfirmacao(params.id, params.row.descricao) }}>
            <DeleteIcon />Remover
          </MenuItem>
        </>
    }
  ];

  useEffect(() => {
    async function carregarDados() {
      const contas = (await listarContas()).data;
      const categorias = (await listarCategorias()).data;

      let transacoes;

      if (tipoTransacao === 'despesa')
        transacoes = (await listarDespesas()).data;
      else
        transacoes = (await listarReceitas()).data;

      setRows(obterLinhas(transacoes, contas, categorias));
    }
    carregarDados();
  }, [itemRemovido, tipoTransacao]);

  return (
    <>
      <Helmet><title>EFinancas</title></Helmet>
      <Tabela titulo={`${capitalizeFirstLetter(tipoTransacao)}s`} textoBotao={`Cadastrar ${tipoTransacao}`} rows={rows} columns={columns} onClick={() => { navigate(`/transacoes/cadastro/${tipo}`) }} />
    </>
  );
}

function obterLinhas(transacoes, contas, categorias) {
  return transacoes.map(linha => {
    const conta = contas.find(conta => conta.id === linha.idConta);

    if (conta)
      linha.conta = conta.descricao;

    let descricoesCategorias = '';

    linha.idsCategorias.forEach(idCategoria => {
      const categoria = categorias.find(c => c.id === idCategoria);
      descricoesCategorias = `${descricoesCategorias} ${categoria.descricao}`;
    });

    linha.categorias = descricoesCategorias;

    return linha;
  });
}
