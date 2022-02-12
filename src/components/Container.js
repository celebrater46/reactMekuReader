import React from "react";
import {useLocation, useParams} from "react-router-dom";

export const Container = () => {
    // const parameter = location.search; // ?hoge=0
    const parameter = window.location.search; // ?hoge=0
    // const location = useLocation().search; // URL path や パラメータなど。JSのlocationと同じ
    // const query2 = new URLSearchParams(location);
    // const params = useParams();
    // const history = useHistory();   // historyオブジェクトを取得。

    return(
        <div>
            <p>{parameter}</p>
            {/*<p>{ query2.get("novel") }</p>*/}
            {/*<p>{ location }</p>*/}
            {/*<p>{ params }</p>*/}
        </div>
    );
}