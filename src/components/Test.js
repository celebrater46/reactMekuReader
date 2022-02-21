import React, {useMemo, useState} from "react";
import {separateRubyAsArray, convertDot, encodeJsxRuby} from "../modules/encoder";

export const Test = () => {
    // const [test, setTest] = useState(<ruby><rb>堕天男</rb><rp>(</rp><rt>ルシファー</rt><rp>)</rp></ruby>); // succeeded
    const [test, setTest] = useState(<ruby><rb>堕天男</rb><rp>(</rp><rt>ルシファー</rt><rp>)</rp></ruby>);
    const testLine = "　勤務先は大手家電量販店ビックリカメラ｜六出那《ろくでな》支店。無論、正社員などではない。ここに｜《サラリーマン》は｜存在しない《ノット・イクシスト》。会社の都合でいつでも｜馘首《クビ》にされる百円ライターさながらの使い捨て｜非正規社員《イレギュラー》である。";
    const testLine2 = <ruby><rb>堕天男</rb><rp>(</rp><rt>ルシファー</rt><rp>)</rp></ruby>;

    const doTest = () => {
        // const encoded = testLine;
        // const encoded = encodeRuby(testLine);
        // const jsxEncoded = separateRubyAsArray(encoded)
        const jsxEncoded = encodeJsxRuby(testLine);
        console.log(jsxEncoded);
        // setTest(jsxEncoded.join());
        setTest(jsxEncoded);
    }
    // doTest();
    // useMemo(() => {
    //     if(test !== testLine2){
    //         doTest();
    //     }
    // }, [test]);

    return (
        <div className="container">
            <h3>{ test }</h3>
            <button onClick={doTest}>テスト</button>
        </div>
    );
}