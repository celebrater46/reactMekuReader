import React from "react";
import {novelsList} from "../novels/novelsList";

export const Library = (props) => {
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // textAlign: "center",
        // verticalAlign: "middle"
    }
    const innerStyle = {
        fontSize: "40px"
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
            return <p key={"key-" + i} id={"title-" + i}>{ title }</p>;
        });
    })();
    console.log(titles);

    return (
        <div style={outerStyle}>
            <div style={innerStyle}>
                <p onClick={clickedTitle}>
                    { getP }
                </p>
            </div>
        </div>
    );
}