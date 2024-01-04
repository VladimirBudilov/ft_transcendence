import Navbar from './Navbar.js';


function signIn() {
	const backend_url = 'http://localhost:8000';
	let login = document.getElementById('login').value;
	let code = window.location.href.split('?code=')[1];

	console.log(login);
	console.log(code);

	if (code == null || code == '') {
		window.location.href = backend_url + '/api/v1/auth/intra/login/';
		return;
	}
	if (login == null || login == '') {
		alert('Please enter your login');
		return;
	}

	fetch(backend_url + '/api/v1/auth/intra/login/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			'login': login,
			'code': code
		}),
	})
	.then(response => response.json())
	.then(data => {
		console.log(data);
	})
	.catch((error) => {
		console.error('Error:', error);
	});
	console.log(document.cookie);
}


export default class LoginPage {
    constructor() {
        document.title = 'Login';

		const script = document.createElement('script');
		script.innerHTML += signIn.toString();
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
