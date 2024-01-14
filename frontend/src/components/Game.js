import Navbar from './Navbar.js';
import MenuButton from './MenuButton.js';


export default class Game {
    constructor() {
        document.title = 'Game';
        this.button = new MenuButton("Exit", "StopGame()");
        this.navbar = new Navbar();
    }

    async getHtml() {

        const loader = document.querySelector('.loader');
        loader.classList.remove('hidden');
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 400);

        const tournamrnInputs = window.location.href.substring(window.location.href.lastIndexOf('/')) === '/tournament' ? await this.tournamrnInputs() : '';

        const buttonHtml = await this.button.getHtml();
        const button = buttonHtml.replace(/back/g, "");
        

        return `
            ${await this.navbar.getHtml()}
            <div class="game">
                <div class="container">
                    <div class="row d-flex justify-content-center align-items-center rounded-5 p-5" style="background: #1f162e;">
                        <div class="col-9 col-xxl-7 col-lg-8 col-md-7">
                            <div id='gameCanvas' class="mt-2"></div>
                        </div>
                        <div class="col-lg-3 col-md-5">
                            <div id='scoreboard' class="rounded-top-5">
                                <p id='playerNames' class="text_game fs-1 mt-3 pt-4"></p>
                                <p id='scores' class="text_game" style="color: #805EF6!important">0-0</p>
                                <p id='winnerBoard' class="text_game fs-2">First to score 7 wins!</p>
                            </div>
                            ${tournamrnInputs}
                            <div class="row">
                                <div class="d-flex justify-content-center pb-3">
                                    ${button}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async tournamrnInputs() {
        return `
            <div class="row my-5">
                <div id='tournament'>
                    <div class="row">
                        <label for="userInput" class="p-0 form-label">
                            <h1 id="tournament-text" class="tournament-text">Enter number of players:</h1>
                        </label>
                    </div>
                    <div class="row">
                        <input type="text" class="tournament-text-input form-control" id="userInput" placeholder="Enter text here" aria-describedby="emailHelp">
                        <button class="tournament-text-button mt-2"onclick="ReadInput()">Submit</button>
                    </div>
                </div>
            </div>
        `;
    }

}
