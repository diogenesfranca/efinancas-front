import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { listarCategorias } from 'src/apis/eFinancasApi';

const columns: GridColDef[] = [
  { field: 'descricao', headerName: 'Categoria', width: 130 }
];

export default function CategoriasPage() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    listarCategorias().then((response) => {
      setRows(response.data);
    });
  }, []
  );
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
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </Container>
    </>
  );
}
