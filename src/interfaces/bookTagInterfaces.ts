export interface BookTag {
    id: number;
    title: string;
}

export interface BookTagState {
    isFetching: boolean,
    error: boolean,
    listBookTag: BookTag[],
}