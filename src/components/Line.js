import React from "react";
import {encodeJsxRuby} from "../modules/encoder";

export const Line = (props) => {
    const id = props.lineId;
    const fontSize = props.fontSize;
    const fontFamily = props.fontFamily;
    const isIndex = props.isIndex;
    // const isTitle = props.isTitle;
    const line = props.isJsx ? props.line : encodeJsxRuby(props.line);
    const pStyle = {
        margin: "0",
        padding: "0",
        lineHeight: "200%",
        fontSize: fontSize + "px",
        fontFamily: fontFamily,
        textAlign: "left"
    }
    const changePageNum = (e) => {
        const epNum = parseInt(e.target.id.substr(3));
        return props.changePageNum(epNum);
    }

    if(isIndex){
        return(
            <p
                key={"line-" + id}
                id={"line-" + id}
                style={pStyle}
                onClick={changePageNum}
            >
                { line }
            </p>
        );
    } else {
        return(
            <p
                key={"line-" + id}
                id={"line-" + id}
                style={pStyle}
            >
                { encodeJsxRuby(props.line) }
            </p>
        );
    }

    // return (
    //     isIndex ?
    //     <p
    //         key={"line-" + id}
    //         id={"line-" + id}
    //         style={pStyle}
    //         onClick={changePageNum}
    //     >
    //         { line }
    //     </p>
    //     :
    //     <p
    //         key={"line-" + id}
    //         id={"line-" + id}
    //         style={pStyle}
    //     >
    //         { encodeJsxRuby(props.line) }
    //     </p>
    // );
}