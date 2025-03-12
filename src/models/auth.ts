import { getInfoCustomer, login } from "@/services/auth/auth";
import { DataToken } from "@/types/DataToken";
import { User } from "@/types/User";
import { Effect, Reducer } from "@umijs/max";
import { jwtDecode } from "jwt-decode";

export interface AuthState {
    user: User,
    loading: boolean
}
export interface RootState {
    auth: AuthState
}
export interface AuthModel {
    namespace: 'auth',
    state: RootState;
    reducers: {
        setUserDataInState: Reducer<AuthState>;
        setLoading: Reducer<AuthState>;
        setCifCodeInUserData: Reducer<AuthState>;
        logOut: Reducer<AuthState>;
        setUserDataWhenReload: Reducer<AuthState>;
    };
    effects: {
        login: Effect;
        logout: Effect;
        getInfoUser: Effect;
    }
}
const useAuth: AuthModel = {
    namespace: 'auth',
    state: {
        auth: {
            loading: false,
            user: {
                cifCode: '',
                name: '',
                role: '',
                token: '',
                isLogin: false
            }
        }
    },
    reducers: {
        setCifCodeInUserData(state, action) {
            return {
                ...state, user: {
                    ...state.user,
                    cifCode: action.payload
                }
            };
        },
        setLoading(state: AuthState, action): AuthState {
            return { ...state, loading: action.payload };
        },
        setUserDataInState(state, action) {
            return {
                ...state,
                user: {
                    ...state.user,
                    cifCode:action.payload.cifCode,
                    name: action.payload.name,
                    role: action.payload.role,
                    token: action.payload.token,
                    isLogin: true
                }
            };
        },
        logOut(state, action) {
            return {
                ...state, user: {
                    ...state.user,
                    isLogin: false,
                    token: ''
                }
            }
        },
        setUserDataWhenReload(state, action) {
            console.log(action)
            return {
                ...state,
                user: {
                    cifCode: action.payload.user?.cifCode || '',
                    name: action.payload.user.name,
                    role: action.payload.user.role,
                    token: action.payload.user.token,
                    isLogin: true
                }
            };
        }

    },
    effects: {
        *getInfoUser(): Generator<any, void, any> {
        },
        *login({ payload }, { call, put, select }): Generator<any, void, any> {
            yield put({ type: 'setLoading', payload: true })
            try {
                const response = yield call(login, payload.dataLogin)
                const accessToken = response.result.access_token
                const dataToken = jwtDecode<Partial<DataToken>>(accessToken)
                const responseGetCustomerInfo = yield call(getInfoCustomer, accessToken)
                yield put({
                    type: 'setUserDataInState',
                    payload: {
                        name: dataToken.name,
                        role: dataToken.realm_access?.roles[0],
                        token: accessToken,
                        cifCode: responseGetCustomerInfo.result.cifCode
                    }
                })
                yield put({ type: 'setLoading', payload: false })
                const data = yield select((state: RootState) => state.auth)
                localStorage.setItem('user', JSON.stringify(data.user))
            } catch (error) {
                console.log(error)
            }

        },
        *logout({ payload }, { put, select }): Generator<any, void, any> {
            const user = yield select((state: RootState) => state.auth.user);
            console.log("Saga logout chạy");
            if (user?.isLogin) {
                yield put({ type: 'logOut' });
                localStorage.removeItem("user");
            }
        },
    }
}
export default useAuth;