import { Button, Container, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function Tabela({ titulo, textoBotao, rows, columns, onClick, children }) {
    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}> {titulo} </Typography>
            <Stack spacing={2}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { page: 0, pageSize: 10 } }
                    }}
                    pageSizeOptions={[10, 20]}
                />
                {textoBotao && <div> <Button variant="contained" onClick={() => onClick()}>{textoBotao}</Button> </div>}
                {children}
            </Stack>
        </Container>
    );
}