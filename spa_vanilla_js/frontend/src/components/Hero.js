import Menu from "./MainMenu.js";

export default class Hero {
    constructor() {
        document.title = 'Main';
        this.menu = new Menu();
    }

    async getHtml() {
        const menuHtml = await this.menu.getHtml();

        return `
        <div class="row-1 nav_bar d-flex justify-content-between">
            <div class="p-2">
                <span class="logo_text ps-5">PING PONG</span>
            </div>
            <div class="auth_button p-2">
                <button class="btn btn-primary me-5" type="submit">Sign In</button>
            </div>      
        </div>
        <div class="hero">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                    </div>
                    <div class="col-lg-4">
                    </div>
                    <div class="col-lg-4">
                        <div class="row logo justify-content-end me-5">
                            <img class="img_logo m-2" src="/src/static/text_logo.png" alt=""></img>
                        </div>
                        <div id="menu" class="me-5 mt-5">
                            ${await this.menu.getHtml()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}