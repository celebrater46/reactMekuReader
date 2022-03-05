import React, {useMemo, useState} from "react";
import "../static/ControlPanel.css"
import burger from "../img/burger.png";

export const ControlPanel = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const style = {
        width: "640px",
        height: "440px",
        padding: "20px 0",
        top: ((window.innerHeight - 480) / 2) + "px",
        right: ((window.innerWidth - 640) / 2) + "px",
        display: useMemo(() => {
            return isOpen ? "block" : "none";
        }, [isOpen]),
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
    const imgDivStyle = {
        width: "48px",
        height: "48px",
        position: "fixed",
        top: "20px",
        right: "20px",
    }
    const imgStyle = {
        width: "100%",
        height: "100%",
    }
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
    const openPanel = () => {
        setIsOpen(true);
    }
    const closePanel = () => {
        setIsOpen(false);
    }

    return (
        <>
            <div style={style}>
                コントロールパネル
                <div className={"novel controller"} style={panelStyle}>
                    <div style={boxStyle}>
                        <label htmlFor="font_family" style={labelStyle}>文字の種類</label>
                        <select name="font_family" style={selectStyle} onChange={changeFamily} value={props.family}>
                            <option value={"gothic"}>ゴシック</option>
                            <option value={"mincho"}>明朝</option>
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

                    <button onClick={closePanel}>閉じる</button>
                </div>
            </div>

            <div id={"burger"} style={imgDivStyle}>
                <img src={burger} style={imgStyle} onClick={openPanel}/>
            </div>
        </>
    );
}