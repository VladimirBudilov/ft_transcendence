import { register } from "../izolda.js";
import { getCookie, deleteCookie } from "../utils.js";
import { navigateTo } from "../main.js";

function logout() {
	deleteCookie('username');
	deleteCookie('X-Access-Token');
	deleteCookie('X-Refresh-Token');
	navigateTo('/');
}

function toLogin() {
	window.location.href = "api/v1/auth/intra/login/";
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
				<button class="btn btn-primary me-3" onclick="toLogin()">Sign In</button>
			`.trim();
	};
}


export default class {
	constructor() {

		// Register the functions
		register(authButton, true);
		register(toLogin);
		register(logout);
	}

	async getHtml() {
		return `
		  <div class="row-1 nav_bar d-flex justify-content-between">
			<div class="padding-2 mt-2">
				<span class="logo_text ms-3" href="/">PING PONG</span>
			</div>
			<div id="auth_button" class="auth_button padding-2"></div>      
		  </div>
	`;
	}
}

export { authButton };
