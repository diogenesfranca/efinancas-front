import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import { Categorias, AlterarCategoria, Contas, AlterarConta } from './pages';
import Page404 from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/categorias" />, index: true },
        { path: 'categorias', element: <Categorias /> },
        { path: 'categorias/alterar/:id', element: <AlterarCategoria /> },
        { path: 'contas', element: <Contas /> },
        { path: 'contas/alterar/:id', element: <AlterarConta /> }
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
