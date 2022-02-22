import React, {useMemo, useState} from "react";
import {ControlPanel} from "./ControlPanel";
import {Pages} from "./Pages";
import {MovePageButton} from "./MovePageButton";
import {Library} from "./Library";

export const Container = () => {
    const [novelId, setNovelId] = useState(1);
    const [epId, setEpId] = useState(0);
    const [family, setFamily] = useState('Noto Serif JP');
    const [size, setSize] = useState("middle");
    const [color, setColor] = useState("white");
    const [xy, setXy] = useState("vertical-rl");
    const [maxPage, setMaxPage] = useState(12);

    const fontSizeNum = useMemo(() => {
        switch (size){
            case "small": return "14px";
            case "middle": return "18px";
            case "large": return "20px";
            case "largest": return "24px";
            default: return "16px";
        }
    }, [size]);
    const fColor = useMemo(() => {
        switch (color){
            case "white": return "#333";
            case "black": return "silver";
            case "beige": return "#443322";
            default: return "#333";
        }
    }, [color]);
    const bgColor = useMemo(() => {
        switch (color){
            case "white": return "white";
            case "black": return "#333";
            case "beige": return "#fedcbb";
            default: return "white";
        }
    }, [color]);
    // const direction = useMemo(() => {
    //     console.log(xy === "horizontal-tb" ? "row" : "row-reverse");
    //     return xy === "horizontal-tb" ? "row" : "row-reverse";
    // }, [xy]);
    const clickedTitle = (id) => {
        setNovelId(id);
    }
    const changeFamily = (e) => {
        setFamily(e.target.value);
    }
    const changeSize = (e) => {
        setSize(e.target.value);
    }
    const changeColor = (e) => {
        setColor(e.target.value);
    }
    const changeXy = (e) => {
        setXy(e.target.value);
    }
    const initMaxPage = (num) => {
        setMaxPage(num);
    }
    const div = {
        backgroundColor: "black",
        color: "silver",
        width: maxPage * 100 + "vw",
        height: "94%",
        margin: "0",
        padding: "3% 0",
        fontFamily: family,
        fontSize: fontSizeNum,
        display: "flex",
        // flexDirection: direction,
        flexDirection: "row-reverse",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexWrap: "nowrap",
        position: "absolute",
        left: 0,
        // right: right,
    }
    const p = { color: "black" }
    const parameter = window.location.search; // ?hoge=0
    useMemo(() => {
        console.log("novelId: " + novelId);
        console.log("family: " + family);
        console.log("size: " + size);
        console.log("color: " + color);
        console.log("xy: " + xy);
    }, [novelId, family, size, color, xy]);

    return(
        <div style={div}>
            <p style={p}>{parameter}</p>
            {/*<HiddenButton xy={xy} type={"top"} width={"96vw"} height={"18vh"} right={"2vw"} top={"2vh"}/>*/}
            <MovePageButton xy={xy} maxPage={maxPage} />
            {/*<HiddenButton xy={xy} type={"bottom"} width={"96vw"} height={"18vh"} right={"2vw"} bottom={"2vh"}/>*/}
            <Pages
                fColor={fColor}
                bgColor={bgColor}
                xy={xy}
                novelId={novelId}
                epId={epId}
                initMaxPage={(num) => initMaxPage(num)}
            />
            <ControlPanel
                family={family}
                size={size}
                color={color}
                xy={xy}
                maxPage={maxPage}
                changeFamily={(e) => changeFamily(e)}
                changeSize={(e) => changeSize(e)}
                changeColor={(e) => changeColor(e)}
                changeXy={(e) => changeXy(e)}
            />
            <Library clickedTitle={(id) => clickedTitle(id)} />
        </div>
    );
}