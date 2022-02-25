import {Page} from "./Page";

export class Index {
    constructor(font, width, height) {
        this.pages = [];
        this.maxWidth = width;
        this.maxHeight = height * 0.8;
        this.fontSize = font; // px
        this.rubyLineHeight = this.fontSize * 2; // px
        this.maxChars = Math.floor(this.maxWidth / this.fontSize);
    }

    separateList(list) {
        let sumHeight = 0;
        let pageNum = 0;
        this.pages.push(new Page(0));
        for(let j = 0; j < list.length; j++){
            const title = list[j].split("|");
            if(sumHeight < this.maxHeight){
                this.pages[pageNum].lines.push(title[2]);
                sumHeight += this.rubyLineHeight;
            } else {
                pageNum++;
                this.pages.push(new Page(pageNum));
                sumHeight = 0;
            }
        }
        // return this.pages;
    }
}