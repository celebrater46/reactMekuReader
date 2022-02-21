import React, {useEffect, useMemo, useRef, useState} from "react";
import {getNovels} from "../novels/novelController";
import {encodeRuby} from "../modules/encoder";
import {Page} from "../modules/Page";

export const Scale = (props) => {
    const novelId = 1;
    const epId = 1;
    const [linesUs, setLinesUs] = useState([]); // lines Use State
    const [pageObjs, setPageObjs] = useState([]);
    const maxWidth = 600;
    const maxHeight = window.innerHeight * 0.8;
    const [scaleP, setScaleP] = useState([<ruby><rb>試験</rb><rp>（</rp><rt>テスト</rt><rp>）</rp></ruby>]);
    const [scaleP2, setScaleP2] = useState("テスト２");
    // const [pHeight, SetPHeight] = useState(0);
    // const [divHeight, SetDivHeight] = useState(0);
    // const [divHeight2, SetDivHeight2] = useState(0);
    // const [maxWidth, SetMaxWidth] = useState(null);
    // const [maxHeight, SetMaxHeight] = useState(null);
    // const [rubyLineHeight, SetRubyLineHeight] = useState(null);
    const fontSize = 20; // px
    const rubyLineHeight = fontSize * 1.6; // px
    const maxChars = Math.floor(maxWidth / fontSize);
    // const divRef = useRef(null);
    // const divRef2 = useRef(null);
    // const pRef = useRef(null);
    // useEffect(() => {
    //     SetPHeight(pRef.current.clientHeight);
    //     SetDivHeight(divRef.current.clientHeight);
    //     SetDivHeight2(divRef2.current.clientHeight);
    //     // SetMaxWidth(divRef.current.clientWidth);
    //     // SetMaxHeight(divRef.current.clientHeight);
    //     SetRubyLineHeight(pRef.current.clientHeight);
    //     // console.log(text);
    // });
    // useMemo(() => {
    //     const novel = getNovels(novelId, epId);
    //     const converted = encodeRuby(novel).split("\n");
    //     setLinesUs(converted);
    // }, [novelId, epId]);

    const getIndexOfLineBreak = (encodedLine, remainLines) => {
        const maxHeight = rubyLineHeight * remainLines;
        console.log("maxHeight: " + maxHeight);
        let str = encodedLine;
        let num = 0;
        // let sumWidth = 0;
        let sumHeight = 0;
        while(str.length > maxChars && sumHeight <= maxHeight){
            let rubyChars = 0; // 行内にルビが存在した場合の補正値（改行したらリセット）
            const rubyIndex = str.indexOf("<ruby>");
            console.log("rubyIndex: " + rubyIndex);
            if(rubyIndex > -1 && rubyIndex < maxChars + rubyChars){
                const ruby = str.match(/<ruby><rb>([^\x01-\x7E]+)<\/rb><rp>\(<\/rp><rt>([^\x01-\x7E]+)<\/rt><rp>\)<\/rp><\/ruby>/);
                // console.log("ruby: " + ruby);
                let tempStr = ruby[0].replace("<ruby><rb>", "");
                tempStr = tempStr.replace("</rt><rp>)</rp></ruby>", "");
                const rprt = tempStr.split("</rb><rp>(</rp><rt>");
                const ratio = rprt[1].length / rprt[0].length; // 1-3: 1.5, 2-5: 2.5, 1-5: 2.5
                const trueChars = ratio > 2 ? rprt[1].length / 2 : rprt[0].length;
                // console.log("ratio: " + ratio);
                console.log("trueChars: " + trueChars);
                // const remainChars = trueChars - rprt[0].length;
                // let addition = "";
                // for(let i = 0; i < remainChars; i++){
                //     addition += "🥺"; // pien
                // }
                // str = str.replace(ruby, rprt + addition);
                num += ruby[0].length - trueChars;
                const currentWidth = rubyIndex * fontSize + trueChars * fontSize;
                if(currentWidth > maxWidth){
                    num += rubyIndex;
                    sumHeight += rubyLineHeight;
                    // sumWidth = trueChars * fontSize;
                    str = str.substr(rubyIndex);
                    rubyChars = 0;
                } else {
                    rubyChars += ruby[0].length - trueChars;
                    str = str.replace("<ruby>", "<xxxx>");
                }
            } else {
                num += maxChars + rubyChars;
                sumHeight += rubyLineHeight;
                // sumWidth = 0;
                str = str.substr(maxChars);
                rubyChars = 0;
            }
            if(sumHeight > maxHeight){
                console.log("returns!");
                return num;
                // break;
            }
            // if(str.substr(num, 6) === "<ruby>") {
            //     // ルビタグの抽出
            //     const ruby = str.match(/<ruby><rb>([^\x01-\x7E]+)<\/rb><rp>\(<\/rp><rt>([^\x01-\x7E]+)<\/rt><rp>\)<\/rp><\/ruby>/);
            //     let tempStr = ruby.replace("<ruby><rb>", "");
            //     tempStr = tempStr.replace("</rt><rp>)</rp></ruby>", "");
            //     const rprt = tempStr.split("</rb><rp>(</rp><rt>");
            //     const trueChars = Math.ceil(rprt[1].length / rprt[0].length); // オーバーサイズルビの幅（漢字文字数値）
            //     sumWidth += trueChars * maxChars;
            //     // setScaleP2(scaleP2 + ruby);
            //     if(sumWidth > maxWidth){
            //         sumHeight += rubyLineHeight;
            //         sumWidth = trueChars * maxChars;
            //     }
            //     if(sumHeight > maxHeight){
            //         console.log("divRef2.current.innerHTML");
            //         console.log(divRef2.current.innerHTML);
            //         return Math.floor(num);
            //     } else {
            //         num += ruby[0].length; // 本来一文字先に進むところを、ルビならルビタグ全体分進める
            //     }
            //     str = str.replace("<ruby>", "<xxxx>"); // 現在のルビタグの無効化
            // } else {
            //     setScaleP2(scaleP2 + str.substr(num, 1));
            //     if(divRef2.current.clientHeight > maxHeight){
            //         console.log("divRef2.current.innerHTML");
            //         console.log(divRef2.current.innerHTML);
            //         return Math.floor(num);
            //     } else {
            //         num++;
            //     }
            // }
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
        const rubyIndex = line.indexOf("<ruby>");
        const max = maxChars * remainLines;
        console.log("max: " + max);
        if(rubyIndex > -1 && rubyIndex < max){
            // const encoded = encodeRuby(line);
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

    // 最終行が複数行の場合、一度テスト用のPタグに入れて実測
    // const getTruePHeight = (line) => {
    //     setScaleP(line);
    //     return pRef.current.clientHeight;
    // }

    // 実測した最終行が空きスペースより1行以上少ない場合、追加分を再取得
    // const getAdditionalStr = (remainHeight, array) => {
    //     const trueHeight = getTruePHeight(array[0]);
    //     const remainLines = remainHeight - trueHeight;
    //     if(remainLines > rubyLineHeight
    //         && array[1].length > 0)
    //     {
    //         // 実測した最終行が空きスペースより1行以上少ない場合、追加分を再取得
    //         return separateFinalLine(
    //             array[1],
    //             Math.floor(remainLines / rubyLineHeight)
    //         );
    //     } else {
    //         return ["", array[1]];
    //     }
    // }

    // 1行の幅を計算（オーバーサイズルビにも対応）
    // const calcPWidth = (line) => {
    //     let str = line;
    //     if(str.indexOf("<ruby>") > -1){
    //         const rubys = str.match(/<ruby><rb>([^\x01-\x7E]+)<\/rb><rp>\(<\/rp><rt>([^\x01-\x7E]+)<\/rt><rp>\)<\/rp><\/ruby>/g);
    //         rubys.map((ruby) => {
    //             // const tempStr = ruby.replace(
    //             //     /<ruby><rb>([^\x01-\x7E]+)<\/rb><rp>\(<\/rp><rt>([^\x01-\x7E]+)<\/rt><rp>\)<\/rp><\/ruby>/g,
    //             //     "$1《$2"
    //             // );
    //             let tempStr = ruby.replace("<ruby><rb>", "");
    //             tempStr = tempStr.replace("</rt><rp>)</rp></ruby>", "");
    //             const rprt = tempStr.split("</rb><rp>(</rp><rt>");
    //             const remainChars = Math.ceil(rprt[1].length / rprt[0].length) - rprt[0].length; // オーバーサイズルビの増加文字数
    //             let addition = "";
    //             for(let i = 0; i < remainChars; i++){
    //                 addition += "🥺"; // pien
    //             }
    //             str = str.replace(ruby, rprt[0] + addition);
    //         });
    //         // return rubys;
    //     }
    //     return str.length * fontSize;
    // }

    // const calcPHeight = (line) => {
    //     let scale = 0;
    //     let str = line;
    //     let checkedStr = "";
    //     if(str.indexOf("<ruby>") > -1){
    //
    //     } else {
    //         const kinsoku = getNumOfDeletedCharsByKinsokuOneLine(str);
    //         checkedStr += str.substr(0, maxChars - kinsoku);
    //         str = str.substr(maxChars - kinsoku);
    //         scale += rubyLineHeight;
    //     }
    //     return scale;
    // }

    const createPage = (i, remainLines) => new Promise((resolve, reject) => {
        let page = new Page(i);
        // let lines = encodeRuby(remainText).split("\n");
        let lines = remainLines;
        // console.log("lines");
        // console.log(lines);
        let finalLine = 0;
        // console.log("lines")
        // console.log("divHeight: " + divHeight);
        // console.log("maxHeight: " + maxHeight);
        let divHeight = 0;
        for(let j = 0; j < lines.length; j++){
            // if(divRef.current.clientHeight < maxHeight){
            if(divHeight < maxHeight){
                const key = "line-" + i + "_" + j;
                // const p = <p key={key} id={key} style={pStyle}>{ lines[j] }</p>;
                page.lines[j] = <p key={key} id={key} style={pStyle}>{ lines[j] }</p>;
                // setScaleP(scaleP.push(p));
                // page.lines.push(lines[j]);
                // console.log("page.lines.pushed");
                // console.log(page.lines);
                // console.log("divHeight: " + divHeight);
            } else {
                if(finalLine === 0){
                    finalLine = j - 1;
                }
            }
        }

        if(finalLine > 0){
            // setScaleP(scaleP.pop());
            page.lines.pop();
            const remainHeight = maxHeight - divHeight;
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

    // let i = 0;
    // let remains = "";
    // const getPages = async(str) => {
    //     remains = await createPage(i, str);
    //
    //     if(remains.length > 0){
    //         i++;
    //         getPages(remains);
    //     } else {
    //         console.log("pageObjs");
    //         console.log(pageObjs);
    //     }
    // }
    //
    const testLine = "　勤務先は大手家電量販店ビックリカメラ｜六出那《ろくでな》支店。無論、正社員などではない。ここに｜《サラリーマン》は｜存在しない《ノット・イクシスト》。会社の都合でいつでも｜馘首《クビ》にされる百円ライターさながらの使い捨て｜非正規社員《イレギュラー》である。";

    useMemo(() => {
        // console.log("lines:");
        // console.log(linesUs);
        // console.log(calcPWidth(encodeRuby(testLine)));
        // console.log(getIndexOfLineBreak(encodeRuby(testLine), 1));
        const array = separateFinalLine(encodeRuby(testLine), 1);
        setScaleP(<p>{array[0]}</p>);
        setScaleP2(<p>{array[1]}</p>);
        // return getPages(linesUs);
    }, [linesUs]);

    // padding-top はフォントの 0.6 倍、line-height は等倍でルビとルビなし行が同じ高さになる
    const pStyle = {
        margin: "0",
        padding: fontSize * 0.6 + "px 0 0",
        lineHeight: "100%",
        fontSize: fontSize + "px",
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