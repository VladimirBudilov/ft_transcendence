export default class {
  constructor() {
	  this.intra_login_url = "http://localhost:8000/api/v1/auth/intra/login/";
  }

  async getHtml() {
    return `
      <div class="row-1 nav_bar d-flex justify-content-between">
        <div class="padding-2 mt-2">
            <a class="logo_text ms-3" href="/">PING PONG</a>
        </div>
        <div class="auth_button padding-2">
			<a href="${this.intra_login_url}" class="btn btn-primary me-3">Sign In</a>
        </div>      
      </div>
    `;
  }
}
