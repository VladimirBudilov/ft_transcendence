export default class AboutUs {
    constructor() {
        document.title = 'About Us';
    }

    async getHtml() {
        return `


        `;
    }

    findContent(text) {
        const matches = [];
        for (const button of document.querySelectorAll('button')) {
            if (button.textContent.includes(text)) {
                button.setAttribute('data-bs-toggle', 'modal');
                button.setAttribute('data-bs-target', '#staticBackdrop');
                // button.setAttribute('id', 'modal_button');
            }
        }
    }

}