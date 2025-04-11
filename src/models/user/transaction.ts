import { confirmTransactionInternal, executeTransactionInternal } from './../../services/transaction/transaction';
import { getInfoAccountByAccountNumber, getTransactionHistory } from '@/services/transaction/transaction';
import { BaseResponseHistoryTransaction, TransactionHistoryRp } from '@/types/Transaction';
import { AccountData, ApiResponse } from '@/types/User';
import { Effect, Reducer } from '@umijs/max';

export interface TransactionState {
    loading: boolean;
    historyTransaction: TransactionHistoryRp[],
    accountInfoReceiver: AccountData,
    transactionId: string
}

export interface TransactionModel {
    namespace: 'transaction';
    state: TransactionState;
    reducers: {
        setLoading: Reducer<TransactionState>;
        setTransactionHistories: Reducer<TransactionState>;
        setAccountInfoReceiver: Reducer<TransactionState>;
    };
    effects: {
        getTransactionHistory: Effect;
        getInfoAccountByAccountNumber: Effect;
        executeTransactionInternal: Effect;
        confirmTransactionInternal: Effect;
    };
}
const useTransaction: TransactionModel = {
    namespace: 'transaction',
    state: {
        loading: false,
        historyTransaction: [],
        accountInfoReceiver: {},
        transactionId: ''
    },
    reducers: {
        setLoading(state, action) {
            return {
                ...state,
                loading: action.payload,
            };
        },
        setTransactionHistories(state, action) {
            console.log(action.payload)
            return {
                ...state,
                historyTransaction: action.payload,
            };
        },
        setAccountInfoReceiver(state, action) {
            return {
                ...state,
                accountInfoReceiver: action.payload,
            };
        },

    },

    effects: {
        *getTransactionHistory({ payload, callback }, { call, put }): Generator<any, void, any> {
            try {
                const response: BaseResponseHistoryTransaction = yield call(getTransactionHistory, payload.pageNumber, payload.accountBankingNumber, payload.pageSize)
                yield put({ type: "setTransactionHistories", payload: response.content })
            } catch (error) {
                console.log(error)
            }

        },
        *getInfoAccountByAccountNumber({ payload, callback }, { call, put }): Generator<any, void, any> {
            try {
                const response: ApiResponse<AccountData> = yield call(getInfoAccountByAccountNumber, payload.accountBankingNumber)
                yield put({ type: "setAccountInfoReceiver", payload: response.data })
            } catch (error) {
                console.log(error)
            }

        },
        *executeTransactionInternal({ payload, callback }, { call, put }): Generator<any, void, any> {
            try {
                yield put({ type: 'setLoading', payload: true })
                const response = yield call(executeTransactionInternal, payload.data)
                console.log(response)
                callback(response.id)
            } catch (error) {
                console.log(error)
            } finally {
                yield put({ type: 'setLoading', payload: false })
            }
        },
        *confirmTransactionInternal({ payload, callback }, { call, put }): Generator<any, void, any> {
            try {
                console.log(payload)
                const response = yield call(confirmTransactionInternal, payload.otp, payload.transactionId)
                callback()
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
    },
};

export default useTransaction;
