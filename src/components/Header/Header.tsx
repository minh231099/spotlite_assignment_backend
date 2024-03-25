// Header

import React, { FormEvent, useEffect, useState } from "react";
import { connect } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaSearch, FaRegUserCircle } from "react-icons/fa";
import { RootState } from "@/redux";
import { BookTag } from "@/interfaces/bookTagInterfaces";
import { useAppDispatch } from "@/redux/hooks";
import { getListBookTag } from "@/redux/actions/bookTagAction";
import { generateKey, getRandom } from "@/utils";
import { useRouter } from "next/router";

interface HeaderPagePropsInf {
    listBookTag: BookTag[] | undefined;
}

const logo = './logo.png';

const Header = (props: HeaderPagePropsInf) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { listBookTag } = props;
    const [tenBookTags, setTenBookTags] = useState<BookTag[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        dispatch(getListBookTag());
    }, []);

    // Get 10 random book tags to display in the second line of the Header
    useEffect(() => {
        if (listBookTag && listBookTag?.length) setTenBookTags(getRandom(listBookTag, 10));
    }, [JSON.stringify(listBookTag)]);

    const onClickTag = (tagId: number) => {
        router.push({ pathname: '/', query: { search: searchValue, tag: tagId } });
    }

    const handleChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }

    const handleSubmitSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push({ pathname: '/', query: { search: searchValue } });
    }

    return (
        <div className="lXQBDWVjP9">
            <div className="WUXc7hYjn0">
                <img className="xV5Fpf5oo5" src={logo} />
                <div className="iQKzrjjyKB">
                    <form className="fGPYD7lNTJ" onSubmit={handleSubmitSearch}>
                        <div className="d-flex">
                            <input
                                className="qxzmCNgMbH"
                                type="text"
                                value={searchValue}
                                onChange={handleChangeSearchValue}
                            />
                            <button className="search_button" type="submit">
                                <FaSearch className="search_icon" />
                            </button>
                        </div>
                    </form>
                </div>
                <div className="MQqvoiLXjo">
                    <a className="U6PxHgipzK">Sign In/Sign Up</a>
                    <FaRegUserCircle className="gl5ydhI1MW k6TGSkLPJ7" />
                    <AiOutlineShoppingCart className="gl5ydhI1MW" />
                </div>
            </div>
            <div className="Sex7aAW7Ea">
                {
                    tenBookTags?.length && tenBookTags?.map((booktag: BookTag) => (
                        <div key={generateKey()} className="XzAmhVmgh1 d-flex" onClick={() => { onClickTag(booktag.id) }}>
                            <span className="vm4EHjBqvG">{booktag.title}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        listBookTag: state.bookTagReducer?.listBookTag,
    };
};

export default connect(mapStateToProps)(Header);