import MenuButton from "./MenuButton.js";

export default class Music {
    constructor() {
        document.title = 'Sound';
        this.buttons = [
            new MenuButton("Mute"),
            new MenuButton("Main Menu"),
        ];
    }

    async getHtml() {
        const buttonsHtml = await Promise.all(this.buttons.map(button => button.getHtml()));
        const html = ` 
            <div class="d-flex justify-content-end mb-2">
                <div class="back">
                    <p class="button_volume mx-5">Volume</p>
                </div>
            </div>
            <div class="row ms-5 me-1 mb-5">
                <div class="volume_box">
                    <div class="volume">

                    </div>
                </div>
            </div>
        `;
        const menuHtml = buttonsHtml.map(html => `
            <div class="d-flex justify-content-end">
                ${html}
            </div>
        `).join('');

        const settingsHtml = html + menuHtml;

        return settingsHtml;
    }

}