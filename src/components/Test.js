import React, {useEffect, useMemo, useRef, useState} from "react";
// import {getPagesJs} from "../modules/getPagesJs";
import {getNovels} from "../novels/novelController";
import {Scale} from "./Scale";

export const Test = () => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // コンストラクタとコールバック
        const observer = new ResizeObserver((entries) => {
            setWidth(entries[0].contentRect.width);
            setHeight(entries[0].contentRect.height);
        });

        // 要素を監視
        containerRef.current && observer.observe(containerRef.current);

        // クリーンアップ関数で監視を解く
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="container" ref={containerRef}>
            <h3>width: {width}, height: {height}</h3>
        </div>
    );
}