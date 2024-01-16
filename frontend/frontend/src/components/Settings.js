import { register } from "../izolda.js";
import MenuButton from "./MenuButton.js";

export default class Settings {
    constructor() {
        document.title = 'Settings';
        this.buttons = [
            new MenuButton("Sound"),
            new MenuButton("Customize"),
            new MenuButton("Main Menu"),
        ];
        // register(changeColor, false);
    }

    async getHtml() {
        const buttonsHtml = await Promise.all(this.buttons.map(button => button.getHtml()));

        const menuHtml = buttonsHtml.map(html => `
            <div class="d-flex justify-content-end">
                ${html}
            </div>
        `).join('');

        const settingsHtml = menuHtml;

        return settingsHtml;
    }  

}