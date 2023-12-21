export default class {
  constructor() {

  }

  async getHtml() {
    return `
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img class="w-50" src="/src/static/logo_text.png" alt="">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link" href="#">
              <img class="button_nav" src="/src/static/home.png"></a>
            </a>
            <a class="nav-link" href="#">
              <img class="button_nav" src="/src/static/information.png"></a>
            </a>
            <a class="nav-link disabled">
              <img class="button_nav" src="/src/static/sound.png"></a>
            </a>
          </div>
        </div>
      </div>
    </nav>
    `;
  }
}
