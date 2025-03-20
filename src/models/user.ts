import { registerInfoCustomer } from "@/services/auth/auth";
import { RegisterDataForm } from "@/types/User";
import { getErrorData } from "@/utils/error";
import { Effect, Reducer } from "@umijs/max";

export interface UserState {
    userRegister: RegisterDataForm,
    loading: boolean
}
export interface UserModel {
    namespace: 'user',
    state: UserState,
    reducers: {
        setLoading: Reducer<UserState>;
    },
    effects: {
        registerInfoPersonal: Effect;
    }
}
const useUser: UserModel = {
    namespace: 'user',
    state: {
        loading: false,
        userRegister: {}
    },
    reducers: {
        setLoading(state, { payload }) {
            return { ...state, loading: payload }
        },
    },
    effects: {
        *registerInfoPersonal({ payload, callback }, { call, put }): Generator<any, void, any> {
            console.log(payload)
            console.log("bbbb")
            try {
                yield put({
                    type: 'setLoading',
                    payload: true
                })
                const response = yield call(registerInfoCustomer, payload.formData)
                callback({ isSuccess: true, message: response.message })
            } catch (error: any) {
                // if (error instanceof Error) {
                //     const errorData = getErrorData(error.message)
                //     Array.isArray(errorData?.data) ?
                //         callback({ isSuccess: false, message: errorData?.data[0] }) :
                //         callback({ isSuccess: false, message: errorData?.data })
                // } else {
                //     console.log("🟡 Error is not an instance of Error, raw value:", error);
                //     callback({ isSuccess: false, message: "Lỗi không xác định. Vui lòng thử lại!" });
                // }
            }finally{
                yield put({
                    type: 'setLoading',
                    payload: false
                })
            }

        }
    }

}
export default useUser;