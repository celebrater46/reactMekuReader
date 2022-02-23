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

// 改行タグで本文を行ごとの配列に分割
const convertBr = (texts) => {
    const escaped = texts.replace(/\n/g, "‖");
    const separated = escaped.split("‖");
    console.log(texts);
    let array = [];
    separated.map((line) => {
        array.push(<p>{ line }</p>);
    });
    return array;
}

export const getNovels = (novel) => {
    const escape = (texts) => {
        return texts.map((text) => {
            return text.replace(/｜《/g, "《");
        })
    }

    switch (novel){
        case null: return novelsList;
        case 1:
            return {
                list: prisonList,
                texts: escape(prisonTexts)
            }
        case 2:
            return {
                list: shiroganekiList,
                texts: escape(shiroganekiTexts)
            }
        case 3:
            return {
                list: gokurakuList,
                texts: escape(gokurakuTexts)
            }
        // case 1: return (ep === null ? prisonList : prisonTexts[ep].replace("｜《", "《"));
        // case 2: return (ep === null ? shiroganekiList : shiroganekiTexts[ep].replace("｜《", "《"));
        // case 3: return (ep === null ? gokurakuList : gokurakuTexts[ep].replace("｜《", "《"));
        // case 0: return (ep === null ? gokurakuList : convertBr(gokurakuTexts[ep]));
        // case 1: return (ep === null ? prisonList : convertBr(prisonTexts[ep]));
        // case 2: return (ep === null ? shiroganekiList : convertBr(shiroganekiTexts[ep]));
        default: return ["getNovelList() 第一引数 novel の値が不正です。"];
    }
}