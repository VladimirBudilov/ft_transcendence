function authButton() {
	window.addEventListener("load", () => {
	console.log("authButton");
	const auth_button = document.getElementById("auth_button");
	console.log(auth_button);

	if (localStorage.getItem("username") != null) {
		auth_button.innerHTML = `
					<button class="btn btn-primary me-3">${localStorage.getItem('username')}</a>
				`.trim();
	} else {
		auth_button.innerHTML = `
					<a href="http://localhost:8000/api/v1/auth/intra/login/" class="btn btn-primary me-3">Sign In</a>
				`.trim();
	};
	});
}


export default class {
	constructor() {
		this.intra_login_url = "http://localhost:8000/api/v1/auth/intra/login/";

		let script = document.createElement("script");
		script.type = "text/javascript";

		script.innerHTML += authButton.toString();
		script.innerHTML += `\nauthButton();`;

		document.head.appendChild(script);
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
