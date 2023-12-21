export default class {
    constructor() {
        document.title = 'Settings';
    }

    async getHtml() {
        return `
            <h1 class="content">Settings</h1>
            <p>You are viewing the Settings!</p>
        `;
    }

}