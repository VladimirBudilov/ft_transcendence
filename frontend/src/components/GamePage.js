import Navbar from './Navbar.js';
import MenuButton from './MenuButton.js';
 
export default class GamePage {
    constructor() {
        document.title = 'Game Page';
        this.button = new MenuButton("Exit", "StopGame()");
    }

    async getHtml() {
        return `
            ${await new Navbar().getHtml()}
            <div class="game">
                <div class="container">
                <div class="row">
                    <div class="col-9">
                        <div id='gameCanvas' class="mt-2"></div>
                    </div>
                    <div class="col-3">
                        <div id='scoreboard'>
                            <h1 id='scores' class="text_game" style="color: #805EF6!important">0-0</h1>
                           <!-- <h2 id='winnerBoard' class="text_game">First to score 7 wins!</h2> -->
                        </div>
                        <div class="row">
                        <div class="d-flex justify-content-center">
                            ${this.button.getHtml()}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        `;
    }

}