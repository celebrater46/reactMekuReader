import React, {useState} from "react";
import {PageJsx} from "./PageJsx";

export const EpisodeJsx = (props) => {
    // const id = props.id;
    const ep = props.ep;
    let pageNum = 0;
    // const [isSubTitle, setIsSubTitle] = useState(false);
    const [pageType, setPageType] = useState(0); // 0 == title, 1 == subtitle, 2 == index, 3 == body
    // const lines
    // pageNumSum++; // for h2
    // const h2 = <h2 key={"title-" + ep.id} style={h2Style}>{ ep.title }</h2>;
    const changePageNum = (epNum) => {
        return props.changePageNum(epNum);
    }
    const changePageType = (num) => {
        setPageType(num);
    }
    return (
        <>
            {(() => {
                return ep.pageObjs.map((page) => {
                    pageNum++;
                    // const linesP = getLinesJsx(page.lines);
                    // const isLast = pageNum === ep.pageObjs.length;
                    return (
                        <>
                            {/*{ pageNum === 1 ? getPageJsx(h2, pageNum, isLast) : <></> }*/}
                            {/*{ getPageJsx(linesP, pageNum, isLast) }*/}
                            <PageJsx
                                title={props.title}
                                epId={ep.id}
                                pageNum={pageNum}
                                fColor={props.fColor}
                                lines={page.lines}
                                pageType={pageType}
                                changePageNum={(epNum) => changePageNum(epNum)}
                                changePageType={((num) => changePageType(num))}
                            />
                        </>
                    );
                })
            })()}
        </>
    )
}