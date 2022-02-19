import React, {useMemo} from "react";

export const Pages = (props) => {
    const fColor = props.fColor;
    const bgColor = props.bgColor;
    const xy = props.xy;
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
    const style = {
        color: fColor,
        backgroundColor: bgColor,
        textAlign: "justify",
        margin: "20px",
        padding: "40px",
        writingMode: xy
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
                <div key={i} id={"p-" + i} style={style}>
                    <p>これはテストやで！</p>
                    <p>これはテストやで！</p>
                    <p>これはテストやで！</p>
                    <p>これはテストやで！</p>
                    <p>これはテストやで！</p>
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