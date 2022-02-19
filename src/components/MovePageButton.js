import React, {useMemo, useState} from "react";

export const MovePageButton = (props) => {
    const [pageNum, setPageNum] = useState(1);
    const xy = props.xy;
    const max = 5;
    // const type = props.type;
    // const buttonType = props.type;
    const style = {
        opacity: 0.2,
        backgroundColor: "white",
        color: "black",
        position: "fixed",
        width: "47vw",
        height: "60vh",
        top: "20vh",
    }
    const leftStyle = {
        left: "2vw",
    }
    const rightStyle = {
        right: "2vw",
    }
    // const nextPage = () => {
    //     setPageNum(pageNum > 1 ? pageNum - 1 : pageNum);
    // }
    // const prevPage = () => {
    //     setPageNum(pageNum < 5 ? pageNum + 1 : pageNum);
    // }
    const clickLeft = () => {
        // console.log("clicked");
        setPageNum(pageNum > 1 ? pageNum - 1 : pageNum);
        // if(xy === "horizontal-tb"){
        //     setPageNum(pageNum > 1 ? pageNum - 1 : pageNum);
        // } else {
        //     setPageNum(pageNum < 5 ? pageNum + 1 : pageNum);
        // }
        console.log("clicked left");
        // console.log(Object.assign(style, leftStyle));
        // console.log(Object.assign(style, rightStyle));
    }
    const clickRight = () => {
        // console.log("clicked");
        setPageNum(pageNum < max ? pageNum + 1 : pageNum);
        // if(xy === "horizontal-tb"){
        //     setPageNum(pageNum > 1 ? pageNum - 1 : pageNum);
        // } else {
        //     setPageNum(pageNum < 5 ? pageNum + 1 : pageNum);
        // }
        console.log("clicked right");
        // console.log(Object.assign(style, leftStyle));
        // console.log(Object.assign(style, rightStyle));
    }

    const getLocation = () => {
        // return (pageNum - 1) * window.innerWidth;
        if(xy === "horizontal-tb"){
            return (pageNum - 1) * window.innerWidth;
        } else {
            return (max - pageNum + 1) * window.innerWidth;
            // 1-5 2-4 3-3 4-2 5-1
        }
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
    useMemo(() => {
        setPageNum(max - pageNum + 1);
    }, [xy]);

    return (
        <>
            <button style={{...style, ...leftStyle}} onClick={clickLeft}>テスト</button>
            <button style={{...style, ...rightStyle}} onClick={clickRight}>テスト</button>
        </>
    );
}