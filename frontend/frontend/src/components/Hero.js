import Menu from "./MainMenu.js";
import AboutUs from "./AboutUs.js";
import Navbar from "./Navbar.js";
import StartModal from "./StartModal.js";

export default class Hero {
    constructor() {
        document.title = 'Main';
        this.menu = new Menu();
        this.about = new AboutUs();
        this.navbar = new Navbar();
        this.startModal = new StartModal();
    }

    async getHtml() {
        return `
            ${await this.startModal.getHtml()}
            ${await this.navbar.getHtml()}
            <div id="hero">
                <div class="hero">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-4">
                            </div>
                            <div class="col-xl-4">
                            </div>
                            <div class="col-xl-4">
                                
                                <!-- Logo -->
                                <div class="row logo justify-content-end me-5">
                                
                                <!--
                                    <img class="img_logo m-2" src="/src/static/text_logo.png" alt=""></img>
                                -->
                                
                                </div>
                                
                                <!-- Buttons -->
                                <div id="menu" class="me-5 mt-5">
                                    ${await this.menu.getHtml()}
                                </div>

                                <!-- Modal -->
                                ${await this.about.getModalView()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}