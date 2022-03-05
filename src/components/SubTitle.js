import React from "react";

export const SubTitle = (props) => {
    const epId = props.epId;
    const title = props.title;
    // const fontSize = props.fontSize;
    const h2Style = {
        margin: "0",
        padding: "0",
        fontSize: "28px",
        // fontFamily: fontFamily,
        textAlign: "left"
    }

    return (
        <h2 key={"title-" + epId} style={h2Style}>
            { title }
        </h2>
    );
}