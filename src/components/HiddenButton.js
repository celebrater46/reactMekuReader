import React from "react";

const clickButton = () => {
    console.log("clicked");
}

export const HiddenButton = (props) => {
    const buttonType = props.type;
    const style = {
        opacity: 0.2,
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
        <button style={style} onClick={clickButton}>テスト</button>
    );
}