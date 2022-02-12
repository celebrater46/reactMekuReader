import React from "react";
import {novelsList} from "./novelsList";
import {gokurakuList} from "./gokuraku/list";
import {gokurakuChapters} from "./gokuraku/chapters";
import {gokurakuTexts} from "./gokuraku/texts";
import {prisonList} from "./prison/list";
import {prisonTexts} from "./prison/texts";
import {shiroganekiList} from "./shiroganeki/list";
import {shiroganekiChapters} from "./shiroganeki/chapters";
import {shiroganekiTexts} from "./shiroganeki/texts";

const convertBr = (texts) => {
    // 改行タグで本文を行ごとの配列に分割
    // const unified = texts.replace(["、", "\n", "\r", "<br>", "<br/>", "<br />", `<br />`, `<br/>`, "&lt;br/&gt;", "&lt;br /&gt;"], "．"); // <- not working
    // const unified = texts.replace("、", "．");
    let unified = texts.replace(/<br>/g, "．");
    unified = unified.replace(/<br\/>/g, "．");
    unified = unified.replace(/<br \/>/g, "．");
    // const unified = texts.replace("<br />", "<br>");
    // const separated = unified.split("<br>");
    const separated = unified.split("．");
    console.log(texts);
    let array = [];
    separated.map((line) => {
        // array.push("<p>" + line + "</p>"); // タグがそのまま出ちゃう。JSX の記法で
        array.push(<p>{ line }</p>);
        // return (<p>{ line }</p>);
    });
    return array;
}

export const getNovels = (novel, ep) => {
    switch (novel){
        case null: return novelsList;
        case 0: return (ep === null ? gokurakuList : convertBr(gokurakuTexts[ep]));
        case 1: return (ep === null ? prisonList : convertBr(prisonTexts[ep]));
        case 2: return (ep === null ? shiroganekiList : convertBr(shiroganekiTexts[ep]));
        default: return ["getNovelList() 第一引数 novel の値が不正です。"];
    }
}