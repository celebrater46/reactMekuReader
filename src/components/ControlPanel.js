import React from "react";
import "../static/ControlPanel.css"

export const ControlPanel = () => {
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

    return (
        <div style={style}>
            コントロールパネル
            <div className={"novel controller"} style={panelStyle}>
                <div style={boxStyle}>
                    <label htmlFor="font_family" style={labelStyle}>文字の種類</label>
                    <select name="font_family" style={selectStyle}>
                        <option value="gothic" selected>ゴシック</option>
                        <option value="mincho">明朝</option>
                    </select>
                </div>

                <div style={boxStyle}>
                    <label htmlFor="font_size" style={labelStyle}>文字の大きさ</label>
                    <select name="font_size" style={selectStyle}>
                        <option>小</option>
                        <option selected>中</option>
                        <option>大</option>
                        <option>特大</option>
                    </select>
                </div>

                <div style={boxStyle}>
                    <label htmlFor="color" style={labelStyle}>背景色</label>
                    <select name="color" style={selectStyle}>
                        <option>白</option>
                        <option>黒</option>
                        <option>ベージュ</option>
                    </select>
                </div>

                <div style={boxStyle}>
                    <label htmlFor="xy" style={labelStyle}>組み方向</label>
                    <select name="xy" style={selectStyle}>
                        <option selected>横書き</option>
                        <option>縦書き</option>
                    </select>
                </div>
            </div>
        </div>
    );
}