import React from "react";
import {novelsList} from "../novels/novelsList";

export const Library = (props) => {
    const search = window.location.search;
    const outerStyle = {
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
        color: "white",
        backgroundColor: "#282c34",
        display: search === "" ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        // textAlign: "center",
        // verticalAlign: "middle"
    }
    const innerStyle = {
        fontSize: "40px"
    }
    const pStyle = {
        userSelect: "none",
        cursor: "pointer",
    }
    const clickedTitle = (e) => {
        return props.clickedTitle(e.target.id);
    }
    const titles = (() => {
        return novelsList.map((line) => {
            return line.split("|")[0];
        });
    })();
    const getP = (() => {
        let i = 0;
        return titles.map((title) => {
            i++;
            return (
                <p
                    key={"key-" + i}
                    id={"title-" + i}
                    onClick={clickedTitle}
                    style={pStyle}
                >
                    { title }
                </p>);
        });
    })();
    console.log(titles);

    return (
        <div style={outerStyle}>
            <div style={innerStyle}>
                { getP }
            </div>
        </div>
    );
}