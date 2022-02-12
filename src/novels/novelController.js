import {novelsList} from "./novelsList";
import {gokurakuList} from "./gokuraku/list";
import {gokurakuChapters} from "./gokuraku/chapters";
import {gokurakuTexts} from "./gokuraku/texts";
import {prisonList} from "./prison/list";
import {prisonTexts} from "./prison/texts";
import {shiroganekiList} from "./shiroganeki/list";
import {shiroganekiChapters} from "./shiroganeki/chapters";
import {shiroganekiTexts} from "./shiroganeki/texts";

export const getNovels = (novel, ep) => {
    switch (novel){
        case null: return novelsList;
        case 0: return (ep === null ? gokurakuList : gokurakuTexts[ep]);
        case 1: return (ep === null ? prisonList : prisonTexts[ep]);
        case 2: return (ep === null ? shiroganekiList : shiroganekiTexts[ep]);
        default: return ["getNovelList() 第一引数 novel の値が不正です。"];
    }
}