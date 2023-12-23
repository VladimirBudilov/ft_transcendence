import Menu from "./MainMenu.js";
import AboutUs from "./AboutUs.js";

export default class Hero {
    constructor() {
        document.title = 'Main';
        this.menu = new Menu();
        this.about = new AboutUs();
    }

    async getHtml() {
        const menuHtml = await this.menu.getHtml();

        return `
        <div class="row-1 nav_bar d-flex justify-content-between">
            <div class="p-2">
                <a class="logo_text ps-5" href="/">PING PONG</a>
            </div>
            <div class="auth_button p-2">
                <button class="btn btn-primary me-5" type="submit">Sign In</button>
            </div>      
        </div>
        <div id="hero">
            <div class="hero">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-4">
                        </div>
                        <div class="col-xl-4">
                        </div>
                        <div class="col-xl-4">
                            <div class="row logo justify-content-end me-5">
                                <img class="img_logo m-2" src="/src/static/text_logo.png" alt=""></img>
                            </div>

                           <div id="menu" class="me-5 mt-5">
                                ${await this.menu.getHtml()}
                            </div>

                            <!-- Modal -->
                            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                              <div class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="staticBackdropLabel">About Us</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div class="modal-body">
                                        ${await this.about.getHtml()}
                                  </div>
                                  <div class="modal-footer">

                                <!-- 
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Understood</button>
                                -->

                                  </div>
                                </div>
                              </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}