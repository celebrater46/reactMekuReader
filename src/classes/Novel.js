import {Index} from "./Index";

export class Novel {
    constructor(num, title) {
        this.id = num;
        this.title = title;
        this.index = {};
        this.episodes = [];
    }

    getIndex(list, font, width, height){
        this.index = new Index(font, width, height);
        this.index.separateList(list);
    }
}