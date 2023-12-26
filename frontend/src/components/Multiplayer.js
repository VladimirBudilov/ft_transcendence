import MenuButton from "./MenuButton.js";

export default class Multiplayer {
    constructor() {
        this.buttons = [
            new MenuButton("Two Players", "StartGameVsPlayer()"),
            new MenuButton("Online"),
            new MenuButton("Main Menu"),
        ];
        document.title = 'Multiplayer';
    }

    async getHtml() {
        const buttonsHtml = await Promise.all(this.buttons.map(button => button.getHtml()));
        const menuHtml = buttonsHtml.map(html => `
            <div class="row">
                <div class="d-flex justify-content-end">
                    ${html}
                </div>
            </div>
        `).join('');

        return menuHtml;
    }  
}