export class Novel {
    constructor(num, title) {
        this.id = num;
        this.title = title;
        this.episodes = [];
    }

    addEpisode(ep) {
        this.episodes.push(ep);
}
}