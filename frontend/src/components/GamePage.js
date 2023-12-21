import { lol } from './test.js';
 
export default class GamePage {
    constructor() {
        document.title = 'Game Page';
        // this.game = new Game();
        lol();
    }

    async getHtml() {
        return `
        <div class="game">
            <div class="container">
                <div class="row">
                        <div class="col-md-9">
                            <iframe src="/Users/vchizhov/Desktop/ft_transcendence/game/index.html" width="100%" height="500px" frameborder="0"></iframe>
                        </div>
                        <div class="col-md-3">
                            LOL2
                        </div>
                </div>
            </div>
        </div>
        `;
    }

}