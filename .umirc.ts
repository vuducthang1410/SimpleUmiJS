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
      path: '/admin/customer-loan',
      component: './Admin/LoanInfo',
      wrappers: ['@/pages/Login/AuthGuard'],
      access: 'isAdmin',
    },
    {
      name: 'Thông tin tài chính',
      path: '/admin/financial-info',
      component: './Admin/FinancialInfo',
      wrappers: ['@/pages/Login/AuthGuard'],
      access: 'isAdminOrManager',
    },
    {
      name: 'Sản phẩm vay',
      path: '/admin/loan-product',
      component: './Admin/LoanProduct',
      wrappers: ['@/pages/Login/AuthGuard'],
      access: 'isManager',
    },
    {
      path: '/admin/loan-product/detail/:id',
      component: './Admin/LoanProduct/LoanProductDetail',
      wrappers: ['@/pages/Login/AuthGuard'],
      access: 'isManager',
    },
    {
      name: 'Đăng ký thông tin tài chính',
      path: '/financial-info/register',
      component: '@/pages/User/FinancialInfo/Register',
      wrappers: ['@/pages/Login/AuthGuard'],
      access: 'isUser',
    },
    {
      name: 'Danh sách sản phẩm vay',
      path: '/loan-product',
      component: '@/pages/User/LoanProduct/LoanListActive',
      wrappers: ['@/pages/Login/AuthGuard'],
      access: 'isUser',
    },
    {
      name: 'Thông tin vay vốn',
      path: '/loan-product',
      routes: [
        {
          name: 'Lịch sử vay vốn',
          path: 'loan-product1',
          component: '@/pages/User/LoanProduct/LoanListActive',
        },
        {
          name: 'Thông tin vay vốn',
          path: 'loan-product2',
          component: '@/pages/User/LoanProduct/LoanListActive',
        },
      ],
      wrappers: ['@/pages/Login/AuthGuard'],
      access: 'isUser',
    },
    {
      path: '/loan-product/:id',
      component: '@/pages/User/LoanProduct/LoanProductDetail',
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
