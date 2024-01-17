import { register } from "../izolda.js";

function createMessage(data) {
	const messageDiv = document.createElement('div');
	messageDiv.classList.add('global-chat-message');
	messageDiv.innerHTML = `
		<div class="message blue-bg">
			<div class="message-sender">${data.author}</div> 
			<div class="message-text">${data.message}</div>
		</div>
	`;
	const chat = document.getElementById('global-chat');
	chat.scrollTop = chat.scrollHeight + 10;
	return messageDiv;
}


function putMessage(message) {
	const messages = document.getElementById('global-chat-messages');
	messages.appendChild(createMessage(message));
}


export default class GlobalChat {
	constructor () {
		document.title = 'Global Chat';
		this.socket = new WebSocket('ws://localhost:8000/ws/chat/global/');

		this.socket.onopen = function(e) {
			console.log('Connection established');
		}

		this.socket.onmessage = function(event) {
			const data = JSON.parse(event.data);
			putMessage(data);
		}

		this.socket.onclose = function(event) {
			console.log('Connection closed');
			console.log(event.code + ' ' + event.reason);
		}

		this.socket.onerror = function(error) {
			console.log(`[error] ${error.message}`);
		}

		// register(createMessage);
		// register(putMessage);
	}

	async getHtml() {
		return `
			<div id="global-chat" class="global-chat rounded-4 p-4">

				<div class="global-chat-header">
					<h1 class="fw-bold">Chat</h1>
				</div>
				<div class="global-chat-body py-4">
					<div id="global-chat-messages">
					</div>
				</div>
				<form class="chat-input-form">
					<input type="text" class="chat-input" required placeholder="Type your message here..." />
					<button type="submit" class="send-button">Send</button>
				</form>
			</div>
		`;
	}
}
