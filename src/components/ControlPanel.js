import React, {useMemo, useState} from "react";
import "../static/ControlPanel.css"

export const ControlPanel = (props) => {
    // const [family, setFamily] = useState("mincho");
    // const [size, setSize] = useState("middle");
    // const [color, setColor] = useState("white");
    // const [xy, setXy] = useState("x");
    const style = {
        width: "50vw",
        height: "50vh",
        top: "25vh",
        right: "25vw",
        opacity: 0.8,
        backgroundColor: "silver",
        color: "black",
        position: "fixed"
    }
    const panelStyle = {
        display: "block",
        flexWrap: "wrap",
    }
    const boxStyle = {
        width: "80%",
        height: "40%",
        textAlign: "left",
        padding: "0",
        margin: "5% auto 5% 20%"
    }
    const labelStyle = {
        display: "inline-block",
        width: "25%",
        fontSize: "1.3rem",
        margin: "10px 20px 10px 40px"
    }
    const selectStyle = {
        fontSize: "1.2rem"
    }
    // const changeFamily = (e) => {
    //     setFamily(e.target.value);
    // }
    // const changeSize = (e) => {
    //     setSize(e.target.value);
    // }
    // const changeColor = (e) => {
    //     setColor(e.target.value);
    // }
    // const changeXy = (e) => {
    //     setXy(e.target.value);
    // }
    const changeFamily = (e) => {
        return props.changeFamily(e);
    }
    const changeSize = (e) => {
        return props.changeSize(e);
    }
    const changeColor = (e) => {
        return props.changeColor(e);
    }
    const changeXy = (e) => {
        return props.changeXy(e);
    }
    // useMemo(() => {
    //     console.log("family: " + props.family);
    //     console.log("size: " + props.size);
    //     console.log("color: " + props.color);
    //     console.log("xy: " + props.xy);
    // }, [props.family, props.size, props.color, props.xy]);

    return (
        <div style={style}>
            コントロールパネル
            <div className={"novel controller"} style={panelStyle}>
                <div style={boxStyle}>
                    <label htmlFor="font_family" style={labelStyle}>文字の種類</label>
                    <select name="font_family" style={selectStyle} onChange={changeFamily} value={props.family}>
                        <option value={"Kosugi"}>ゴシック</option>
                        <option value={"Noto Serif JP"}>明朝</option>
                    </select>
                </div>

                <div style={boxStyle}>
                    <label htmlFor="font_size" style={labelStyle}>文字の大きさ</label>
                    <select name="font_size" style={selectStyle} onChange={changeSize} value={props.size}>
                        <option value="small">小</option>
                        <option value="middle">中</option>
                        <option value="large">大</option>
                        <option value="largest">特大</option>
                    </select>
                </div>

                <div style={boxStyle}>
                    <label htmlFor="color" style={labelStyle}>背景色</label>
                    <select name="color" style={selectStyle} onChange={changeColor} value={props.color}>
                        <option value="white">白</option>
                        <option value="black">黒</option>
                        <option value="beige">ベージュ</option>
                    </select>
                </div>

                <div style={boxStyle}>
                    <label htmlFor="xy" style={labelStyle}>組み方向</label>
                    <select name="xy" style={selectStyle} onChange={changeXy} value={props.xy}>
                        <option value="horizontal-tb">横書き</option>
                        <option value="vertical-rl">縦書き</option>
                    </select>
                </div>

                <button>閉じる</button>
            </div>
        </div>
    );
}