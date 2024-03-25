import { isCallingApi, isFailedApiCall, isSuccessfulApiCall } from '@/helper/actionDedicate';
import { BookTagActionType } from '../actions/bookTagAction';
import { GET_LIST_BOOK_TAG } from '../types/bookTagTypes';
import { BookTagState } from '@/interfaces/bookTagInterfaces';

const initalState: BookTagState = {
    isFetching: false,
    error: false,
    listBookTag: [],
}

const bookTagReducer = (state = initalState, action: BookTagActionType) => {
    switch (action.type) {
        case GET_LIST_BOOK_TAG:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    listBookTag: [],
                    isFetching: true,
                    error: false,
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    listBookTag: action.payload!,
                    isFetching: false,
                    error: false,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    listBookTag: [],
                    isFetching: false,
                    error: true,
                }
            }
            break;
        default:
            return state;
    }
};

export default bookTagReducer;