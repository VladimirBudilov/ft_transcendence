import { register } from "../izolda.js";
import { getCookie } from "../utils.js";

function logout() {
	document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function authButton() {
	const auth_button = document.getElementById("auth_button");

	if (getCookie('username') != null) {
		auth_button.innerHTML = `
				<button class="btn btn-primary me-3">${getCookie('username')}</a>
				<button class="btn btn-primary me-3" onclick="logout()">Logout</button>
			`.trim();
	} else {
		auth_button.innerHTML = `
				<a href="http://localhost:8000/api/v1/auth/intra/login/" class="btn btn-primary me-3">Sign In</a>
			`.trim();
	};
}


export default class {
	constructor() {
		this.intra_login_url = "http://localhost:8000/api/v1/auth/intra/login/";

		// Register the functions
		register(authButton, true);
		register(logout);
	}

	async getHtml() {
		return `
		  <div class="row-1 nav_bar d-flex justify-content-between">
			<div class="padding-2 mt-2">
				<a class="logo_text ms-3" href="/">PING PONG</a>
			</div>
			<div id="auth_button" class="auth_button padding-2"></div>      
		  </div>
	`;
	}
}
