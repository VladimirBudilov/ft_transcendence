export default class GamePage {
    constructor() {
        document.title = 'Game Page';
    }

    async getHtml() {
        return `
        <div class="game">
            <div class="container">
                <div class="row">
                        <div class="col-md-9">
                            <object type="text/html" data="../../index.html" width="100%" height="500px"></object>
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