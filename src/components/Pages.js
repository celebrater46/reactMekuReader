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

    // const getMaxPage = (novel) => {
    //     let sum = 0;
    //     novel.episodes.map((ep) => {
    //         ep.pageObjs.map(() => {
    //             sum++;
    //         })
    //     });
    //     return sum;
    // }

    const asyncReturn = (obj) => {
        return new Promise((resolve, reject)=> {
            // let episodes = [];
            // for(let i = 0; i < obj.list.length; i++){
            //
            // }
            // resolve(
                const pageObjs = obj.list.map(async(line) => {
                    // console.log("line:" + line);
                    num++;
                    const array = line.split("|");
                    let episode = new Episode(num, array[2], fontSize, maxHeight, maxWidth);
                    const pageObj = await episode.getPages(obj.texts[num - 1]);
                    // pageSum += pageObjs.length;
                    // return episode;
                    // console.log("pageObj:");
                    // console.log(pageObj);
                    console.log("episode");
                    console.log(episode);
                    // novel.episodes.push(episode);
                    // novel.addEpisode(episode);
                    // novel.episodes.push(pageObjs);
                    // console.log("novel:");
                    // console.log(novel);
                    // return pageObjs;
                    return episode;
                })
            // );
            // resolve(episodes);
            console.log("pageObjs");
            console.log(pageObjs);
        // novel.episodes.concat(episodes);
        // resolve({ obj: novel, sum: pageSum });
    })};

    const getNovelObj = async(obj) => {
        return await asyncReturn(obj);
    }

    useEffect(async() => {
        const novelObj = getNovels(novelId);
        // const novel = new Novel(novelId, novelObj.title);
        let pageSum = 0;
        const episodes = await getNovelObj(novelObj);
        // console.log("novelObj");
        // console.log(novelObj);

        // const lines = getNovels(2, 1).split("\n");
        // console.log("await new Episode(1).getPages(lines)");
        // console.log("num: " + num);
        // const episode = await new Episode(1, title, fontSize, maxHeight, maxWidth).getPages(lines);
        console.log("episodes:");
        console.log(episodes);
        // const novel = await getNovelObj();
        // const pages = getAllEpisodesJsx(novel.obj);
        // console.log("pages:");
        // console.log(pages);
        // console.log("novel");
        // console.log(novel);
        // console.log("novel.sum: " + novel.sum);
        // setJsxPages(pages);
        // initMaxPage(novel.sum);
    }, []);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const fColor = props.fColor;
    const bgColor = props.bgColor;
    const xy = props.xy;

    // const innerMargin = useMemo(() => {
    //     return xy === "horizontal-tb" ? "0 auto 0 0" : "0 0 0 auto";
    // }, [xy]);

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