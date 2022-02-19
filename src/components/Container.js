import React, {useMemo, useState} from "react";
import {HiddenButton} from "./HiddenButton";
import {ControlPanel} from "./ControlPanel";
import {Pages} from "./Pages";

export const Container = () => {
    const [family, setFamily] = useState('Noto Serif JP');
    const [size, setSize] = useState("middle");
    const [color, setColor] = useState("white");
    const [xy, setXy] = useState("x");
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
    // const colors = useMemo(() =>{
    //     console.log("colors is working");
    //     // backgroundColor, fontColor
    //     switch (color){
    //         case "white": return { backGround: "white", font: "#333" };
    //         case "black": return { backGround: "black", font: "silver" };
    //         case "beige": return { backGround: "#fedcbb", font: "#443322" };
    //         default: return { backGround: "white", font: "#333" };
    //     }
    // }, [color]);
    // const [fontName, setFontName] = useState('Kosugi');
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
    const div = {
        backgroundColor: "black",
        color: "silver",
        width: "90%",
        height: "90%",
        margin: "5%",
        fontFamily: family,
        fontSize: fontSizeNum,
    }
    const p = {
        color: "black"
    }
    const parameter = window.location.search; // ?hoge=0
    // useMemo(() => {
    //     if(family === "Noto Serif JP"){
    //         setFamily('Kosugi');
    //     } else {
    //         setFamily('Noto Serif JP');
    //     }
    // }, [family]);
    useMemo(() => {
        console.log("family: " + family);
        console.log("size: " + size);
        console.log("color: " + color);
        console.log("xy: " + xy);
    }, [family, size, color, xy]);

    return(
        <div style={div}>
            <p style={p}>{parameter}</p>
            {/*<HiddenButton type={"top"} width={"96vw"} height={"18vh"} right={"2vw"} top={"2vh"}/>*/}
            {/*<HiddenButton type={"right"} width={"48vw"} height={"60vh"} right={"2vw"} top={"20vh"} />*/}
            {/*<HiddenButton type={"bottom"} width={"96vw"} height={"18vh"} right={"2vw"} bottom={"2vh"}/>*/}
            {/*<HiddenButton type={"left"} width={"48vw"} height={"60vh"} left={"2vw"} top={"20vh"}/>*/}
            <Pages fColor={fColor} bgColor={bgColor}/>
            <ControlPanel
                family={family}
                size={size}
                color={color}
                xy={xy}
                changeFamily={(e) => changeFamily(e)}
                changeSize={(e) => changeSize(e)}
                changeColor={(e) => changeColor(e)}
                changeXy={(e) => changeXy(e)}
            />
        </div>
    );
}