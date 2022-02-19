import React, {useMemo, useState} from "react";
import {HiddenButton} from "./HiddenButton";
import {ControlPanel} from "./ControlPanel";
import {Pages} from "./Pages";

export const Container = () => {
    const [family, setFamily] = useState('Noto Serif JP');
    const [size, setSize] = useState("middle");
    const [color, setColor] = useState("white");
    const [xy, setXy] = useState("x");
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
        backgroundColor: "silver",
        color: "black",
        width: "90%",
        height: "90%",
        margin: "5%",
        fontFamily: family,
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
            <Pages />
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