import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  dva: {},
  initialState: {},
  request: {},
  layout: {
    title: 'KLB-Banking',
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
      access: 'isAdmin',
    },
    {
      name: 'Sản phẩm vay',
      path: '/admin/loan-product',
      component: './Admin/LoanProduct',
      wrappers: ['@/pages/Login/AuthGuard'],
      access: 'isAdmin',
    },
    {
      path: '/admin/loan-product/detail/:id',
      component: './Admin/LoanProduct/LoanProductDetail',
      wrappers: ['@/pages/Login/AuthGuard'],
      access: 'isAdmin',
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
      path: '/loan-info',
      routes: [
        {
          name: 'Lịch sử vay vốn',
          path: 'loan-info-history',
          component: '@/pages/User/Loan/LoanInfoHistory',
        },
        {
          name: 'Các khoản đang vay',
          path: 'loan-info-detai-active',
          component: '@/pages/User/Loan/LoanInfoHistory/LoanInfoDetailActive',
        },
      ],
      wrappers: ['@/pages/Login/AuthGuard'],
      access: 'isUser',
    },
    {
      path: '/register',
      component: '@/pages/Register',
      layout:false
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
    }
  ],
  npmClient: 'pnpm',
});
