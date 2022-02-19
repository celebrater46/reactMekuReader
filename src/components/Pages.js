import React, {useMemo} from "react";

export const Pages = (props) => {
    // const margin = "20px " + (window.innerWidth - 700) / 2;
    const fColor = props.fColor;
    const bgColor = props.bgColor;
    const xy = props.xy;
    const innerMargin = useMemo(() => {
        return xy === "horizontal-tb" ? "0 auto 0 0" : "0 0 0 auto";
    }, [xy]);
    // const fColor = useMemo(() => {
    //     switch (props.color){
    //         case "white": return "#333";
    //         case "black": return "silver";
    //         case "beige": return "#443322";
    //         default: return "#333";
    //     }
    // }, [props.color]);
    // const bgColor = useMemo(() => {
    //     switch (props.color){
    //         case "white": return "white";
    //         case "black": return "black";
    //         case "beige": return "#fedcbb";
    //         default: return "white";
    //     }
    // }, [props.color]);
    const outerStyle = {
        backgroundColor: bgColor,
        margin: "20px " + ((window.innerWidth - 700) / 2) + "px",
        padding: "50px",
        width: "700px",
        height: "70vh",
    }
    const innerStyle = {
        color: fColor,
        textAlign: "justify",
        writingMode: xy,
        margin: innerMargin,
    };
    // const style = useMemo(() => {
    //     return {
    //         color: fColor,
    //         backgroundColor: bgColor,
    //         textAlign: "justify",
    //         margin: "20px",
    //         padding: "40px"
    //     }
    // }, [props.fColor]);
    const createTestPages = () => {
        let pages = [];

        for(let i = 0; i < 5; i++){
            pages.push(
                <div key={"outer-" + i} style={outerStyle}>
                    <div key={"inner-" + i} id={"p-" + i} style={innerStyle}>
                        <p>{i + 1}ページめ！</p>
                        <p>これはテストやで！</p>
                        <p>これはテストやで！</p>
                        <p>これはテストやで！</p>
                        <p>これはテストやで！</p>
                    </div>
                </div>
            );
        }
        return pages;
    }

    return (
        <>
            { createTestPages() }
        </>
    );
}