// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'histórico',
    path: '/historico',
    icon: icon('ic_analytics'),
  },
  {
    title: 'categorias',
    path: '/categorias',
    icon: icon('ic_analytics'),
  },
  {
    title: 'contas',
    path: '/contas',
    icon: icon('ic_analytics'),
  },
  {
    title: 'despesas',
    path: '/transacoes/despesas',
    icon: icon('ic_analytics'),
  },
  {
    title: 'receitas',
    path: '/transacoes/receitas',
    icon: icon('ic_analytics'),
  }
];

export default navConfig;
