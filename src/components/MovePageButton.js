import React, {useMemo, useState} from "react";

export const MovePageButton = (props) => {
    const [pageNum, setPageNum] = useState(1);
    const xy = props.xy;
    // const type = props.type;
    // const buttonType = props.type;
    const style = {
        opacity: 0.2,
        backgroundColor: "white",
        color: "black",
        position: "fixed",
        width: "50vw",
        height: "60vh",
        top: "20vh",
    }
    const leftStyle = {
        left: "2vh",
    }
    const rightStyle = {
        right: "2vh",
    }
    const clickLeft = () => {
        // console.log("clicked");
        if(pageNum > 1){
            setPageNum(pageNum - 1);
        }
        console.log("clicked left");
        // console.log(Object.assign(style, leftStyle));
        // console.log(Object.assign(style, rightStyle));
    }
    const clickRight = () => {
        // console.log("clicked");
        if(pageNum < 5){
            setPageNum(pageNum + 1);
        }
        console.log("clicked right");
        // console.log(Object.assign(style, leftStyle));
        // console.log(Object.assign(style, rightStyle));
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
        <>
            <button style={{...style, ...leftStyle}} onClick={clickLeft}>テスト</button>
            <button style={{...style, ...rightStyle}} onClick={clickRight}>テスト</button>
        </>
    );
}