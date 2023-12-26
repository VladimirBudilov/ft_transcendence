import Navbar from './Navbar.js';
import MenuButton from './MenuButton.js';
 
export default class Game {
    constructor() {
        document.title = 'Game';
        this.button = new MenuButton("Exit", "StopGame()");
    }

    async getHtml() {

        const tournamrnInputs = window.location.href.substring(window.location.href.lastIndexOf('/')) === '/tournament' ? await this.tournamrnInputs() : '';

        return `
            ${await new Navbar().getHtml()}
            <div class="game">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-9" style="display: flex; align-items: center;">
                            <div id='gameCanvas' class="mt-2"></div>
                        </div>
                        <div class="col-lg-3">
                            <div id='scoreboard'>
                                <h1 id='scores' class="text_game" style="color: #805EF6!important">0-0</h1>
                                <h2 id='winnerBoard' class="text_game">First to score 7 wins!</h2>
                            </div>
                            <div class="row">
                                <div class="d-flex justify-content-center">
                                    ${this.button.getHtml()}
                                </div>
                            </div>
                            ${tournamrnInputs}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async tournamrnInputs() {
        return `
            <div class="row">
                <div id='tournament'>
                    <label for="userInput">
                        <h1>Enter tournament name</h1>
                    </label><input type="text" id="userInput" placeholder="Enter text here">
                    <button onclick="ReadInput()">Submit</button>
                </div>
            </div>
        `;
    }
}