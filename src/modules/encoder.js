import React from "react";

const convertDot = (line) => {
    let str = line;
    let i = 0;
    while(str.search(/《《[^》]+》》/) > -1){
        const chars = str.match(/《《[^》]+》》/);
        let converted = "";
        for(let j = 2; j < chars[0].length - 2; j++){ // match() returns not String but Array
            converted += "｜";
            converted += chars[0].substr(j, 1);
            converted += "《・》";
        }
        str = str.replace(/《《[^》]+》》/, converted);
        i++;
        if(i > 1000){
            console.log("endless loop occurred!");
            break;
        }
    }
    return str;
}

// const encodeRuby = (line) => {
//     const dotConverted = convertDot(line);
//     const escaped = dotConverted.replace(/｜《([^》]+)》/g, "≪$1≫");
//     const rubyConverted = escaped.replace(
//         /｜([^《]+)《([^》]+)》/g,
//         "<ruby><rb>$1</rb><rp>(</rp><rt>$2</rt><rp>)</rp></ruby>"
//     );
//     const decoded = rubyConverted.replace(/≪([^≫]+)≫/g, "《$1》");
//     console.log("dotConverted: " + dotConverted);
//     console.log("escaped: " + escaped);
//     console.log("rubyConverted: " + rubyConverted);
//     console.log("decoded: " + decoded);
//     return decoded;
//     // if(dotConverted.indexOf("｜") > -1){
//     //     return
//     // }
//     // return dotConverted;
// }

const encodeJsxRuby = (line) => {
    if(line === ""){ return "　"; }
    let array = [];
    let dotConverted = convertDot(line);
    let str = dotConverted.replace(/｜《/g, "《");
    // let str = dotConverted.replace(/｜《([^》]+)》/g, "≪$1≫");
    // const escaped = dotConverted.replace(/｜《([^》]+)》/g, "≪$1≫");
    let i = 0;
    while(str.length > -1){
        // let rubyIndex = str.indexOf("｜");
        let rubyIndex = str.search(/｜([^《]+)《([^》]+)》/);
        if(rubyIndex > -1){
            // if(str.substr(rubyIndex + 1, 1) === "《"){
            //
            // }
            array.push(str.substr(0, rubyIndex));
            const ruby = str.match(/｜([^《]+)《([^》]+)》/);
            // str = dotConverted.replace(/｜《([^》]+)》/g, "≪$1≫");
            console.log("ruby");
            console.log(ruby);
            // const jsxRuby = ruby[0].replace(
            //     /<ruby><rb>([^\x01-\x7E]+)<\/rb><rp>\(<\/rp><rt>([^\x01-\x7E]+)<\/rt><rp>\)<\/rp><\/ruby>/,
            //     <ruby><rb>$1</rb><rp>(</rp><rt>$2</rt><rp>)</rp></ruby>
            // );
            // array.push(str.match(jsxRuby));
            // array.push(jsxRuby);
            array.push(<ruby><rb>{ ruby[1] }</rb><rp>(</rp><rt>{ ruby[2] }</rt><rp>)</rp></ruby>);
            str = str.substr(rubyIndex + ruby[0].length);
            console.log("ruby[0].length: " + ruby[0].length);
        } else {
            array.push(str);
            break;
        }
        i++;
        if(i > 1000){
            console.log("endless loop!!");
            break;
        }
    }
    return array;
}

const decodeRuby = (line) => {
    let str = line;
    if(str.indexOf("<ruby><rb>") > -1) {
        str = str.replace(
            /<ruby><rb>([^\x01-\x7E]+)<\/rb><rp>\(<\/rp><rt>([^\x01-\x7E]+)<\/rt><rp>\)<\/rp><\/ruby>/g,
            "｜$1《$2》"
        );
        return str;
    }
}

const separateRubyAsArray = (line) => {
    let array = [];
    let str = line;

    let i = 0;
    while(str.length > -1){
        let rubyIndex = str.indexOf("｜");
        if(rubyIndex > -1){
            array.push(str.substr(0, rubyIndex));
            const ruby = str.match(/<ruby><rb>([^\x01-\x7E]+)<\/rb><rp>\(<\/rp><rt>([^\x01-\x7E]+)<\/rt><rp>\)<\/rp><\/ruby>/);
            console.log("ruby");
            console.log(ruby);
            const jsxRuby = ruby[0].replace(
                /<ruby><rb>([^\x01-\x7E]+)<\/rb><rp>\(<\/rp><rt>([^\x01-\x7E]+)<\/rt><rp>\)<\/rp><\/ruby>/,
                <ruby><rb>$1</rb><rp>(</rp><rt>$2</rt><rp>)</rp></ruby>
            );
            // array.push(str.match(jsxRuby));
            // array.push(jsxRuby);
            array.push(<ruby><rb>試験</rb><rp>(</rp><rt>テスト</rt><rp>)</rp></ruby>);
            str = str.substr(rubyIndex + ruby[0].length);
        } else {
            array.push(str);
            break;
        }
        i++;
        if(i > 1000){
            console.log("endless loop!!");
            break;
        }
    }
    return array;
}

export { separateRubyAsArray, encodeJsxRuby, decodeRuby, convertDot };