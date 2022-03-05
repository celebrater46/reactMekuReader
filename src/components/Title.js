import React from "react";

export const Title = (props) => {
    const title = props.title;
    const h1Style = {
        margin: "0",
        padding: "0",
        fontSize: "40px",
        // fontFamily: fontFamily,
        textAlign: "left"
    }

    return (
        <h1 key={"title"} style={h1Style}>
            { title }
        </h1>
    );
}