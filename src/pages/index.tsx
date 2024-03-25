import { Book, BookInLPCpnState } from "@/interfaces/bookInterfaces";
import { BookTag } from "@/interfaces/bookTagInterfaces";
import { generateKey } from "@/utils";
import { RootState } from "@/redux";
import { getMoreListBookInRandom } from "@/redux/actions/bookAction";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import dynamic from 'next/dynamic';
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/router';
import { GetListBookParams, HomePropsInterface } from "@/interfaces/homeInterfaces";

const ListProduct = dynamic(() => import('@/components/ListProduct'));

const Home = (props: HomePropsInterface) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { tag, search } = router.query as { tag: string, search: string };
    const { listBookTag, listBook, isFetching } = props;

    const [loadMore, setLoadMore] = useState<boolean>(true);
    const [infiniteData, setInfiniteData] = useState<BookInLPCpnState[]>([]);

    // Function to get book data
    const getProductData = (params: GetListBookParams) => {
        const { number_records, tag, search } = params
        const tagId = typeof tag === 'string' ? parseInt(tag) : undefined;
        dispatch(getMoreListBookInRandom(number_records, tagId, search));
    }

    // Track tag and search changes
    useEffect(() => {
        if (tag || search) {
            setInfiniteData([]);
        }
    }, [tag, search]);

    // Track loadMore and infiniteData changes, when we need load more data or no data to show, we will fetch new data
    useEffect(() => {
        if (loadMore || !infiniteData.length) {
            getProductData({
                number_records: 15,
                tag: tag,
                search: search,
            });
            setLoadMore(false);
        }
    }, [loadMore, infiniteData]);

    // Every time the listBook state changes, 
    // I will connect it and the currently displayed list, 
    // and check if that is enough for the user to continue scrolling down, 
    // if not, I will notify to get more data.
    useEffect(() => {
        if (listBook && listBook.length) {
            setInfiniteData([...infiniteData, ...listBook] as BookInLPCpnState[]);
        }
        const list = document.getElementById('product-list');

        if (!list) return;

        if (list.clientHeight && list.clientHeight + list.offsetTop <= window.scrollY + window.innerHeight) {
            setLoadMore(true);
        }
    }, [listBook]);

    // Used to separately monitor loadMore
    // If we don't need more data, we will create an event to track the user's scrolling action. If they scroll to 80%, we will fetch new data.
    // The formula for calculation and comparison is:
    // list.clientHeight will return the height of the element with id 'product-list'
    // list.offsetTop will return the distance of the current element to its closest upper ancestor element
    // window.scrollY is the current vertical position
    // window.innerHeight is the height of the content area
    // so we will be able to check whether the current position has reached the last position of the web page or not with the formula:
    // window.scrollY + window.innerHeight >= list.clientHeight + list.offsetTop
    // and if we only take 80% of (list.clientHeight + list.offsetTop) to compare, we can check whether 80% of the content has been reached or not.

    // Here I add a debounce function that will be used to create a timeout before running the internal callback
    // To avoid having the same data called repeatedly at the same time (try to avoid screen flickering when re-rendering the list)
    useEffect(() => {
        if (!loadMore && !isFetching) {
            const handleScroll = () => {
                const list = document.getElementById('product-list');
                if (!list) return;
                const eightyPercentHeight = (list.clientHeight + list.offsetTop) / 100 * 80;
                if (window.scrollY + window.innerHeight >= eightyPercentHeight) {
                    setLoadMore(true);
                }
            };

            const debouncedScrollHandler = debounce(handleScroll, 300);

            window.addEventListener('scroll', debouncedScrollHandler);

            return () => {
                window.removeEventListener('scroll', debouncedScrollHandler);
            };
        }
    }, [loadMore, isFetching]);

    const openNav = () => {
        const tagSideBar = document.getElementById("tagSideBar");

        if (tagSideBar) {
            tagSideBar.style.width = "250px";
        }
    }

    const closeNav = () => {
        const tagSideBar = document.getElementById("tagSideBar");

        if (tagSideBar) {
            tagSideBar.style.width = "0";
        }
    }

    const onClickTag = (tagId: number) => {
        router.push({ pathname: '/', query: { search: search, tag: tagId } });
    }

    const [insertElmWidth, setInsertElmWidth] = useState<number>(0);
    const [currentIdxElmInserted, setCurrentIdxElmInserted] = useState<number | undefined>();

    const handleClickBook = (book: BookInLPCpnState | undefined, index: number | undefined) => {
        if (book && index !== undefined) {
            const list = document.getElementById('product-list');
            if (list) {
                const computedStyle = window.getComputedStyle(list);
                const offsetWidth = list.offsetWidth;
                const leftPadding = parseFloat(computedStyle.paddingLeft);
                const rightPadding = parseFloat(computedStyle.paddingRight);

                const numberProductInRows = Math.floor((offsetWidth - leftPadding - rightPadding) / 210);
                const rowsOfBook = Math.ceil((index + 1) / numberProductInRows);
                const insertIndex = rowsOfBook * numberProductInRows;
                const newElm = {
                    ...book,
                    details: true,
                }
                let newArray: BookInLPCpnState[] = [];
                if (currentIdxElmInserted !== undefined) {
                    const oldOneIndex = Math.ceil((currentIdxElmInserted! + 1) / numberProductInRows) * numberProductInRows;
                    const newArrayAfterDeleteOldElm = [...infiniteData.slice(0, oldOneIndex), ...infiniteData.slice(oldOneIndex + 1)];
                    newArray = [...newArrayAfterDeleteOldElm.slice(0, insertIndex), newElm, ...newArrayAfterDeleteOldElm.slice(insertIndex + 1)] as BookInLPCpnState[];
                } else {
                    newArray = [...infiniteData.slice(0, insertIndex), newElm, ...infiniteData.slice(insertIndex)] as BookInLPCpnState[];
                }
                setInfiniteData(newArray);
                setCurrentIdxElmInserted(index);
                setInsertElmWidth(210 * numberProductInRows + numberProductInRows - 1);
            }
        }
    }

    const handleClickCloseDetailsBook = (indexDelete: number | undefined) => {
        if (indexDelete !== undefined) {
            const newArray = infiniteData.filter((_, index) => index !== indexDelete);
            setInfiniteData(newArray);
            setCurrentIdxElmInserted(undefined);
        }
    }

    const [hasResize, setHasResize] = useState<boolean>(false);
    const [prevWidth, setPrevWidth] = useState<number>(0);

    useEffect(() => {
        if (hasResize) {
            setHasResize(false);
            const list = document.getElementById('product-list');
            if (list) {
                const computedStyle = window.getComputedStyle(list);
                const offsetWidth = list.offsetWidth;
                const leftPadding = parseFloat(computedStyle.paddingLeft);
                const rightPadding = parseFloat(computedStyle.paddingRight);
                const numberProductInRows = Math.floor((offsetWidth - leftPadding - rightPadding) / 210);
                const oldOneIndex = Math.ceil((currentIdxElmInserted! + 1) / numberProductInRows) * numberProductInRows;
                const newArray = [...infiniteData.slice(0, oldOneIndex), ...infiniteData.slice(oldOneIndex + 1)];
                setInfiniteData(newArray);
            }
        }
    }, [hasResize]);

    useEffect(() => {
        const getWindowWidth = () => {
            return typeof window !== 'undefined' ? window.innerWidth : 0;
        };
        setPrevWidth(getWindowWidth());
        const handleResize = () => {
            const list = document.getElementById('product-list');
            if (list) {
                const computedStyle = window.getComputedStyle(list);
                const offsetWidth = list.offsetWidth;
                const leftPadding = parseFloat(computedStyle.paddingLeft);
                const rightPadding = parseFloat(computedStyle.paddingRight);

                const currentWidth = offsetWidth - leftPadding - rightPadding;
                if (Math.abs(prevWidth - currentWidth) >= 210) {
                    setPrevWidth(currentWidth);
                    setHasResize(true);
                }
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [prevWidth]);

    return (
        <div className="page-container">
            <div className="msRKGPjYAd d-flex">
                <div className="zv2RGQoQv6">
                    {
                        listBookTag?.map((bookTag: BookTag) => (
                            <div key={generateKey()} className="Ivp7E76m11">
                                <span className="pNtcWzy37E" onClick={() => { onClickTag(bookTag.id) }}>{bookTag.title}</span>
                            </div>
                        ))
                    }
                </div>
                <div className="hZhp3s2VUP" onClick={openNav}>
                    <IoIosArrowForward />
                </div>
                <div id="tagSideBar" className="u1CUXGn31Q">
                    <a className="hyWKvtwzYf" onClick={closeNav}>×</a>
                    {
                        listBookTag?.map((bookTag: BookTag) => (
                            <a key={generateKey()} onClick={() => { onClickTag(bookTag.id) }}>{bookTag.title}</a>
                        ))
                    }
                </div>
                <div id='product-list' className="o2OT2mOgbo">
                    <ListProduct
                        listBook={infiniteData! as BookInLPCpnState[]}
                        handleClickBook={handleClickBook}
                        insertElmWidth={insertElmWidth}
                        handleClickCloseDetailsBook={handleClickCloseDetailsBook}
                    />
                </div>
            </div>
        </div>

    )
}

function debounce(func: Function, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

const mapStateToProps = (state: RootState) => {
    return {
        listBookTag: state.bookTagReducer?.listBookTag,
        listBook: state.bookReducer?.listBook,
        isFetching: state.bookReducer?.isFetching,
    };
};

export default connect(mapStateToProps)(Home);