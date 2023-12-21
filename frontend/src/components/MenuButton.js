export default class MenuButton {
    constructor(text) {
        this.text = text || "Button";
    }

    getHtml() {
        
        return `
            <button class="button_menu">
                <span id="button_text" class="button_text">${this.text}</span>
            </button>
        `;
    }
}
