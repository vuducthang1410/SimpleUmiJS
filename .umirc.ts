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
      wrappers: ['@/pages/Login/AuthGuard'],
    },
    {
      name: 'Danh sách khách hàng vay',
      path: '/customer-loan',
      component: './LoanInfo',
      wrappers: ['@/pages/Login/AuthGuard'],
    },
    {
      name: 'Thông tin tài chính',
      path: '/financial-info',
      component: './FinancialInfo',
      wrappers: ['@/pages/Login/AuthGuard'],
    },
    {
      name: 'Sản phẩm vay',
      path: '/loan-product',
      component: './LoanProduct',
      wrappers: ['@/pages/Login/AuthGuard'],
    },
    {
      path: '/loan-product/detail/:id',
      component: './LoanProduct/LoanProductDetail',
      wrappers: ['@/pages/Login/AuthGuard'],
      layout: false,
    },
    {
      path: '/login',
      component: './Login',
      layout: false,
    },
  ],
  npmClient: 'pnpm',
});
