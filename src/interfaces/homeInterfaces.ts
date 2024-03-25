import { Book } from "./bookInterfaces";
import { BookTag } from "./bookTagInterfaces";

export interface HomePropsInterface {
    listBookTag: BookTag[] | undefined;
    listBook: Book[] | undefined;
    scrollable: boolean;
    isFetching: boolean | undefined;
}

export interface GetListBookParams {
    number_records: number;
    tag: string;
    search: string;
}