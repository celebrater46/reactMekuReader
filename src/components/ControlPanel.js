import React from "react";

export const ControlPanel = () => {
    const style = {
        width: "70vw",
        height: "70vh",
        top: "15vh",
        right: "15vw",
        opacity: 0.8,
        backgroundColor: "silver",
        color: "black",
        position: "fixed"
    }

    return (
        <div style={style}>
            コントロールパネル
            <div className='novel controller'>
                    <div className="font family label">
                        <label htmlFor="font_family">文字の種類</label>
                    </div>
                    <div className="font family select">
                        <select name="font_family">
                            <option value="gothic" selected>ゴシック</option>
                            <option value="mincho">明朝</option>
                        </select>
                    </div>
                    <div className="font size label">
                        <label htmlFor="font_size">文字の大きさ</label>
                    </div>
                    <div className="font size select">
                        <select name="font_size">
                            <option>極小</option>
                            <option>特小</option>
                            <option>小</option>
                            <option>やや小</option>
                            <option selected>中</option>
                            <option>やや大</option>
                            <option>大</option>
                            <option>特大</option>
                            <option>極大</option>
                        </select>
                    </div>
                    <div className="color label">
                        <label htmlFor="color">背景色</label>
                    </div>
                    <div className="color select">
                        <select name="color">
                            <option>白</option>
                            <option>黒</option>
                            <option>ベージュ</option>
                        </select>
                    </div>
                    <div className="xy label">
                        <label htmlFor="xy">組み方向</label>
                    </div>
                    <div className="xy select">
                        <select name="xy">
                            <option selected>横書き</option>
                            <option>縦書き</option>
                        </select>
                    </div>
            </div>
        </div>
    );
}