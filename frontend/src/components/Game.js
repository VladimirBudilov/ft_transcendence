import Navbar from './Navbar.js';
import MenuButton from './MenuButton.js';

export default class Game {
    constructor() {
        document.title = 'Game';
        this.button = new MenuButton("Exit", "StopGame()");
        this.navbar = new Navbar();
    }

    async getHtml() {
        const player = require('../scripts/globalData.js').default;

        console.log(player.defaultPlayerName);

        const loader = document.querySelector('.loader');
        loader.classList.remove('hidden');
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 400);

        const tournamrnInputs = window.location.href.substring(window.location.href.lastIndexOf('/')) === '/tournament' ? await this.tournamrnInputs() : '';

        return `
            ${await this.navbar.getHtml()}
            <div class="game">
                <div class="container">
                    <div class="row d-flex justify-content-center">
                        <div class="col-9 col-xxl-7 col-lg-8 col-md-7">
                            <div id='gameCanvas' class="mt-2"></div>
                        </div>
                        <div class="col-lg-3 col-md-5">
                            <div id='scoreboard'>
                                <h1 id='playerNames' class="text_game"></h1>
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
