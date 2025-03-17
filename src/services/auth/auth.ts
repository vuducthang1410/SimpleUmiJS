import { DataLogin, DataLoginResponse } from "@/types/DataToken";
import { ApiCustomerInfoResponse } from "@/types/User";
import { handleApiError } from "@/utils/error";
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
    await handleApiError(error);
  }

}
export async function getInfoCustomer(token: string) {
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
    await handleApiError(error)
  }
}