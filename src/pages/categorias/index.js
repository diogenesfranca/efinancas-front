import { Helmet } from 'react-helmet-async';
import { MenuItem } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { listarCategorias, removerCategoria } from 'src/apis/eFinancasCategoriasApi';
import { useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Tabela from 'src/components/tabela';

export default function Categorias () {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [itemRemovido, setItemRemovido] = useState('');

  async function removerConfirmacao (id, descricao) {
    if (window.confirm(`Deseja realmente remover a categoria ${descricao}?`) === true) {
      try {
        await removerCategoria(id);
        setItemRemovido(id);
      }
      catch(e){
        alert(e);
      }
    }
  }

  const columns: GridColDef[] = [
    { field: 'descricao', headerName: 'Categoria', width: 160 },
    {
      field: 'acao', headerName: 'Ação', sortable: false, width: 260, renderCell: params =>
        <>
          <MenuItem onClick={() => navigate(`/categorias/cadastro/${params.id}`)}>
            <CreateIcon />Alterar
          </MenuItem>
          <MenuItem onClick={() => { removerConfirmacao(params.id, params.row.descricao)} }>
            <DeleteIcon />Remover
          </MenuItem>
        </>
    }
  ];

  useEffect(() => {
    async function carregarDados() {
      const response = await listarCategorias();
      setRows(response.data);
    }
    carregarDados();    
  }, [itemRemovido]);

  return (
    <>
      <Helmet><title>EFinancas</title></Helmet>
      <Tabela titulo='Categorias' textoBotao='Cadastrar Categoria' rows={rows} columns={columns} onClick={() => navigate('/categorias/cadastro')} />
    </>
  );
}
