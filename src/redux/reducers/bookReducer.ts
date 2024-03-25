import { isCallingApi, isFailedApiCall, isSuccessfulApiCall } from '@/helper/actionDedicate';
import { BookActionType } from '../actions/bookAction';
import { GET_LIST_BOOK, GET_LIST_RANDOM_BOOK } from '../types/bookTypes';
import { BookState } from '@/interfaces/bookInterfaces';

const initalState: BookState = {
    isFetching: false,
    error: false,
    listBook: [],
}

const bookReducer = (state = initalState, action: BookActionType) => {
    switch (action.type) {
        case GET_LIST_BOOK:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    listBook: [],
                    isFetching: true,
                    error: false,
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    listBook: action.payload!,
                    isFetching: false,
                    error: false,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    listBook: [],
                    isFetching: false,
                    error: true,
                }
            }
            break;
        case GET_LIST_RANDOM_BOOK:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    listBook: [],
                    isFetching: true,
                    error: false,
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    listBook: action.payload!,
                    isFetching: false,
                    error: false,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    listBook: [],
                    isFetching: false,
                    error: true,
                }
            }
            break;
        default:
            return state;
    }
};

export default bookReducer;