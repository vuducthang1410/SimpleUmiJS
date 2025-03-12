import { JwtPayload } from "jwt-decode";


export interface DataToken extends JwtPayload {
    name?: string;
    email?: string;
    realm_access?:{
        roles:string[]
    }
}
export interface DataLogin{
    phone:string,
    password:string
}
export interface DataLoginResponse{
    code: number,
    message: string,
    result: {
      access_token: string,
      expires_in: string,
      refresh_expires_in: string,
      refresh_token: string,
      token_type: string,
      id_token: string,
      scope: string
    }
  }