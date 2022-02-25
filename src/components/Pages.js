import React, {useEffect, useMemo, useRef, useState} from "react";
import {getNovels} from "../novels/novelController";
import {encodeJsxRuby, encodeRuby} from "../modules/encoder";
import {Episode} from "../classes/Episode";
import {Novel} from "../classes/Novel";

export const Pages = (props) => {
    const novelId = props.novelId;
    // const epId = props.epId;
    const [jsxPages, setJsxPages] = useState([<p>テスト</p>]);
    const fontSize = 20;
    const maxWidth = 600;
    const maxHeight = window.innerHeight * 0.8;
    const fontFamily = "Noto Serif JP, Kosugi, Hiragino Kaku Gothic ProN W3, Helvetica, Meiryo, Tahoma";
    let pageNumSum = 0;

    const initMaxPage = (num) => {
        return props.initMaxPage(num);
    }

    const getLinesJsx = (lines) => {
        let lineNum = 0;
        return lines.map((line) => {
            lineNum++;
            return (
                <p
                    key={"line-" + lineNum}
                    id={"line-" + lineNum}
                    style={pStyle}
                >
                    { encodeJsxRuby(line) }
                </p>);
        });
    }

    const getPageJsx = (linesJsx, pageNum, isLast) => {
        pageNumSum++;
        return (
            <div key={"outer-" + pageNumSum} style={outerStyle}>
                <div key={"inner-" + pageNumSum} style={innerStyle}>
                    <div
                        key={"inner2-" + pageNumSum}
                        style={ isLast ? innerStyle2Last : innerStyle2 }
                    >
                        { linesJsx }
                    </div>
                </div>
            </div>
        );
    }

    const getEpisodeJsx = (ep) => {
        let pageNum = 0;
        // pageNumSum++; // for h2
        const h2 = <h2 key={"title-" + ep.id} style={h2Style}>{ ep.title }</h2>;
        return ep.pageObjs.map((page) => {
            pageNum++;
            const linesP = getLinesJsx(page.lines);
            const isLast = pageNum === ep.pageObjs.length;
            return (
                <>
                    { pageNum === 1 ? getPageJsx(h2, pageNum, isLast) : <></> }
                    { getPageJsx(linesP, pageNum, isLast) }
                </>
                // <div key={"outer-" + pageNumSum} style={outerStyle}>
                //     <div key={"inner-" + pageNumSum} style={innerStyle}>
                //         <div
                //             key={"inner2-" + pageNumSum}
                //             style={ pageNum === ep.pageObjs.length ? innerStyle2Last : innerStyle2 }
                //         >
                //             { pageNum === 1 ? <h2 style={h2Style}>{ ep.title }</h2> : <>{ linesP }</> }
                //             {/*{ linesP }*/}
                //         </div>
                //     </div>
                // </div>
            );
        });
    }

    const getAllEpisodesJsx = (novel) => {
        // let epNum = 0;
        const h1 = <h1 key={"novel_title"} style={h1Style}>{ novel.title }</h1>;
        console.log("novel.title: " + novel.title);
        console.log("pageNumSum: " + pageNumSum);
        return novel.episodes.map((ep) => {
            // epNum++;
            // const pagesDivs = getEpisodeJsx(ep);
            return (
                <>
                    { pageNumSum === 0 ? getPageJsx(h1, 0, false) : <></> }
                    { getEpisodeJsx(ep) }
                </>
            );
        })
    }

    useEffect(async() => {
        const novelObj = getNovels(novelId);
        const novel = new Novel(novelId, novelObj.title);
        let pageSum = 1; // 1 for h1
        let num = 0;
        for(let i = 0; i < novelObj.list.length; i++){
            num++;
            const array = novelObj.list[i].split("|");
            let episode = new Episode(num, array[2], fontSize, maxHeight, maxWidth);
            const lines = novelObj.texts[num - 1].split("\n");
            const pageObjs = await episode.getPages(lines);
            pageSum += pageObjs.length + 1; // + 1 for h2
            novel.episodes.push(episode);
        }
        initMaxPage(pageSum);
        const episodesJsx = getAllEpisodesJsx(novel);
        setJsxPages(episodesJsx);
    }, []);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const fColor = props.fColor;
    const bgColor = props.bgColor;
    // const xy = props.xy;

    const outerStyle = {
        backgroundColor: bgColor,
        flexBasis: "700px",
        margin: "20px " + ((windowWidth - maxWidth - 100) / 2) + "px",
        padding: "50px 0",
        display: "block",
    }
    const innerStyle = {
        color: fColor,
        textAlign: "center",
        verticalAlign: "middle",
        width: maxWidth + 100 + "px",
        height: maxHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        writingMode: "vertical-rl"
    };
    const innerStyle2 = {
        margin: "0 auto"
    }
    const innerStyle2Last = {
        margin: "0 40px 0 auto"
    }
    const pStyle = {
        margin: "0",
        padding: "0",
        lineHeight: "200%",
        fontSize: fontSize + "px",
        fontFamily: fontFamily,
        textAlign: "left"
    }
    const h1Style = {
        margin: "0",
        padding: "0",
        fontSize: fontSize * 1.8 + "px",
        fontFamily: fontFamily,
        textAlign: "left"
    }
    const h2Style = {
        margin: "0",
        padding: "0",
        fontSize: fontSize * 1.3 + "px",
        fontFamily: fontFamily,
        textAlign: "left"
    }
    // const linkStyle = {
    //     color: fColor,
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