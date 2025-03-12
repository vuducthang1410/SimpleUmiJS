import { extend } from "umi-request";
import { getUserInfoInLocalStorage } from "./UserInfo";

const request = extend({
    timeout: 10000,
    headers: {
      accept: '*/*',
    },
  });
  
  request.interceptors.request.use((url, options) => {
    const userData = getUserInfoInLocalStorage()
    return {
      url,
      options: {
        ...options,
        headers: {
          ...options.headers,
          Authorization: userData ? `Bearer ${userData.token}` : 'Bearer abc',
        },
      },
    };
  });
export default request;
  