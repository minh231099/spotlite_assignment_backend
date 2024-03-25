import { Book } from "@/interfaces/bookInterfaces";
import React from "react";

interface BookInfoDropDownInterface {
    book: Book;
}

const BookInfoDropDown = (props: BookInfoDropDownInterface) => {
    const { book } = props;

    return (
        <div>
            
        </div>
    )
}

export default BookInfoDropDown;