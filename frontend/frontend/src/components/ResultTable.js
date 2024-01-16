import MenuButton from "./MenuButton.js";
import Navbar from "./Navbar.js";


export default class ResultTable {
    constructor() {
        document.title = 'Results';
        this.button = new MenuButton("Exit");
        this.navbar = new Navbar();
    }

    async getHtml() {
        
        const buttonHtml = this.button.getHtml();
        const button = buttonHtml.replace(/back/g, "");

        const result = getAllResult();

        return `
            ${await this.navbar.getHtml()}
            <div class="table-results">
                <div class="container">
                    <div id="results" class="row d-flex justify-content-center align-items-center scroll-result mx-2"></div>
                    <div class="row d-flex justify-content-center align-items-center mt-5">
                        ${button}
                    </div>
                </div>
                
            </div>
        `;
    }

}