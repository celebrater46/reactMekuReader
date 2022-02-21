import React, {useEffect, useMemo, useRef, useState} from "react";
import {Page} from "../modules/Page";
import {encodeJsxRuby} from "../modules/encoder";
import {getNovels} from "../novels/novelController";

export const Scale = (props) => {
    const novelId = 1;
    const epId = 1;
    const [linesUs, setLinesUs] = useState([]); // lines Use State
    const [pageObjs, setPageObjs] = useState([]);
    const maxWidth = 600;
    const maxHeight = window.innerHeight * 0.8;
    const [scaleP, setScaleP] = useState([<ruby><rb>試験</rb><rp>（</rp><rt>テスト</rt><rp>）</rp></ruby>]);
    const [scaleP2, setScaleP2] = useState("テスト２");
    const fontSize = 20; // px
    const rubyLineHeight = fontSize * 1.6; // px
    const maxChars = Math.floor(maxWidth / fontSize);

    // useMemo(() => {
    //     const novel = getNovels(novelId, epId);
    //     const converted = encodeRuby(novel).split("\n");
    //     setLinesUs(converted);
    // }, [novelId, epId]);

    const getIndexOfLineBreak = (line, remainLines) => {
        const maxHeight = rubyLineHeight * remainLines;
        let str = line;
        let num = 0;
        let sumHeight = rubyLineHeight;
        while(str.length > maxChars){
            let rubyChars = 0; // 行内にルビが存在した場合の補正値（改行したらリセット）
            const rubyIndex = str.indexOf("｜");
            console.log("rubyIndex: " + rubyIndex);
            if(rubyIndex > -1 && rubyIndex < maxChars + rubyChars){
                const ruby = str.match(/｜([^《]+)《([^》]+)》/);
                console.log("ruby:");
                console.log(ruby);
                const ratio = ruby[2].length / ruby[1].length; // 1-3: 1.5, 2-5: 2.5, 1-5: 2.5
                const trueChars = ratio > 2 ? ruby[2].length / 2 : ruby[1].length;
                console.log("trueChars: " + trueChars);
                const currentWidth = rubyIndex * fontSize + trueChars * fontSize;
                if(currentWidth > maxWidth){
                    num += rubyIndex;
                    sumHeight += rubyLineHeight;
                    if(sumHeight > maxHeight){
                        return num;
                    } else {
                        str = str.substr(rubyIndex);
                        rubyChars = 0;
                    }
                } else {
                    // ここにサラリーマンは｜存在しない《ノット・イクシスト》。
                    num += ruby[0].length - trueChars;
                    // rubyChars += ruby[0].length - trueChars;
                    let checked = "";
                    for(let i = 0; i < trueChars; i++){
                        checked += "‖"; // pien
                    }
                    str = str.replace(ruby[0], checked);
                    // str = str.replace("｜", "‖");
                }
            } else {
                num += maxChars + rubyChars;
                sumHeight += rubyLineHeight;
                if(sumHeight > maxHeight){
                    return num;
                } else {
                    str = str.substr(maxChars);
                    rubyChars = 0;
                }
            }
            if(num > 5000){
                console.log("endless loop occurred")
                return -1; // 無限ループエラー対策
            }
            console.log("num: " + num);
        }
        if(sumHeight + rubyLineHeight > maxHeight){
            return num;
        } else {
            return -1; // ページ内にすべての文字が収まる場合
        }
    }

    // 禁則処理によって排除される文字数を算出
    const getNumOfDeletedCharsByKinsokuOneLine = (line) => {
        const char = line.substr(maxChars - 1, 1);
        const next = line.substr(maxChars, 1);
        if(char.search(/[「『（《〈【〚［〔｛]/) > -1){
            return 1;
        } else if(char === "―") {
            if(line.substr(maxChars, 1) === "―"){
                return 1;
            }
        } else if(char === "…") {
            if(line.substr(maxChars, 1) === "…"){
                return 1;
            } else if(line.substr(maxChars - 1, 1) === "…"){
                return 2;
            }
        } else if(next.search(/[、。」』）》〉】〛］〕｝]/) > -1){
            return 1;
        }
        return 0;
    }

    const getNumOfDeletedCharsBykinsoku = (line) => {
        let sum = 0;
        let remains = line;
        let i = 0;
        while(remains.length > 0){
            const num = getNumOfDeletedCharsByKinsokuOneLine(remains);
            remains = remains.substr(maxChars - num);
            sum += num;

            // 無限ループ対策
            if(i > 1000){
                alert("endless loop occurred");
            }
        }
        console.log("sum: " + sum);
        return sum;
    }

    const separateFinalLine = (line, remainLines) => {
        const rubyIndex = line.indexOf("｜");
        const max = maxChars * remainLines;
        console.log("max: " + max);
        if(rubyIndex > -1 && rubyIndex < max){
            // ルビが１行内にあるなら、新しい改行ポイント indexOf を取得
            const lineBreak = getIndexOfLineBreak(line, remainLines);
            console.log("lineBreak: " + lineBreak);
            // １行で収まりきらない場合は分割
            if(line.length > lineBreak){
                return [line.substr(0, lineBreak), line.substr(lineBreak)];
            }
        } else {
            if(line.length > max){
                const kinsoku = getNumOfDeletedCharsBykinsoku(line);
                const line1 = line.substr(0, max - kinsoku);
                const line2 = line.substr(max - kinsoku);
                return [line1, line2];
            }
        }
        return [line, null];
    }

    const createPage = (i, remainLines) => new Promise((resolve, reject) => {
        let page = new Page(i);
        // let lines = encodeRuby(remainText).split("\n");
        let lines = remainLines;
        // console.log("lines");
        // console.log(lines);
        let finalLine = 0;
        // console.log("lines")
        // console.log("currentHeight: " + currentHeight);
        // console.log("maxHeight: " + maxHeight);
        let currentHeight = rubyLineHeight;
        for(let j = 0; j < lines.length; j++){
            // if(divRef.current.clientHeight < maxHeight){
            if(currentHeight < maxHeight){
                const key = "line-" + i + "_" + j;
                // const p = <p key={key} id={key} style={pStyle}>{ lines[j] }</p>;
                page.lines.push(lines[j]);
                currentHeight += rubyLineHeight;
                // page.lines[j] = <p key={key} id={key} style={pStyle}>{ lines[j] }</p>;
                // setScaleP(scaleP.push(p));
                // page.lines.push(lines[j]);
                // console.log("page.lines.pushed");
                // console.log(page.lines);
                // console.log("currentHeight: " + currentHeight);
            } else {
                if(finalLine === 0){
                    finalLine = j - 1;
                }
            }
        }

        if(finalLine > 0){
            // setScaleP(scaleP.pop());
            page.lines.pop();
            const remainHeight = maxHeight - currentHeight;
            let newLines = lines.slice(finalLine + 1);
            if(remainHeight >= rubyLineHeight){
                const array = separateFinalLine(
                    lines[finalLine],
                    Math.floor(remainHeight / rubyLineHeight)
                );
                // const additionalArray = getAdditionalStr(remainHeight, array);
                page.lines.push(array[0]);
                if(array[1] !== null){
                    newLines.unshift(array[1]);
                }
            }
            console.log("page:");
            console.log(page);
            setPageObjs(pageObjs.push(page));
            // setPageObjs(pageObjs + page);
            resolve(newLines);
        } else {
            // console.log("pageObjs");
            // console.log(pageObjs);
            console.log("page:");
            console.log(page);
            setPageObjs(pageObjs.push(page));
            // setPageObjs(pageObjs + page);
            resolve("");
        }
    });

    let i = 0;
    let remains = "";
    const getPages = async(str) => {
        remains = await createPage(i, str);

        if(remains.length > 0){
            i++;
            getPages(remains);
        } else {
            console.log("pageObjs");
            console.log(pageObjs);
        }
    }

    const testLine = "　勤務先は大手家電量販店ビックリカメラ｜六出那《ろくでなろくでなろくでななな》支店。無論、正社員などではない。ここに《サラリーマン》は｜存在しない《ノット・イクシスト》。会社の都合でいつでも｜馘首《クビ》にされる百円ライターさながらの使い捨て｜非正規社員《イレギュラー》である。";
    const testLine2 = "　さらに｜齢《よわい》二十三にもなる息子の行動のすべてを刑務所の看守もどん引きするレベルで監視してくる、いわゆる過干渉型の｜毒母《どくはは》であり、腕っぷしも立つ分反抗すら困難を極めるというまるでフィクションのような悪の権化だ。";

    useMemo(() => {
        // console.log("lines:");
        // console.log(linesUs);
        // console.log(calcPWidth(encodeRuby(testLine)));
        // console.log(getIndexOfLineBreak(testLine, 1));
        // const array = separateFinalLine(testLine, 2);
        // console.log("array:");
        // console.log(array);
        // const jsx1 = encodeJsxRuby(array[0]);
        // console.log("jsx1: ");
        // console.log(jsx1);
        // const jsx2 = encodeJsxRuby(array[1]);
        // console.log("jsx2: ");
        // console.log(jsx2);
        // setScaleP(<p>{ jsx1 }</p>);
        // setScaleP2(<p>{ jsx2 }</p>);
        const testEpisode = getNovels(1, 1).split("\n");
        // console.log("testEpisode");
        // console.log(testEpisode);
        getPages(testEpisode);
        // const testArray = test
        // setScaleP(<p>{array[0]}</p>);
        // setScaleP2(<p>{array[1]}</p>);
        // return getPages(linesUs);
    }, [linesUs]);

    useMemo(() => {
        console.log(pageObjs);
    }, [pageObjs]);

    // padding-top はフォントの 0.6 倍、line-height は等倍でルビとルビなし行が同じ高さになる
    const pStyle = {
        margin: "0",
        padding: fontSize * 0.6 + "px 0 0",
        lineHeight: "100%",
        fontSize: fontSize + "px",
        fontFamily: "Noto Serif JP, Kosugi, Hiragino Kaku Gothic ProN W3, Helvetica, Meiryo, Tahoma",
        textAlign: "left"
    }
    const divStyle = {
        width: maxWidth
    }

    return (
        <>
            <div id={"scale"} style={divStyle}>
                <p id={"scale_p"} style={pStyle}>
                    { scaleP }
                </p>
            </div>
            <div id={"scale2"} style={{ display: "inline-block" }}>
                { scaleP2 }
            </div>
        </>
    );
}