import React, {useState} from "react";

export const Slider = (props) => {
    const currentPage = props.currentPage;
    const maxPage = props.maxPage;
    const [y, setY] = useState("0");
    const buttonStyle = {
        position: "fixed",
        width: "96vw",
        height: "17vh",
        bottom: 0,
        left: "2vw",
        opacity: 0.2,
        backgroundColor: "white",
        color: "black",
    }
    const panelStyle = {
        position: "fixed",
        width: "96vw",
        height: "6vh",
        bottom: "-30vh",
        left: "2vw",
        textAlign: "center",
        verticalAlign: "middle",
        transitionProperty: "transform",
        transitionDuration: "1s",
        transform: "translate(0, " + y + ")",
        display: "flex"
    };
    const sliderStyle = {
        width: "80vw",
        background: "black",
        margin: "10px auto"
    }
    const pStyle = {
        width: "80px",
        height: "30px",
        background: "#333",
        color: "silver",
        border: "1px solid gray",
        margin: "10px auto 0"
    }
    const toggleSlider = () => {
        setY(y === "0" ? "-30vh" : "0");
    }
    const onChangeSlider = (e) => {
        return props.onChangeSlider(maxPage - e.target.value + 1);
    }

    return (
        <>
            <button style={buttonStyle} onClick={toggleSlider}> テスト</button>
            <div style={panelStyle}>
                <p style={pStyle}>{ currentPage }</p>
                <input
                    type={"range"}
                    name={"page"}
                    min={1}
                    step={1}
                    max={ maxPage }
                    style={sliderStyle}
                    value={maxPage - currentPage + 1}
                    onChange={onChangeSlider}
                />
            </div>
        </>
    );
}