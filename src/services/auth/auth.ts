import { DataLogin, DataLoginResponse } from "@/types/DataToken";
import { ApiCustomerInfoResponse, ApiProvinceResponse, RegisterDataForm } from "@/types/User";
import { handleApiError } from "@/utils/error";
import APIConfig from "@/utils/URL"
import { request } from "@umijs/max";

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
export async function registerInfoCustomer(regsterInfoData: FormData) {
  try {
    return request<ApiCustomerInfoResponse>(
      APIConfig.CUSTOMER_URL + '/users/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: regsterInfoData
      }
    )
  } catch (error) {
    await handleApiError(error)
  }
}
export async function getProvince() {
  try {
    return request<ApiProvinceResponse>(
      APIConfig.CUSTOMER_URL + '/users/get-all-province',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    await handleApiError(error)
  }
}
export async function verifyAccount(code: string, mail: string) {
  try {
    return request<ApiProvinceResponse>(
      APIConfig.CUSTOMER_URL + '/auth/verify',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        params: { code: code, mail: mail }
      }
    )
  } catch (error) {
    await handleApiError(error)
  }
}