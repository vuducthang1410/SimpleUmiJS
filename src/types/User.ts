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
  data: CustomerInfo;
}
export interface RegisterDataForm {
  phone?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  gender?: string;
  mail?: string;
  address?: string;
  placeOrigin?: string;
  identityCard?: string;
  dob?: string;
  identityCardFront?: File;
  identityCardBack?: File;
  avatar?: File;
}
export interface Province{
     number: number
      name: string
}
export interface ApiProvinceResponse {
  code: number;
  message: string;
  data: Province[];
}
export interface AccountData {
  accountId?: string;
  accountNumber?: string;
  accountName?: string;
  accountType?: string;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
