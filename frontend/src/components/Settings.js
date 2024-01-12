import { register } from "../izolda.js";
import MenuButton from "./MenuButton.js";

function changeColor() {
    if (isDefaultColor) {
        document.getElementById("colorButton").innerHTML = "Default Color";
    } else {
        document.getElementById("colorButton").innerHTML = "Custom Color";
    }
}


export default class Settings {
    constructor() {
        document.title = 'Settings';
        this.buttons = [
            new MenuButton("Mute"),
            new MenuButton("Main Menu"),
        ];
        // register(changeColor, false);
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
                <button id="button3D" class="button_setting3d mx-5" onclick="set3D()">3D</button>
            </div>
        </div>
    `;

        const menuHtml = buttonsHtml.map(html => `
            <div class="d-flex justify-content-end">
                ${html}
            </div>
        `).join('');

        const settingsHtml = html + settingField + setting3D + menuHtml;

        return settingsHtml;
    }  

}