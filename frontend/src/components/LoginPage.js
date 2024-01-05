import Navbar from './Navbar.js';


// Function to set a cookie
function setCookie(name, value, seconds) {
	document.cookie = name + "=" + escape(value) + "; path=/; expires=" + seconds;
}

// Function to get a cookie
function getCookie(name) {
	let items = document.cookie.split(";");
	for (let i = 0; i < items.length; i++) {
		if (items[i].trim().startsWith(name + "=")) {
			return unescape(items[i].trim().substring(name.length + 1));
		}
	}
}


// Function to get the headers for the fetch request
function getHeaders() {
	headers = {};
	headers['Content-Type'] = 'application/json';
	if (getCookie('access_token') != null) {
		headers['Authorization'] = 'Bearer ' + getCookie('access_token');
	}
	return headers;
}


// Function to sign in with intra
// Send a POST request to the backend with the login from 
// the input and the code from the url
async function signIn() {
	const backend_url = 'http://localhost:8000';
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
		headers: getHeaders(),
		body: JSON.stringify({
			'login': login,
			'code': code,
		}),
	});

	// If the response is not ok, alert the user
	// and redirect to the login page
	if (!res.ok) {
		alert('Invalid login');
		return;
	}

	// If the response is ok, save the tokens and redirect to the home page
	let data = await res.json();
	if (data.access != null && data.refresh != null) {
		setCookie('access_token', data.access, data.expires);
		setCookie('refresh_token', data.refresh, data.expires);
	}

	// Get the user data
	res = await fetch(backend_url + '/api/v1/auth/intra/me/', {
		method: 'GET',
		headers: getHeaders(),
	});

	// If the response is not ok, alert the user
	if (!res.ok) {
		alert('Something went wrong ' + res.status);
		return;
	}

	// If the response is ok, save the user data
	data = await res.json();
	localStorage.setItem('username', data.username);
	localStorage.setItem('email', data.email);
	localStorage.setItem('first_name', data.first_name);
	localStorage.setItem('last_name', data.last_name);

	window.location.href = '/';
}


export default class LoginPage {
    constructor() {
        document.title = 'Login';

		// Add the signIn and getHeaders functions to the script tag
		// to be able to use them in the html
		const script = document.createElement('script');

		script.innerHTML += getCookie.toString();
		script.innerHTML += setCookie.toString();
		script.innerHTML += signIn.toString();
		script.innerHTML += getHeaders.toString();

		document.head.appendChild(script);
    }

	async getHtml() {
		return `
			${await new Navbar().getHtml()}
			<div class="my-5 py-5 d-flex justify-content-center align-items-center">
				<div class="login p-4 rounded-4" style="background-color: #35264E; color:#805EF6;">
					<h1 class="">Log In</h1>
					<div>
						<input
							id="login"
							type="text"
							placeholder="Intra login"
							class="ps-2 d-block border-0 text-black border-bottom rounded-1 mt-5 form-input"
							style="width:15rem; height:40px; letter-spacing: 1px;"/>
						<button
							onclick="signIn()"
							class="d-block btn btn-primary mt-2 mb-2 text-start"
							style="width:15rem; height: 40px; letter-spacing:1px;">
							Sign In
						</button>
					</div>
				</div>
			</div>
		`;
	}
}
