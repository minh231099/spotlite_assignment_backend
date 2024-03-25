import { Dispatch } from "redux";
import { API_URLS } from "@/api/apiURL";
import prefix from "../prefix";
import { isDispatchCalling, isDispatchFailed, isDispatchSuccess } from "@/helper/dispatchDedicate";
import apiCall from "@/helper/apiCall";
import { GET_LIST_BOOK_TAG } from "../types/bookTagTypes";
import { BookTag } from "@/interfaces/bookTagInterfaces";

const { BOOKTAG } = prefix;

interface GetListBookTagType {
    type: typeof GET_LIST_BOOK_TAG;
    payload: BookTag[];
}

const getListBookTagAPIType = { prefix: BOOKTAG, type: GET_LIST_BOOK_TAG };

export const getListBookTag = () => async (dispatch: Dispatch) => {
    const api = API_URLS.BOOKTAG.getListBookTag();
    dispatch(isDispatchCalling(getListBookTagAPIType));
    const { response } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(getListBookTagAPIType, response.data));
    else dispatch(isDispatchFailed(getListBookTagAPIType, []));
}

export type BookTagActionType = GetListBookTagType;