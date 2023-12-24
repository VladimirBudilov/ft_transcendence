export default class MenuButton {
    constructor(text) {
        this.text = text || "Button";
    }

    getHtml() {
        
        return `
            <button class="button_menu back">
                <span id="button_text" class="button_text mx-5">${this.text}</span>
            </button>
        `;
    }
}
