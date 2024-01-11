class SettingField {

    isSettingField = true;
    colorField = 0x000000;

    SetColorField = (color) => {
        this.colorField = color;
    }

    constructor() {

    }

    async getHtml() {
        return `
        `;
    }
}