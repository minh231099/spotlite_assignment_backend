const HEADERS = {
    DEFAULT_HEADER: {
        'Content-Type': 'application/json; charset=UTF-8',
    }
};

//List of API urls

export const API_URLS = {
    BOOKTAG: {
        getListBookTag: () => ({
            endPoint: `v1/booktag`,
            method: 'GET',
            headers: HEADERS.DEFAULT_HEADER,
        })
    },
    BOOK: {
        getListBook: () => ({
            endPoint: `v1/book`,
            method: 'GET',
            headers: HEADERS.DEFAULT_HEADER,
        }),
        getListRandomBook: (number_records: number, tag: number | undefined, search: string | undefined) => {
            const queryParams = {
                number_records: number_records.toString(),
            }
            let queryString = new URLSearchParams(queryParams).toString();
            if (tag != undefined) {
                queryString += `&tag=${tag}`;
            }
            if (search != undefined) {
                queryString += `&search=${search}`;
            }
            return ({
                endPoint: `v1/book/random?${queryString}`,
                method: 'GET',
                headers: HEADERS.DEFAULT_HEADER,
            })
        }
    }
}