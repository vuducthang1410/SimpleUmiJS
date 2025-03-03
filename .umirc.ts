import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  dva: {},
  initialState: {},
  request: {},
  layout: {
    title: 'HTQLKHV',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
      wrappers: ['@/pages/Login/AuthGuard'],
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
      access: 'isAdmin',
    },
    {
      name: 'Thông tin tài chính',
      path: '/financial-info',
      component: './FinancialInfo',
      wrappers: ['@/pages/Login/AuthGuard'],
      access: 'isAdminOrManager',
    },
    {
      name: 'Sản phẩm vay',
      path: '/loan-product',
      component: './LoanProduct',
      wrappers: ['@/pages/Login/AuthGuard'],
      access: 'isManager',
    },
    {
      path: '/loan-product/detail/:id',
      component: './LoanProduct/LoanProductDetail',
      wrappers: ['@/pages/Login/AuthGuard'],
      access: 'isManager',
    },
    {
      name: 'Đăng ký thông tin tài chính',
      path: '/financial-info/register',
      component: '@/pages/FinancialInfo/User/Register',
      wrappers: ['@/pages/Login/AuthGuard'],
      access: 'isUser',
    },
    {
      path:'/loan-product/register-loan',
      component:'@/pages/Loan/User/Register',
      wrappers: ['@/pages/Login/AuthGuard'],
      access: 'isUser',
    },
    {
      name:'Danh sách sản phẩm vay',
      path:'/loan-product/list-active',
      component:'@/pages/LoanProduct/User/LoanListActive',
      wrappers: ['@/pages/Login/AuthGuard'],
      access: 'isUser',
    },
    {
      path:'/loan-product/:id',
      component:'@/pages/LoanProduct/User/LoanProductDetail',
      wrappers: ['@/pages/Login/AuthGuard'],
      access: 'isUser',
    },
    {
      name: 'Đăng xuất',
      path: '/logout',
      component: './Logout',
      wrappers: ['@/pages/Login/AuthGuard'],
      
    },
    {
      path: '/login',
      component: './Login',
      layout: false,
    },
  ],
  npmClient: 'pnpm',
});
