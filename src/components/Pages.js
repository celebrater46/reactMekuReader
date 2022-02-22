import React, {useEffect, useMemo, useRef, useState} from "react";
import {getNovels} from "../novels/novelController";
import {encodeRuby} from "../modules/encoder";
// import {getPagesJs} from "../modules/getPagesJs";
import {Page} from "../modules/Page";
import {Episode} from "../modules/Episode";

export const Pages = (props) => {
    const novelId = props.novelId;
    const epId = props.epId;
    const [jsxPages, setJsxPages] = useState([<p>テスト</p>]);
    const fontSize = 20;
    const maxWidth = window.innerHeight * 0.8;
    const maxHeight = 600;
    let num = 0;
    // const pageObjs = (async() => {
    useEffect(async() => {
        if(num > 1000){
            console.log("endless loop occurred");
            return null;
        } else {
            const lines = getNovels(1, 1).split("\n");
            console.log("await new Episode(1).getPages(lines)");
            num++;
            console.log("num: " + num);
            const episode = await new Episode(1, fontSize, maxWidth, maxHeight).getPages(lines);
            console.log("episode:");
            console.log(episode);
            let pageNum = 0;
            const pages = episode.map((page) => {
                pageNum++;
                let lineNum = 0;
                const linesP = page.lines.map((line) => {
                    lineNum++;
                    return <p key={"line-" + lineNum} id={"line-" + lineNum} style={pStyle}>{ line }</p>;
                });
                return (
                    <div key={"outer-" + pageNum} style={outerStyle}>
                        <div key={"inner-" + pageNum} id={"p-" + pageNum} style={innerStyle}>
                            { linesP }
                        </div>
                    </div>
                );
            });
            console.log("pages:");
            console.log(pages);
            setJsxPages(pages);
        }
    }, []);


    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const fColor = props.fColor;
    const bgColor = props.bgColor;
    const xy = props.xy;

    const innerMargin = useMemo(() => {
        return xy === "horizontal-tb" ? "0 auto 0 0" : "0 0 0 auto";
    }, [xy]);

    const outerStyle = {
        backgroundColor: bgColor,
        margin: "20px " + ((windowWidth - maxWidth + 100) / 2) + "px",
        padding: "50px",
        width: "700px",
        height: "70vh",
    }
    const innerStyle = {
        color: fColor,
        textAlign: "justify",
        // writingMode: xy,
        // margin: innerMargin,
        margin: "0 0 0 auto",
        width: maxHeight,
        height: maxWidth,
        // width: maxWidth,
        // height: maxHeight,
        backgroundColor: "#000",
        // margin: "20px",
        writingMode: "vertical-rl"
    };
    const pStyle = {
        margin: "0",
        // padding: fontSize * 0.6 + "px 0 0",
        // lineHeight: "100%",
        padding: "0",
        lineHeight: "200%",
        fontSize: fontSize + "px",
        fontFamily: "Noto Serif JP, Kosugi, Hiragino Kaku Gothic ProN W3, Helvetica, Meiryo, Tahoma",
        textAlign: "left"
    }
    // const divStyle = {
    //     width: maxHeight,
    //     height: maxWidth,
    //     // width: maxWidth,
    //     // height: maxHeight,
    //     backgroundColor: "#000",
    //     margin: "20px",
    //     writingMode: "vertical-rl"
    // }

    window.addEventListener('resize', () => {
        console.log('resized window');
        setWindowWidth(window.innerWidth);
    });

    return (
        <>
            { jsxPages }
        </>
    );
}