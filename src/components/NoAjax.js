import React from "react";
import {getNovels} from "../novels/novelController";

export const NoAjax = () => {
    const isList = false;
    const novelsList = getNovels(null, null); // 小説一覧リスト取得
    let text = getNovels(2, 2); // 小説本文
    let array = [];
    if(isList){
        for(let i = 0; i < novelsList.length; i++) {
            array.push(
                <p key={i}>
                    { novelsList[i] }
                </p>
            );
        }
    } else {
        // let fruitAll = fruit.concat(['Peach', 'Grapes']);
        // text = text.replace("<br />", "\n");
        // array[0] = text;
        array = array.concat(text);
    }

    return (
        <div>
            { array }
        </div>
    );
}