import React, {useState} from "react";
import {encodeJsxRuby} from "../modules/encoder";
import {Line} from "./Line";
import {Title} from "./Title";
import {SubTitle} from "./SubTitle";

export const PageJsx = (props) => {
    const epId = props.epId;
    const pageNum = props.pageNum;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const margin = "20px " + ((windowWidth - props.maxWidth - 100) / 2) + "px";
    const fColor = props.fColor;
    const isJsx = pageNum === 1;
    const [lineId, setLineId] = useState(0);
    // const isTitle = pageNum === 1;
    // const isIndex = pageNum === 1;
    // const isSubtitle = props.isSubTitle;
    const pageType = props.pageType;
    const outerStyle = {
        flexBasis: "700px",
        margin: margin,
        padding: "50px 0",
        display: "block",
    }
    const innerStyle = {
        color: fColor,
        textAlign: "center",
        verticalAlign: "middle",
        width: props.maxWidth + 100 + "px",
        height: props.maxHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        writingMode: "vertical-rl"
    };
    const innerStyle2 = {
        color: fColor,
        margin: "0 auto"
    }
    const innerStyle2Last = {
        color: fColor,
        margin: "0 40px 0 auto"
    }
    const changePageNum = (epNum) => {
        return props.changePageNum(epNum);
    }
    const changePageType = (num) => {
        return props.changePageType(num);
    }
    window.addEventListener('resize', () => {
        console.log('resized window');
        setWindowWidth(window.innerWidth);
    });

    // pageNumSum++;
    return (
        <div key={"outer-" + epId + "-" + pageNum} style={outerStyle}>
            <div key={"inner-" + epId + "-" + pageNum} style={innerStyle}>
                <div
                    key={"inner2-" + pageNum}
                    style={ props.isLast ? innerStyle2Last : innerStyle2 }
                >
                    {(() => {
                        switch (pageType){
                            case 0:
                                changePageType(pageType + 1);
                                return(
                                    <Title title={props.title} />
                                );
                            case 1:
                                changePageType(pageType + 1);
                                return(
                                    <SubTitle title={props.title} epId={epId} />
                                );
                            case 2:
                            case 3:
                                changePageType(pageType + 1);
                                return props.lines.map((line) => {
                                    setLineId(lineId + 1);
                                    return(
                                        <Line
                                            epId={epId}
                                            pageNum={pageNum}
                                            lineId={lineId}
                                            isIndex={pageType === 1}
                                            // isTitle={props.isTitle}
                                            isJsx={isJsx}
                                            fontSize={props.fontSize}
                                            fontFamily={props.fontFamily}
                                            line={line}
                                            changePageNum={(epNum) => changePageNum(epNum)}
                                        />
                                    );
                                });
                            default:
                                return(<p>PageJsx pageType の値({pageType})が不正です。</p>);
                        }
                        // return props.lines.map((line) => {
                        //     setLineId(lineId + 1);
                        //     return(
                        //         <Line
                        //             epId={epId}
                        //             pageNum={pageNum}
                        //             lineId={lineId}
                        //             isIndex={false}
                        //             // isTitle={props.isTitle}
                        //             isJsx={isJsx}
                        //             fontSize={props.fontSize}
                        //             fontFamily={props.fontFamily}
                        //             line={line}
                        //             changePageNum={(epNum) => changePageNum(epNum)}
                        //         />
                        //     );
                        // });
                    })()}
                </div>
            </div>
        </div>
    );
}