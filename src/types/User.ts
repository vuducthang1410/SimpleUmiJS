export interface User {
  name: string;
  token: string;
  role: string;
  cifCode: string;
  isLogin:boolean
}
export interface CustomerInfo {
  id: string;
  userId: string;
  cifCode: string;
  accountNumber: string;
  phone: string;
  address: string;
  dob: string;
  mail: string;
  firstName: string;
  lastName: string;
  identityCard: string;
  gender: string;
  avatar: string;
  status: string;
}

export interface ApiCustomerInfoResponse {
  code: number;
  message: string;
  result: CustomerInfo;
}
