import React from "react";

export const HiddenButton = (props) => {
    const buttonType = props.type;
    const style = {
        opacity: 0.5,
        backgroundColor: "white",
        color: "black",
        position: "fixed",
        width: props.width,
        height: props.height,
        top: props.top === undefined ? "auto" : props.top,
        right: props.right === undefined ? "auto" : props.right,
        left: props.left === undefined ? "auto" : props.left,
        bottom: props.bottom === undefined ? "auto" : props.bottom
    }
    console.log(style);
    console.log(props.right);
    console.log(buttonType);

    return (
        <button style={style}>テスト</button>
    );
}