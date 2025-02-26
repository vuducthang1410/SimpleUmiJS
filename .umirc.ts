import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'HTQLKHV',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'Trang chủ',
      path: '/home',
      component: './Home',
    },
    {
      name: 'Danh sách khách hàng vay',
      path: '/customer-loan',
      component: './UserList',
    },
    {
      name: 'Thông tin tài chính',
      path: '/financial-info',
      component: './FinancialInfo',
    },
    {
      name: 'Sản phẩm vay',
      path: '/loan-product',
      component: './LoanProduct',
    },
  ],
  npmClient: 'pnpm',
});
