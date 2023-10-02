import { Helmet } from 'react-helmet-async';
import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { obterHistorico } from 'src/apis/eFinancasHistoricoApi';
import { removerDespesa } from 'src/apis/eFinancasDespesasApi';
import { removerReceita } from 'src/apis/eFinancasReceitasApi';
import { useNavigate } from "react-router-dom";
import { Button, MenuItem } from '@mui/material';
import Tabela from 'src/components/tabela';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Historico() {
    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [itemRemovido, setItemRemovido] = useState('');

    async function removerConfirmacao(id, descricao, tipo) {
        if (window.confirm(`Deseja realmente remover a ${tipo} ${descricao}?`) === true) {
            try {
                if (tipo === 'despesa')
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
        { field: 'descricao', headerName: 'Conta', width: 160 },
        { field: 'valor', headerName: 'Valor', width: 160 },
        { field: 'data', headerName: 'Data', width: 160 },
        {
            field: 'acao', headerName: 'Ação', sortable: false, width: 260, renderCell: params => {
                const tipo = params.row.valor > 0 ? 'receita' : 'despesa';
                return (
                    <>
                        <MenuItem onClick={() => navigate(`/transacoes/cadastro/${tipo}s/${params.id}`)}>
                            <CreateIcon />Alterar
                        </MenuItem>
                        <MenuItem onClick={() => { removerConfirmacao(params.id, params.row.descricao, tipo) }}>
                            <DeleteIcon />Remover
                        </MenuItem>
                    </>);
            }
        }
    ];

    useEffect(() => {
        async function carregarDados() {
            const response = await obterHistorico();
            setRows(response.data);
        }
        carregarDados();
    }, [itemRemovido]);

    return (
        <>
            <Helmet><title>EFinancas</title></Helmet>
            <Tabela titulo='Histórico Finanças' rows={rows} columns={columns} >
                <div>
                    <Button variant="contained" sx={{ marginRight: 2}} onClick={() => { navigate('/transacoes/cadastro/despesas') }}>Cadastrar Despesa</Button>
                    <Button variant="contained" onClick={() => { navigate('/transacoes/cadastro/receitas') }}>Cadastrar Receita</Button>
                </div>
            </Tabela>
        </>
    );
}
