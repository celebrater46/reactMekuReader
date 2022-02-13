import React from "react";
import {HiddenButton} from "./HiddenButton";

export const Container = () => {
    const div = {
        backgroundColor: "silver",
        color: "black",
        width: "90%",
        height: "90%",
        margin: "5%"
    }
    const p = {
        color: "black"
    }

    const parameter = window.location.search; // ?hoge=0

    return(
        <div style={div}>
            <p style={p}>{parameter}</p>
            <HiddenButton type={"top"} width={"96vw"} height={"18vh"} right={"2vw"} top={"2vh"}/>
            <HiddenButton type={"right"} width={"48vw"} height={"60vh"} right={"2vw"} top={"20vh"} />
            <HiddenButton type={"bottom"} width={"96vw"} height={"18vh"} right={"2vw"} bottom={"2vh"}/>
            <HiddenButton type={"left"} width={"48vw"} height={"60vh"} left={"2vw"} top={"20vh"}/>
        </div>
    );
}