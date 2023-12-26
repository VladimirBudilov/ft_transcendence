export default class MenuButton {
    constructor(text, onClick) {
        this.text = text || "Button";
        this.onClick = onClick || null;
    }

    getHtml() {
        const onClickAttribute = this.onClick ? `onclick="${this.onClick}"` : '';
        return `
            <button class="button_menu back" ${onClickAttribute}>
                <span id="button_text" class="button_text mx-5">${this.text}</span>
            </button>
        `;
    }
}
