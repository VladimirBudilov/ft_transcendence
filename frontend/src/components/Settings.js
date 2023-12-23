import MenuButton from "./MenuButton.js";

export default class Settings {
    constructor() {
        document.title = 'Settings';
        this.buttons = [
            new MenuButton("Main Menu"),
        ];
    }

    async getHtml() {
        const buttonsHtml = await Promise.all(this.buttons.map(button => button.getHtml()));
        const menuHtml = buttonsHtml.map(html => `
            <div class="row">
                <p class="button_volume d-flex justify-content-end">Volume</p>
            </div>
            <div class="row ms-5">
                <div class="volume_box">
                    <div class="volume">

                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end mt-5">
                ${html}
            </div>
        `).join('');

        return menuHtml;
    }  

}