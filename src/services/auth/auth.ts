import { DataLogin, DataLoginResponse } from "@/types/DataToken";
import { ApiCustomerInfoResponse } from "@/types/User";
import APIConfig from "@/utils/URL"
import { AxiosError, request } from "@umijs/max";

export async function login(dataLogin: DataLogin) {
    try {
      return request<DataLoginResponse>(
        APIConfig.CUSTOMER_URL + '/auth/token',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: dataLogin
        }
    )  
    } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage =
              axiosError.response?.data?.data ||
              axiosError.message ||
              'Có lỗi xảy ra khi tạo lãi suất';
            throw new Error(errorMessage);
    }
    
}
export async function getInfoCustomer(token:string) {
  console.log(token)
  try {
    return request<ApiCustomerInfoResponse>(
      APIConfig.CUSTOMER_URL + '/users/my-info',
      {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
      }
    )
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage =
      axiosError.response?.data?.data ||
      axiosError.message ||
      'Có lỗi xảy ra khi tạo lãi suất';
    throw new Error(errorMessage);
  }
}