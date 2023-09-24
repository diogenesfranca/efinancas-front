import { Helmet } from 'react-helmet-async';
import { Container, MenuItem, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { listarCategorias } from 'src/apis/eFinancasCategoriasApi';
import Iconify from 'src/components/iconify';
import { useNavigate } from "react-router-dom";

function AlterarButton({ id }) {
  const navigate = useNavigate();
  return <MenuItem onClick={() => navigate(`/categorias/alterar/${id}`)}><Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />Alterar</MenuItem>;
}

const columns: GridColDef[] = [
  { field: 'descricao', headerName: 'Categoria', width: 160 },
  { field: 'acao', headerName: 'Ação', sortable: false, width: 130, renderCell: params => <AlterarButton id={params.id} /> }
];

export default function () {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      const response = await listarCategorias();
      setRows(response.data);
    }
    carregarDados();    
  }, []);

  return (
    <>
      <Helmet><title>EFinancas</title></Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Categorias
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 }
            }
          }}
          pageSizeOptions={[5, 10]}
        />
      </Container>
    </>
  );
}
