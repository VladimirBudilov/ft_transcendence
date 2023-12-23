export default class {
  constructor() {

  }

  async getHtml() {
    return `
      <div class="row-1 nav_bar d-flex justify-content-between">
        <div class="padding-2">
            <a class="logo_text ms-3" href="/">PING PONG</a>
        </div>
        <div class="auth_button padding-2">
            <button class="btn btn-primary me-3" type="submit">Sign In</button>
        </div>      
      </div>
    `;
  }
}
