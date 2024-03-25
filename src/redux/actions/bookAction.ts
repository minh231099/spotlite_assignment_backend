import { Dispatch } from "redux";
import { API_URLS } from "@/api/apiURL";
import prefix from "../prefix";
import { isDispatchCalling, isDispatchFailed, isDispatchSuccess } from "@/helper/dispatchDedicate";
import apiCall from "@/helper/apiCall";
import { GET_LIST_BOOK, GET_LIST_RANDOM_BOOK } from "../types/bookTypes";
import { Book } from "@/interfaces/bookInterfaces";

const { BOOK } = prefix;

interface GetListBookType {
    type: typeof GET_LIST_BOOK;
    payload: Book[];
}

const getListBookAPIType = { prefix: BOOK, type: GET_LIST_BOOK };

export const getListBook = () => async (dispatch: Dispatch) => {
    const api = API_URLS.BOOK.getListBook();
    dispatch(isDispatchCalling(getListBookAPIType));
    const { response } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(getListBookAPIType, response.data));
    else dispatch(isDispatchFailed(getListBookAPIType, []));
}

interface GetListRandomBookType {
    type: typeof GET_LIST_RANDOM_BOOK;
    payload: Book[];
}

const getListRandomBookAPIType = { prefix: BOOK, type: GET_LIST_RANDOM_BOOK };

export const getMoreListBookInRandom = (number_records: number, tag: number | undefined, search: string | undefined) => async (dispatch: Dispatch) => {
    const api = API_URLS.BOOK.getListRandomBook(number_records, tag, search);
    dispatch(isDispatchCalling(getListRandomBookAPIType));
    const { response } = await apiCall({ ...api });
    if (response) dispatch(isDispatchSuccess(getListRandomBookAPIType, response.data));
    else dispatch(isDispatchFailed(getListRandomBookAPIType));
}

export type BookActionType = GetListBookType | GetListRandomBookType;