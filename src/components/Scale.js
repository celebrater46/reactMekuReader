import React, {useEffect, useRef, useState} from "react";

export const Scale = (props) => {
    const scale = document.getElementById("scale");
    const scalePRuby = document.getElementById("scale_p_ruby");
    // const rubyLineHeight = scalePRuby.clientHeight; // 一行の高さ（ルビあり）
    const [rubyLineHeight, setRubyLineHeight] = useState(0); // 一行の高さ（ルビあり）
    // const maxWidth = scale.clientWidth;
    // const maxHeight = scale.clientHeight;
    const fontSize = 20; // px
    // const maxChars = Math.floor(maxWidth / fontSize); // 1行あたりの最大文字数
    // const getScales = () => {
    //     return props.getScales({
    //         // rubyLineHeight: scalePRuby.clientHeight,
    //         // maxWidth: scale.clientWidth,
    //         // maxHeight: scale.clientHeight,
    //         // fontSize: 20,
    //         // maxChars: Math.floor(maxWidth / fontSize),
    //         rubyLineHeight: rubyLineHeight,
    //         maxWidth: maxWidth,
    //         maxHeight: maxHeight,
    //         fontSize: fontSize,
    //         maxChars: maxChars,
    //     });
    // }
    // getScales();
    console.log("rubyLineHeight");
    console.log(rubyLineHeight);

    const ref = useRef(null);

    useEffect(() => {
        // ref.current.clientHeightでDOM要素の高さを取得
        setRubyLineHeight(ref.current.clientHeight);
    });

    return (
        <div id="scale">
            <p id="scale_p">
                テスト
            </p>
            <p id="scale_p_ruby" ref={ref}>
                <ruby><rb>試験</rb><rp>（</rp><rt>テスト</rt><rp>）</rp></ruby>
            </p>
        </div>
    );
}