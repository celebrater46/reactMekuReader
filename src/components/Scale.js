import React, {useEffect, useMemo, useRef, useState} from "react";
import {Page} from "../modules/Page";
import {encodeJsxRuby} from "../modules/encoder";
import {getNovels} from "../novels/novelController";

export const Scale = (props) => {
    const novelId = 1;
    const epId = 1;
    const [linesUs, setLinesUs] = useState([]); // lines Use State
    const [pageObjs, setPageObjs] = useState([]);
    const [jsxPageObjs, setJsxPageObjs] = useState([]);
    const maxHeight = 600;
    const maxWidth = window.innerHeight * 0.8;
    // const maxWidth = 600;
    // const maxHeight = window.innerHeight * 0.8;
    // console.log(maxHeight)
    const [scaleP, setScaleP] = useState([<ruby><rb>試験</rb><rp>（</rp><rt>テスト</rt><rp>）</rp></ruby>]);
    const [scaleP2, setScaleP2] = useState("テスト２");
    const fontSize = 20; // px
    const rubyLineHeight = fontSize * 2; // px
    const maxChars = Math.floor(maxWidth / fontSize);

    // useMemo(() => {
    //     const novel = getNovels(novelId, epId);
    //     const converted = encodeRuby(novel).split("\n");
    //     setLinesUs(converted);
    // }, [novelId, epId]);

    const getIndexOfLineBreak = (line, remainLines) => {
        const maxHeight = rubyLineHeight * remainLines;
        let str = line;
        console.log("line: " + line);
        let num = 0;
        let sumHeight = rubyLineHeight;
        while(str.length > maxChars){
            let rubyChars = 0; // 行内にルビが存在した場合の補正値（改行したらリセット）
            const rubyIndex = str.indexOf("｜");
            // console.log("rubyIndex: " + rubyIndex);
            if(rubyIndex > -1 && rubyIndex < maxChars + rubyChars){
                const ruby = str.match(/｜([^《]+)《([^》]+)》/);
                // console.log("ruby:");
                // console.log(ruby);
                const ratio = ruby[2].length / ruby[1].length; // 1-3: 1.5, 2-5: 2.5, 1-5: 2.5
                const trueChars = ratio > 2 ? ruby[2].length / 2 : ruby[1].length;
                // console.log("trueChars: " + trueChars);
                const currentWidth = rubyIndex * fontSize + trueChars * fontSize;
                if(currentWidth > maxWidth){
                    num += rubyIndex;
                    sumHeight += rubyLineHeight;
                    if(sumHeight > maxHeight){
                        console.log("HELLO!!!!!!!!!!!!!!");
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
                    console.log("HELLO!!!!!!!!!!!!!!!");
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
            // console.log("num: " + num);
        }
        if(sumHeight + rubyLineHeight > maxHeight && line > maxChars){
            console.log("HELLO????????????????");
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
        // console.log("sum: " + sum);
        return sum;
    }

    const separateFinalLine = (line, remainLines) => {
        const rubyIndex = line.indexOf("｜");
        const max = maxChars * remainLines;
        // console.log("max: " + max);
        if(rubyIndex > -1 && rubyIndex < max){
            // ルビが１行内にあるなら、新しい改行ポイント indexOf を取得
            const lineBreak = getIndexOfLineBreak(line, remainLines);
            if(lineBreak === -1){
                return [line, null];
            }
            console.log("lineBreak: " + lineBreak);
            // if(lineBreak === 0){
            //     console.log("lineBreak is Problem: " + lineBreak);
            // }
            // １行で収まりきらない場合は分割
            if(line.length > lineBreak && lineBreak > 0){
                return [line.substr(0, lineBreak), line.substr(lineBreak)];
            }
        } else {
            if(line.length > max){
                const kinsoku = getNumOfDeletedCharsBykinsoku(line);
                const line1 = line.substr(0, max - kinsoku);
                const line2 = line.substr(max - kinsoku);
                // console.log("kinsoku: " + kinsoku);
                return [line1, line2];
            }
        }
        return [line, null];
    }

    // 1行の幅を計算（オーバーサイズルビにも対応）
    const calcPWidth = (line) => {
        let str = line;
        if(str.indexOf("<ruby>") > -1){
            const rubys = str.match(/<ruby><rb>([^\x01-\x7E]+)<\/rb><rp>\(<\/rp><rt>([^\x01-\x7E]+)<\/rt><rp>\)<\/rp><\/ruby>/g);
            rubys.map((ruby) => {
                // const tempStr = ruby.replace(
                //     /<ruby><rb>([^\x01-\x7E]+)<\/rb><rp>\(<\/rp><rt>([^\x01-\x7E]+)<\/rt><rp>\)<\/rp><\/ruby>/g,
                //     "$1《$2"
                // );
                let tempStr = ruby.replace("<ruby><rb>", "");
                tempStr = tempStr.replace("</rt><rp>)</rp></ruby>", "");
                const rprt = tempStr.split("</rb><rp>(</rp><rt>");
                const remainChars = Math.ceil(rprt[1].length / rprt[0].length) - rprt[0].length; // オーバーサイズルビの増加文字数
                let addition = "";
                for(let i = 0; i < remainChars; i++){
                    addition += "🥺"; // pien
                }
                str = str.replace(ruby, rprt[0] + addition);
            });
            // return rubys;
        }
        return str.length * fontSize;
    }

    const calcPHeight = (line) => {
        let scale = 0;
        let str = line;
        // console.log("str: ");
        // console.log(str);
        // console.log("str.length: ");
        // console.log(str.length);
        // let checkedStr = "";
        let i = 0;
        while(str.length > 0){
            // console.log("HELO");
            const rubyIndex = str.indexOf("｜");
            if(rubyIndex > -1 && rubyIndex < maxChars){
                const array = separateFinalLine(str, 1);
                // console.log("array");
                // console.log(array);
                if(array[1] === null){
                    break;
                } else {
                    str = array[1];
                }
            } else {
                const kinsoku = getNumOfDeletedCharsByKinsokuOneLine(str);
                // checkedStr += str.substr(0, maxChars - kinsoku);
                str = str.substr(maxChars - kinsoku);
            }
            scale += rubyLineHeight;
            i++;
            if(i > 1000){
                console.log("endless loop!!!!!!!!!!!");
                break;
            }
        }
        return scale;
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
        let sumHeight = rubyLineHeight;
        let pHeight = 0;
        let testI = 0;
        for(let j = 0; j < lines.length; j++){
            // if(divRef.current.clientHeight < maxHeight){
            if(sumHeight < maxHeight){
                const key = "line-" + i + "_" + j;
                // const p = <p key={key} id={key} style={pStyle}>{ lines[j] }</p>;
                page.lines.push(lines[j]);
                pHeight = calcPHeight(lines[j]);
                // console.log("lines[j]: '" + lines[j] + "'");
                // console.log("pHeight: " + pHeight);
                sumHeight += pHeight;
                // page.lines[j] = <p key={key} id={key} style={pStyle}>{ lines[j] }</p>;
                // setScaleP(scaleP.push(p));
                // page.lines.push(lines[j]);
                // console.log("page.lines.pushed");
                // console.log(page.lines);
                // console.log("currentHeight: " + currentHeight);
                testI++;
            } else {
                // console.log("testI: " + testI);
                // console.log("currentHeight: " + currentHeight);
                // console.log("maxHeight: " + maxHeight);
                if(finalLine === 0){
                    sumHeight -= pHeight;
                    finalLine = j - 1;
                    break;
                }
            }
        }

        if(finalLine > 0){
            // setScaleP(scaleP.pop());
            page.lines.pop();
            const remainHeight = maxHeight - sumHeight;
            let newLines = lines.slice(finalLine + 1);
            console.log("remainHeight: " + remainHeight);
            if(remainHeight >= rubyLineHeight){
                const remainLines = Math.floor(remainHeight / rubyLineHeight);
                // console.log("remainLines: " + remainLines);
                const array = separateFinalLine(
                    lines[finalLine],
                    remainLines
                );
                // const additionalArray = getAdditionalStr(remainHeight, array);
                page.lines.push(array[0]);
                if(array[1] !== null){
                    newLines.unshift(array[1]);
                }
            }
            // console.log("page:");
            // console.log(page);
            setPageObjs(pageObjs.push(page));
            // setPageObjs(pageObjs + page);
            resolve(newLines);
        } else {
            // console.log("pageObjs");
            // console.log(pageObjs);
            // console.log("page:");
            // console.log(page);
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
            // console.log("pageObjs");
            // console.log(pageObjs);
            // setJsxPageObjs(
            //     [
            //         <div style={divStyle}>
            //             { pageObjs[0].lines.map((line) => {
            //                 return <p style={pStyle}>{ line }</p>
            //             })}
            //         </div>
            //     ]
            // );
            const tempObj = pageObjs.map((obj) => {
                return (
                    <div style={divStyle}>
                        { obj.lines.map((line) => {
                            return <p style={pStyle}>{ encodeJsxRuby(line) }</p>
                            // return <p style={pStyle}>{ line }</p>
                        })}
                    </div>
                );
            });
            setJsxPageObjs(tempObj);
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
        const escapeLineHasNoChar = testEpisode.map((line) => {
            return line === "" ? "　" : line;
        });
        // console.log("testEpisode");
        // console.log(testEpisode);
        getPages(escapeLineHasNoChar);
        // const testArray = test
        // setScaleP(<p>{array[0]}</p>);
        // setScaleP2(<p>{array[1]}</p>);
        // return getPages(linesUs);
    }, [linesUs]);

    // padding-top はフォントの 0.6 倍、line-height は等倍でルビとルビなし行が同じ高さになる
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
    const divStyle = {
        width: maxHeight,
        height: maxWidth,
        // width: maxWidth,
        // height: maxHeight,
        backgroundColor: "#000",
        margin: "20px",
        writingMode: "vertical-rl"
    }

    useMemo(() => {
        // console.log("pageObjs ---");
        // console.log(pageObjs);
        // console.log("pageObjs[0].lines");
        // console.log(pageObjs[0].lines);
        // const tempObj = pageObjs.map((obj) => {
        //     return (
        //         <div style={divStyle}>
        //             { obj.lines.map((line) => {
        //                 return <p style={pStyle}>{ line }</p>
        //             })}
        //         </div>
        //     );
        // })
        // console.log("tempObj");
        // console.log(tempObj);
        // setJsxPageObjs(
        //     [
        //         <div style={divStyle}>
        //             { pageObjs[0].lines.map((line) => {
        //                 return <p style={pStyle}>{ line }</p>
        //             })}
        //         </div>
        //     ]
        // );
    }, [pageObjs]);

    return (
        <>
            <div>
                { jsxPageObjs }
            </div>

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