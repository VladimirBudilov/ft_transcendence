export default class AboutUs {
    constructor() {
        document.title = 'About Us';
    }

    async getHtml() {
        return `
            <p class="text">
                We are Vladimir, Gevorg, Victor and Alexey behind the creation 
                of the addictive game Ping Pong, implemented by web technologies 
                using Jango and Vanilla JavaScript. Our development team combines 
                unique skills and passion for game creation, 
                and we are proud to introduce you to ft_transcendence.
            </p>
            <p class="text">
                Our project, based on the ft_transcendence theme, offers an 
                immersive and fun experience of playing ping pong right in a 
                web browser. We aimed to create a unique interaction with the game, 
                utilizing the latest web technologies and providing 
                stunning graphics and gameplay.
            </p>
            <p class="text">
                Our goal was not just to create a game, but to make it 
                fun and accessible to everyone. We paid attention to detail 
                to provide you with an exciting and unique experience playing 
                Ping Pong. Thank you for joining us on this exciting adventure!
            </p>
            <p class="text">
                With Love,<br>
                ft_transcendence Development Team
            </p>

        `;
    }

    async getModalView() {
        return `
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-2 fw-bold" id="staticBackdropLabel">About Us</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                ${await this.getHtml()}          
              </div>
              <div class="modal-footer">
              </div>
            </div>
          </div>
        </div>
        
        `;
    }
}