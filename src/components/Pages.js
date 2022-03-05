import React, {useEffect, useMemo, useState} from "react";
import {getNovels} from "../novels/novelController";
// import {encodeJsxRuby, encodeRuby} from "../modules/encoder";
import {Episode} from "../classes/Episode";
import {Novel} from "../classes/Novel";
import {EpisodeJsx} from "./EpisodeJsx";
// import {PageJsx} from "./PageJsx";
// import {Index} from "../classes";

export const Pages = (props) => {
    const novelId = props.novelId;
    // const novel = getNovelObj();
    const size = props.size;
    const color = props.color;
    const [pageBgColor, setPageBgColor] = useState("white");
    // const epId = props.epId;
    // const [jsxPages, setJsxPages] = useState([<p>テスト</p>]);
    const [eps, setEps] = useState([]);
    const fontSize = 20;
    const maxWidth = 600;
    const maxHeight = window.innerHeight * 0.8;
    // const fontFamily = "Noto Serif JP, Kosugi, Hiragino Kaku Gothic ProN W3, Helvetica, Meiryo, Tahoma";
    // const fontFamily = props.fontName;
    // let pageNumSum = 0;
    // let lineNumSum = 0;
    // const novelObj = getNovelObj();
    // const [novel, setNovel] = useState({});

    // const fontSizeNum = useMemo(() => {
    //     switch (size){
    //         case "small": return "14px";
    //         case "middle": return "18px";
    //         case "large": return "20px";
    //         case "largest": return "24px";
    //         default: return "16px";
    //     }
    // }, [size]);

    useMemo(() => {
        console.log("color: " + color);
        switch (color){
            case "white": setPageBgColor("white"); break;
            case "black": setPageBgColor("#333"); break;
            case "beige": setPageBgColor("#fedcbb"); break;
            default: setPageBgColor("white");
        }
    }, [color]);

    const initMaxPage = (novel) => {
        let pages = 0;
        novel.episodes.map((ep) => {
            pages += ep.pageObjs.length;
        });
        return props.initMaxPage(pages);
    }

    // const getNovelObj = async() => {
    useEffect(async() => {
        const novelObj = getNovels(novelId);
        let novel = new Novel(novelId, novelObj.title);
        novel.getIndex(novelObj.list, fontSize, maxWidth, maxHeight);
        // let pageSum = 1; // 1 for h1
        let num = 0;
        for (let i = 0; i < novelObj.list.length; i++) {
            num++;
            const array = novelObj.list[i].split("|");
            let episode = new Episode(num, array[2], fontSize, maxHeight, maxWidth);
            const lines = novelObj.texts[num - 1].split("\n");
            await episode.getPages(lines);
            // const pageObjs = await episode.getPages(lines);
            // pageSum += pageObjs.length + 1; // + 1 for h2
            novel.episodes.push(episode);
        }
        initMaxPage(novel);
        let array = [];
        novel.episodes.map((ep) => {
            array.push(
                <EpisodeJsx
                    // id={epNum}
                    title={"novel.title"}
                    ep={ep}
                    fColor={props.fColor}
                />
            );
        });
        setEps(array);
        console.log("array");
        console.log(array);
        // return novel;
        // }
    }, []);

    // const novel = getNovelObj();

    // const h1Style = {
    //     margin: "0",
    //     padding: "0",
    //     fontSize: fontSize * 1.8 + "px",
    //     // fontFamily: fontFamily,
    //     textAlign: "left"
    // }

    // useMemo(() => {
    //     let array = [];
    //     console.log("novel");
    //     console.log(novel);
    //     novel.episodes.map((ep) => {
    //         array.push(
    //             <EpisodeJsx
    //                 // id={epNum}
    //                 title={"novel.title"}
    //                 ep={ep}
    //                 fColor={props.fColor}
    //             />
    //         );
    //     });
    //     setEps(array);
    // }, [novel]);

    useMemo(() => {
        // console.log("outerStyle");
        // console.log(outerStyle);
    }, [pageBgColor]);

    // window.addEventListener('resize', () => {
    //     console.log('resized window');
    //     setWindowWidth(window.innerWidth);
    // });

    return (
        <>
            { eps }
            {/*{(() => {*/}
            {/*{(async () => {*/}
            {/*    const novel = await getNovelObj();*/}
            {/*    console.log("novel");*/}
            {/*    console.log(novel);*/}
            {/*    // let epNum = 0;*/}
            {/*    let jsxArray = [];*/}
            {/*    return novel.episodes.map((ep) => {*/}
            {/*        // return getNovelObj().episodes.map((ep) => {*/}
            {/*        // pageNumSum++;*/}
            {/*        // epNum++;*/}
            {/*        jsxArray.push();*/}
            {/*        return (*/}
            {/*            <>*/}
            {/*                /!*{ pageNumSum === 0 ? getPageJsx(h1, 0, false) : <></> }*!/*/}
            {/*                /!*{ pageNumSum === 1 ? getIndexJsx(novel) : <></> }*!/*/}
            {/*                /!*{ getEpisodeJsx(ep) }*!/*/}
            {/*                /!*<PageJsx*!/*/}
            {/*                /!*    pageNum={pageNumSum}*!/*/}
            {/*                /!*    maxWidth={maxWidth}*!/*/}
            {/*                /!*    maxHeight={maxHeight}*!/*/}
            {/*                /!*    fColor={props.fColor}*!/*/}
            {/*                /!*    isLast={false}*!/*/}
            {/*                />}
            {/*                <EpisodeJsx*/}
            {/*                    // id={epNum}*/}
            {/*                    title={"novel.title"}*/}
            {/*                    ep={ep}*/}
            {/*                    fColor={props.fColor}*/}
            {/*                />*/}
            {/*            </>*/}
            {/*        );*/}
            {/*    });*/}
            {/*})()}*/}
        </>
    );
}