import MenuButton from "./MenuButton.js";

export default class Customize {
    constructor() {
        document.title = 'Customize';
        this.buttons = [
            new MenuButton("Main Menu"),
        ];
    }

    async getHtml() {
        const buttonsHtml = await Promise.all(this.buttons.map(button => button.getHtml()));
        const settingField = `
            <div class="d-flex justify-content-end">
                <div class="back">
                    <button id="colorButton" class="button_setting mx-5" onclick="setColor()">Color</button>
                </div>
            </div>
        `;

        const setting3D = `
            <div class="d-flex justify-content-end">
                <div class="back">
                    <button id="button3D" class="button_setting3d mx-5" onclick="set3D()">3D Field</button>
                </div>
            </div>
        `;

        const superHit = `
            <div class="d-flex justify-content-end">
                <div class="back">
                    <button id="buttonHit" class="button_setting_hit mx-5" onclick="setSkillActive()">Super Hit</button>
                </div>
            </div>
        `;

        const menuHtml = buttonsHtml.map(html => `
            <div class="d-flex justify-content-end">
                ${html}
            </div>
        `).join('');

        const settingsHtml = settingField + setting3D + superHit + menuHtml;

        return settingsHtml;
    }

}