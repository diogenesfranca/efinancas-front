import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import { Historico, Categorias, CadastroCategoria, Contas, CadastroConta, Transacoes, CadastroTransacao } from './pages';
import Page404 from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/historico" />, index: true },
        { path: 'historico', element: <Historico /> },
        { path: 'categorias', element: <Categorias /> },
        { path: 'categorias/cadastro', element: <CadastroCategoria /> },
        { path: 'categorias/cadastro/:id', element: <CadastroCategoria /> },
        { path: 'contas', element: <Contas /> },
        { path: 'contas/cadastro', element: <CadastroConta /> },
        { path: 'contas/cadastro/:id', element: <CadastroConta /> },
        { path: 'transacoes/:tipo', element: <Transacoes /> },
        { path: 'transacoes/cadastro/:tipo', element: <CadastroTransacao /> },
        { path: 'transacoes/cadastro/:tipo/:id', element: <CadastroTransacao /> }
      ],
    },    
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
