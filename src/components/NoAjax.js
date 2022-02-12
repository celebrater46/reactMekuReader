import React, {useEffect, useState} from "react";
import {getNovels} from "../novels/novelController";

export const NoAjax = () => {
    const novelsList = getNovels(null, null); // 小説一覧リスト取得
    let array = [];
    for(let i = 0; i < novelsList.length; i++) {
        array.push(
            <p key={i}>
                { novelsList[i] }
            </p>
        );
    }

    return (
        <div>
            { array }
        </div>
    );
}