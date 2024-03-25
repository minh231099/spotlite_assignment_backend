import { BookInLPCpnState, TagElmInListTagOfBook } from "@/interfaces/bookInterfaces";
import { generateKey } from "@/utils";
import React from "react";
import { IoMdClose } from "react-icons/io";

interface BookDetailsCardProps {
    book: BookInLPCpnState;
    width: number;
    handleClickCloseDetailsBook: () => void;
}

const BookDetailsCard = (props: BookDetailsCardProps) => {
    const { book, width, handleClickCloseDetailsBook } = props;
    const { title, writer, cover_image, point, price, tags } = book;
    const percentPoint = Number(point) / 5 * 100;
    return (
        <div style={{ width: width }} className="CGZyJh7cZJ">
            <div className="rePO5PHXgX">
                <IoMdClose className="W4G0j2Q1qh" onClick={() => { handleClickCloseDetailsBook() }} />
            </div>
            <div className="ECQK1e1li6">
                <div className="AYalw66W7I">
                    <img className="" src={cover_image} />
                </div>
                <div>
                    <div>
                        <span className="Vhy1FkMVAr">{title} - {writer}</span>
                    </div>
                    <div className="rRFPPYwKGi">
                        <span className="">${parseFloat(price).toFixed(2)}</span>
                    </div>
                    <div className="rRFPPYwKGi">
                        <div className="ratings">
                            <div className="empty-stars"></div>
                            <div className="full-stars" style={{ width: `${percentPoint}%` }}></div>
                        </div>
                    </div>
                    <div className="d-flex rRFPPYwKGi">
                        {
                            tags.map((tag: TagElmInListTagOfBook) => (
                                <div key={generateKey()} className="Nle5YmBkxq">
                                    {tag.tag.title}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetailsCard;