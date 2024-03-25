//Book Card

import React from "react";
import { Book } from "@/interfaces/bookInterfaces";

interface BookCardPropsInterface {
    book: Book;
}

const BookCard = (props: BookCardPropsInterface) => {
    const { title, cover_image, point, price } = props.book;

    const percentPoint = Number(point) / 5 * 100;

    return (
        <div className="tYVnHTSKpE d-flex">
            <img className="SIx0XQT03o" src={cover_image} />
            <div>
                <div className="by1ijRWvpg d-flex">
                    <span className="dnZGqkKj32">{title}</span>
                </div>
                <div className="w2m7E1jtZ3 d-flex">
                    <div className="ratings">
                        <div className="empty-stars"></div>
                        <div className="full-stars" style={{ width: `${percentPoint}%` }}></div>
                    </div>
                </div>
                <div className="xGTisua2x9 d-flex">
                    <span className="VPYajmAgbL">${parseFloat(price).toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
}

export default BookCard;