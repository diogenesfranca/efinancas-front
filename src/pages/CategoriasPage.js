import { Helmet } from 'react-helmet-async';
import { Container, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'categoria', headerName: 'Categoria', width: 130 }  
];

const rows = [
  { id: 1, categoria: 'Snow' },
  { id: 2, categoria: 'Lannister' },
  { id: 3, categoria: 'Lannister' },
  { id: 4, categoria: 'Stark' },
  { id: 5, categoria: 'Targaryen' },
  { id: 6, categoria: 'Melisandre' },
  { id: 7, categoria: 'Clifford' },
  { id: 8, categoria: 'Frances' },
  { id: 9, categoria: 'Roxie' },
];

export default function CategoriasPage() {
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
