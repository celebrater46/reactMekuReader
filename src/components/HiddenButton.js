import React, {useMemo, useState} from "react";

export const HiddenButton = (props) => {
    const [pageNum, setPageNum] = useState(1);
    const xy = props.xy;
    const type = props.type;
    // const buttonType = props.type;
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

    const clickButton = () => {
        // console.log("clicked");
        let msg = "clicked ";
        switch (type){
            case "top": msg += "top"; break;
            // case "right": msg += "right"; break;
            case "right":
                if(pageNum < 5){
                    setPageNum(pageNum + 1);
                }
                break;
            case "bottom": msg += "bottom"; break;
            // case "left": msg += "left"; break;
            case "left":
                if(pageNum > 1){
                    setPageNum(pageNum - 1);
                }
                break;
            default: msg += "unknown"; break;
            // default: msg += "unknown";
        }
        console.log(msg);
    }

    useMemo(() => {
        window.scrollTo({
            left: (pageNum - 1) * window.innerWidth,
            behavior: 'smooth'
        });
        console.log("pageNum: " + pageNum);
    }, [pageNum]);
    // console.log(style);
    // console.log(props.right);
    // console.log(buttonType);

    return (
        <button style={style} onClick={clickButton}>テスト</button>
    );
}