import React, {useEffect, useMemo, useRef, useState} from "react";
import {getNovels} from "../novels/novelController";
import {encodeRuby} from "../modules/encoder";
// import {getPagesJs} from "../modules/getPagesJs";
import {Page} from "../modules/Page";
import {Episode} from "../modules/Episode";

export const Pages = (props) => {
    const novelId = props.novelId;
    const epId = props.epId;
    const pageObjs = (async() => {
        const lines = getNovels(1, 1).split("\n");
        console.log("await new Episode(1).getPages(lines)");
        console.log(await new Episode(1).getPages(lines));
        return await new Episode(1).getPages(lines);
    })();
    // const pageDivs = (async() => {
    //     const lines = getNovels(1, 1).split("\n");
    //     console.log("await new Episode(1).getPages(lines)");
    //     console.log(await pageObjs();
    //     return await new Episode(1).getPages(lines);
    // })();
    const pageDivs = <p>テスト</p>;
    // (async() => {
    //     const lines = getNovels(1, 1).split("\n");
    //     console.log("await new Episode(1).getPages(lines)");
    //     console.log(await new Episode(1).getPages(lines));
    //     // return await new Episode(1).getPages(lines);
    // })();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const fColor = props.fColor;
    const bgColor = props.bgColor;
    const xy = props.xy;
    // const maxWidth = divRef.current.clientWidth;
    // const maxHeight = divRef.current.clientHeight;
    // const rubyLineHeight = pRef.current.clientHeight; // 一行の高さ（ルビあり）
    // const maxWidth = divRef.current.clientWidth;
    // const maxHeight = divRef.current.clientHeight;

    // const pageDivs = useMemo(async() => {
    //     console.log("pageObjs");
    //     console.log(pageObjs);
    //     return <p>テスト</p>;
    //     // let i = -1;
    //     // return pageObjs.map((page) => {
    //     //     const linesP = page.lines.map((line) => {
    //     //         return <p key={"line-" + i}>{ line }</p>;
    //     //     });
    //     //     i++;
    //     //     return (
    //     //         <div key={"outer-" + i} style={outerStyle}>
    //     //             <div key={"inner-" + i} id={"p-" + i} style={innerStyle}>
    //     //                 { linesP }
    //     //             </div>
    //     //         </div>
    //     //     );
    //     // });
    // }, [pageObjs]);

    const innerMargin = useMemo(() => {
        return xy === "horizontal-tb" ? "0 auto 0 0" : "0 0 0 auto";
    }, [xy]);

    const outerStyle = {
        backgroundColor: bgColor,
        margin: "20px " + ((windowWidth - 700) / 2) + "px",
        padding: "50px",
        width: "700px",
        height: "70vh",
    }
    const innerStyle = {
        color: fColor,
        textAlign: "justify",
        writingMode: xy,
        margin: innerMargin,
    };

    window.addEventListener('resize', () => {
        console.log('resized window');
        setWindowWidth(window.innerWidth);
    });



    // useMemo(() => {
    //     console.log(pageObjs);
    // }, [pageObjs]);

    return (
        <>
            {/*{ createTestPages() }*/}
            { pageDivs }
        </>
    );
}