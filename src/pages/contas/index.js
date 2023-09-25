import { Helmet } from 'react-helmet-async';
import { MenuItem } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { listarContas, removerConta } from 'src/apis/eFinancasContasApi';
import { useNavigate } from "react-router-dom";
import Tabela from 'src/components/tabela';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Contas () {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [itemRemovido, setItemRemovido] = useState('');

  async function removerConfirmacao (id, descricao) {
    if (window.confirm(`Deseja realmente remover a conta ${descricao}?`) === true) {
      try {
        await removerConta(id);
        setItemRemovido(id);
      }
      catch (e) {
        alert(e);
      }
    }
  }

  const columns: GridColDef[] = [
    { field: 'descricao', headerName: 'Conta', width: 160 },
    { field: 'saldo', headerName: 'Saldo', width: 160 },
    {
      field: 'acao', headerName: 'Ação', sortable: false, width: 260, renderCell: params =>
        <>
          <MenuItem onClick={() => navigate(`/contas/cadastro/${params.id}`)}>
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
      const response = await listarContas();
      setRows(response.data);
    }
    carregarDados();
  }, [itemRemovido]);

  return (
    <>
      <Helmet><title>EFinancas</title></Helmet>
      <Tabela titulo='Contas' textoBotao='Cadastrar Conta' rows={rows} columns={columns} onClick={() => { navigate('/contas/cadastro') }} />
    </>
  );
}
