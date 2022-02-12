import React from "react";

export const Container = () => {
    const parameter = window.location.search; // ?hoge=0

    return(
        <div>
            <p>{parameter}</p>
        </div>
    );
}