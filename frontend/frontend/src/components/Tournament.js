import MenuButton from "./MenuButton.js";

export default class MainMenu {
    constructor() {
        this.buttons = [
            new MenuButton("Start", "StartTournament()"),
            new MenuButton("Results", "getAllResult()"),
            new MenuButton("Main Menu"),
        ];
        document.title = 'Game Mode';
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