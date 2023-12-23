export default class AboutUs {
    constructor() {
        document.title = 'About Us';
    }

    async getHtml() {
        return `
            <p>
                We are Vladimir, Gevorg, Victor and Alexey behind the creation 
                of the addictive game Ping Pong, implemented by web technologies 
                using Jango and Vanilla JavaScript. Our development team combines 
                unique skills and passion for game creation, 
                and we are proud to introduce you to ft_transcendence.
            </p>
            <p>
                Our project, based on the ft_transcendence theme, offers an 
                immersive and fun experience of playing ping pong right in a 
                web browser. We aimed to create a unique interaction with the game, 
                utilizing the latest web technologies and providing 
                stunning graphics and gameplay.
            </p>
            <p>
                Our goal was not just to create a game, but to make it 
                fun and accessible to everyone. We paid attention to detail 
                to provide you with an exciting and unique experience playing 
                Ping Pong. Thank you for joining us on this exciting adventure!
            </p>
            <p>
                With Love,<br>
                ft_transcendence Development Team
            </p>

        `;
    }

    // findContent(text) {
    //     const matches = [];
    //     for (const button of document.querySelectorAll('button')) {
    //         if (button.textContent.includes(text)) {
    //             button.setAttribute('data-bs-toggle', 'modal');
    //             button.setAttribute('data-bs-target', '#staticBackdrop');
    //             // button.setAttribute('id', 'modal_button');
    //         }
    //     }
    // }

}