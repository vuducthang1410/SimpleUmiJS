import { DataLogin, DataLoginResponse } from "@/types/DataToken";
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