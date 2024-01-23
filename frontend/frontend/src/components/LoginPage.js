import Navbar from './Navbar.js';
import GlobalChat from './GlobalChat.js';
import { register } from '../izolda.js';
import { getCookie, setCookie } from '../utils.js';
import MenuButton from './MenuButton.js';

// Function to sign in with intra
// Send a POST request to the backend with the login from 
// the input and the code from the url
async function signIn() {
	const backend_url = server_url;
	let login = document.getElementById('login').value;
	let code = window.location.href.split('?code=')[1];

	// If the code is empty, redirect to the intra login page
	// to get the code
	if (code == null || code == '') {
		window.location.href = backend_url + '/api/v1/auth/intra/login/';
		return;
	}
	// If the login is empty, alert the user
	if (login == null || login == '') {
		alert('Please enter your login');
		return;
	}

	// Send the POST request
	let res = await fetch(backend_url + '/api/v1/auth/intra/login/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			'login': login,
			'code': code,
		}),
	});

	// If the response is not ok, alert the user
	// and redirect to the login page
	if (!res.ok) {
		const text = `
		Something went wrong ${res.status}\n
		Please try again
		Error: ${await res.text()}
		`.replace(/\t+/g, '');
		console.log(text);
		alert(text);
		return;
	}

	// If the response is ok, save the tokens and redirect to the home page
	let data = await res.json();
	if (data.access != null && data.refresh != null) {
		setCookie('X-Access-Token', data.access, data.expires);
		setCookie('X-Refresh-Token', data.refresh, data.expires);
	}

	// Get the user data
	res = await fetch(backend_url + '/api/v1/auth/intra/me/', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + getCookie('X-Access-Token'),
		},
	});

	// If the response is not ok, alert the user
	if (!res.ok) {
		alert('Something went wrong ' + res.status);
		return;
	}

	// If the response is ok, save the user data
	data = await res.json();
	setCookie('username', data.username, 3600);

}

function loader_here() {
	const loader = document.querySelector('.loader');
	loader.classList.remove('hidden');
	setTimeout(() => {
		loader.classList.add('hidden');
	}, 400);
}


export default class LoginPage {
    constructor() {
		document.title = 'Login';

		// Register the functions
		register(getCookie);
		register(setCookie);
		register(signIn);
		register(loader_here, true);
		this.button = new MenuButton("Exit");

    }

	async getHtml() {



		return `
			
			${await new Navbar().getHtml()}
			<div class="table-results">
				<div class="container">
					<div class="row d-flex justify-content-center">
						<div class="col-lg-6 col-md-5 d-flex justify-content-center align-items-center">
							<div class="login p-4 rounded-4" style="background-color: #35264E; color:#805EF6; letter-spacing: 3px; box-shadow: 0 0 0.25em #35264E;">
								<h1 style="font-weight: bold;">Log In</h1>
								<div>
									<input
										id="login"
										type="text"
										placeholder="Intra login"
										class="ps-2 d-block border-0 text-black border-bottom rounded-1 mt-5 form-input"
										style="width:15rem; height:40px; letter-spacing: 3px;"/>
									<button
										onclick="signIn()"
										class="button_auth d-block btn btn-primary mt-2 mb-2 text-start"
										style="width:15rem; height: 40px; letter-spacing:3px;">Auth</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}
