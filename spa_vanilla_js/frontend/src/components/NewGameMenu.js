import MenuButton from "./MenuButton.js";

export default class NewGameMenu {
    constructor() {
        this.buttons = [
            new MenuButton("Singleplayer"),
            new MenuButton("Multiplayer"),
            new MenuButton("Back"),
        ];
        document.title = 'New Game';
    }

    async getHtml() {
        const buttonsHtml = await Promise.all(this.buttons.map(async (button) => await button.getHtml()));
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



