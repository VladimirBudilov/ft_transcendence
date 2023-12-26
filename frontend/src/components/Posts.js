export default class {
    constructor() {
        document.title = 'Posts';
    }

    async getHtml() {
        return `
            <h1 class="content">Posts</h1>
            <p>You are viewing the Posts!</p>
        `;
    }

}