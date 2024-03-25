import React, { memo, useEffect, useState } from 'react';
import { Book, BookInLPCpnState } from '@/interfaces/bookInterfaces';
import { generateKey } from '@/utils';
import BookCard from '@/components/BookCard';
import BookDetailsCard from '../BookDetailsCard';

interface ListProductProps {
    listBook: BookInLPCpnState[];
    handleClickBook: (book: BookInLPCpnState, index: number) => void;
    insertElmWidth: number;
    handleClickCloseDetailsBook: (index: number) => void;
}

// Use memo to avoid unnecessary re-rendering of product lists
const ListProduct = memo(({ listBook, insertElmWidth, handleClickBook, handleClickCloseDetailsBook }: ListProductProps) => {

    return (
        <>
            {
                listBook?.map((book: BookInLPCpnState, index: number) => {
                    if (book.details) {
                        return (
                            <div key={generateKey()}>
                                <BookDetailsCard book={book} width={insertElmWidth} handleClickCloseDetailsBook={() => {handleClickCloseDetailsBook(index)}} />
                            </div>
                        )
                    } else {
                        return (
                            <div id="bookCardDefault" key={generateKey()} className="jFhTtiQxKt" onClick={() => { handleClickBook(book, index) }}>
                                <BookCard book={book} />
                            </div>
                        )
                    }
                })
            }
        </>
    )
});

export default ListProduct;