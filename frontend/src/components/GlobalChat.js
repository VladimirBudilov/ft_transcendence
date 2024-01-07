

function putMessage() {
	const messages = document.getElementById('global-chat-messages');
}


export default class GlobalChat {
	constructor () {
		document.title = 'Global Chat';
		console.log('Global Chat');
	}

	async getHtml() {
		return `
			<div class="global-chat">
				<div class="global-chat-header">
					<h1>Global Chat</h1>
				</div>
				<div class="global-chat-body">
					<div class="global-chat-messages">
						<div class="global-chat-message">
						</div>
					</div>
				</div>
			</div>
		`;
	}
}
