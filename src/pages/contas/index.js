import { Helmet } from 'react-helmet-async';
import { Button, Container, MenuItem, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { listarContas } from 'src/apis/eFinancasContasApi';
import Iconify from 'src/components/iconify';
import { useNavigate } from "react-router-dom";

function AlterarButton({ id }) {
  const navigate = useNavigate();
  return <MenuItem onClick={() => navigate(`/contas/cadastro/${id}`)}><Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />Alterar</MenuItem>;
}

const columns: GridColDef[] = [
  { field: 'descricao', headerName: 'Conta', width: 160 },
  { field: 'saldo', headerName: 'Saldo', width: 160 },
  { field: 'acao', headerName: 'Ação', sortable: false, width: 130, renderCell: params => <AlterarButton id={params.id} /> }
];

export default function () {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      const response = await listarContas();      
      setRows(response.data);
    }
    carregarDados();
  }, []);

  return (
    <>
      <Helmet><title>EFinancas</title></Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Contas
        </Typography>
        <Stack spacing={2}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 }
              }
            }}
            pageSizeOptions={[10, 20]}
          />
          <div>
            <Button variant="contained" onClick={() => {navigate('/contas/cadastro') }}>Cadastrar Conta</Button>
          </div>
        </Stack>
      </Container>
    </>
  );
}
