import React, {useEffect, useMemo, useState} from "react";

export const MovePageButton = (props) => {
    const xy = props.xy;
    const maxPage = props.maxPage;
    const currentPage = props.currentPage;
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
    // const onChangeSlider = (e) => {
    //     return props.onChangeSlider(maxPage - e.target.value + 1);
    // }
    const clickLeft = () => {
        console.log("clicked right");
        console.log("currentPage: " + currentPage);
        console.log("maxPage: " + maxPage);
        return props.onChangeSlider(currentPage < maxPage ? currentPage + 1 : currentPage);
        // setCurrentPage(currentPage < maxPage ? currentPage + 1 : currentPage);
    }

    const clickRight = () => {
        console.log("clicked left");
        console.log("currentPage: " + currentPage);
        console.log("maxPage: " + maxPage);
        return props.onChangeSlider(currentPage > 1 ? currentPage - 1 : currentPage);
        // setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
    }
    const getLocation = () => {
        if(xy === "horizontal-tb"){
            return (currentPage - 1) * window.innerWidth;
        } else {
            return (maxPage - currentPage + 1) * window.innerWidth;
            // 1-5 2-4 3-3 4-2 5-1
        }
    }
    const scroll = () => {
        window.scrollTo({
            left: (maxPage - currentPage) * window.innerWidth,
            behavior: 'smooth'
        });
    }
    useMemo(() => {
        scroll();
    }, [currentPage]);
    useEffect(() => {
        scroll();
    }, []);
    // useMemo(() => {
    //     setPageNum(maxPage - pageNum + 1);
    // }, [xy]);

    return (
        <>
            <button style={{...style, ...leftStyle}} onClick={clickLeft}>テスト</button>
            <button style={{...style, ...rightStyle}} onClick={clickRight}>テスト</button>
        </>
    );
}