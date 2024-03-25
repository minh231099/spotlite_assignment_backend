import { BookTag } from "./bookTagInterfaces";

export interface Book {
    id: number;
    title: string;
    writer: string;
    point: string;
    cover_image: string;
    price: string;
    tags: TagElmInListTagOfBook[];
}

export interface TagElmInListTagOfBook {
    id: number;
    tag: BookTag;
}

export interface BookState {
    isFetching: boolean,
    error: boolean,
    listBook: Book[],
}

export interface BookInLPCpnState extends Book {
    details: boolean | undefined;
}