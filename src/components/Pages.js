import React, {useEffect, useMemo, useRef, useState} from "react";
import {getNovels} from "../novels/novelController";
import {encodeJsxRuby, encodeRuby} from "../modules/encoder";
import {Episode} from "../classes/Episode";
import {Novel} from "../classes/Novel";

export const Pages = (props) => {
    const novelId = props.novelId;
    const epId = props.epId;
    const [jsxPages, setJsxPages] = useState([<p>テスト</p>]);
    const fontSize = 20;
    const maxWidth = 600;
    const maxHeight = window.innerHeight * 0.8;
    let num = 0;

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

    const getEpisodeJsx = (pages) => {
        let pageNum = 0;
        return pages.map((page) => {
            pageNum++;
            const linesP = getLinesJsx(page.lines);
            return (
                <div key={"outer-" + pageNum} style={outerStyle}>
                    <div key={"inner-" + pageNum} style={innerStyle}>
                        <div
                            key={"inner2-" + pageNum}
                            style={ pageNum === pages.length ? innerStyle2Last : innerStyle2 }
                        >
                            { linesP }
                        </div>
                    </div>
                </div>
            );
        });
    }

    const getAllEpisodesJsx = (novel) => {
        let epNum = 0;
        return novel.episodes.map((ep) => {
            epNum++;
            const pagesDivs = getEpisodeJsx(ep.pageObjs);
            return { pagesDivs };
        })
    }

    useEffect(async() => {
        const novelObj = getNovels(novelId);
        const novel = new Novel(novelId, novelObj.title);
        let pageSum = 0;
        for(let i = 0; i < novelObj.list.length; i++){
            num++;
            const array = novelObj.list[i].split("|");
            let episode = new Episode(num, array[2], fontSize, maxHeight, maxWidth);
            const pageObjs = await episode.getPages(novelObj.texts[num - 1]);
            pageSum += pageObjs.length;
            novel.episodes.push(episode);
        }
        console.log("novel:");
        console.log(novel);
        initMaxPage(pageSum);
    }, []);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const fColor = props.fColor;
    const bgColor = props.bgColor;
    const xy = props.xy;

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
        fontFamily: "Noto Serif JP, Kosugi, Hiragino Kaku Gothic ProN W3, Helvetica, Meiryo, Tahoma",
        textAlign: "left"
    }
    const linkStyle = {
        color: fColor,
        writingMode: "vertical-rl"
    }

    window.addEventListener('resize', () => {
        console.log('resized window');
        setWindowWidth(window.innerWidth);
    });

    return (
        <>
            <div style={linkStyle}>前のエピソードへ</div>
            { jsxPages }
            <div style={linkStyle}>次のエピソードへ</div>
        </>
    );
}