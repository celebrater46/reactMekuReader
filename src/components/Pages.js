import React from "react";

export const Pages = () => {
    const style = {
        color: "silver",
        backgroundColor: "#333",
        textAlign: "justify",
        margin: "20px",
        padding: "40px"
    };
    const createTestPages = () => {
        let pages = [];

        for(let i = 0; i < 5; i++){
            pages.push(
                <div key={i} id={"p-" + i} style={style}>
                    <p>これはテストやで！</p>
                    <p>これはテストやで！</p>
                    <p>これはテストやで！</p>
                    <p>これはテストやで！</p>
                    <p>これはテストやで！</p>
                </div>
            );
        }
        return pages;
    }

    return (
        <>
            { createTestPages() }
        </>
    );
}