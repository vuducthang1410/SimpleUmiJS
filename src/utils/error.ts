import { BaseResponse } from "@/types/LoanInfo";

export async function handleApiError(error: any): Promise<never> {
    console.log("Error Object:", error);
    if (error.response) {
      try {
        const errorData = await error.response.clone().json();
        console.log("Parsed Response Data:", errorData);
        console.log(errorData.data)
        const errorMessage =
          Array.isArray(errorData.data) ? errorData.data[0] : errorData.message;
        throw new Error(errorMessage);
      } catch (jsonError) {
        const textData = await error.response.clone().text();
        throw new Error(textData || "Unknown error occurred");
      }
    } else {
      throw new Error(error.message || "Unknown error occurred");
    }
  }
  export function getErrorData(errorJson:string) {
    const baseResponse: BaseResponse | null = errorJson ? (JSON.parse(errorJson) as BaseResponse) : null;
    return baseResponse;
  }
  
  