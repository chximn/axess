<template>
	<div id="app">
			<header class="header">
				Axess
			</header>

			<div class="container-fluid">
				<section class="users">
					<user v-for="(user, i) in users" :user="user" :key="i" @click="showMessages"></user>
				</section>

				<section class="messages">
					<div class="messages-list">
						<div v-if="activeUser">
							<div class="active-user">
								<user :user="activeUser"></user>
							</div>
						</div>

						<div v-if="activeMessages.length">
							<message v-for="message, i in activeMessages" :message="message" :_id="i" :key="i"></message>
						</div>

						<div v-else class="no-messages">
							There no messages at the moments
						</div>
					</div>

					<div class='new-message'>
						<input @keypress.enter="sendMessage" :disabled="!activeUser" class="input" v-model="newMessage" placeholder="Enter message">
					</div>
				</section>

				<section class="notes">
					<label for="notes-text">Notes: </label>

					<textarea class="textarea" id="notes-text" v-model="notes" rows="8"></textarea>
				</section>
			</div>


	</div>
</template>

<script>

	import User from './components/user.vue'
	import Message from './components/message.vue'

	const API = 'http://localhost:8080'
	const hash = location.href.split('=')[1] || (new Date()).getTime()

	export default {
		name: 'Hello',
		data() {
			return {
				users: [],
				activeUser: '',
				messages: {},
				newMessage: '',
				notes: ''
			}
		},

		computed: {
			activeMessages() {
				return this.messages[this.activeUser.username] || []
			}
		},

		methods: {
			showMessages(user) {

				if (!this.messages[user.username]) {

					fetch(`${API}/${hash}/messages/${user.username}`)
					.then(res => res.json())

					.then(data => {
						if (data.error) return console.log('Error', data.error)

						this.messages[user.username] = data
						this.activeUser = user;
					})

					.catch(e => console.log('Error occured while fetching messages'))
				}

				else this.activeUser = user
			},

			sendMessage() {
				let message = {
					from: 'me',
					to: this.activeUser.username,
					text: this.newMessage
				}

				fetch(`${API}/${hash}/messages`, {
					method: 'POST',
					body: JSON.stringify(message),
					headers: { 'Content-Type': 'application/json' }
				})

				.then(res => res.json())
				.then(json => { if (json.error) console.log('Error', json.error) })
				.catch(e => console.log(e))

				this.messages[this.activeUser.username].push(message)

				// caveat
				let messages = this.messages
				this.messages = {}
				this.messages = messages

				this.newMessage = ''

			}
		},

		mounted() {
			setInterval(() => fetchUsers(hash).then(users => this.users = users), 1000) // every 1s

			fetch(`${API}/${hash}/notes`)
			.then(res => res.json())
			.then(data => this.notes = data.notes)
			.catch(e => console.log(e))
		},

		components: { User, Message}
	}

	function fetchUsers(hash) {
		return fetch(`${API}/${hash}/users`)
		.then(res => res.json())
		.catch(e => console.log('Could not fetch users', e))
	}

</script>

<style lang="css">
	html, body, #app {
		height: 100%;
	}

	#app {
		font-family: monospace;
		font-size: 14px;
	}

	#app .container-fluid {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		height: calc(100vh - 50px);
	}

	.header {
		width: 100%;
		height: 50px;
		padding: 15px;
		background: #009688;
		color: #025d52;
		text-transform: uppercase;
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		letter-spacing: 15px;
		border-bottom: 3px solid #1a7b6f;
	}

	.users {
		background: #efefef;
		width: 300px;
		border-right: 1px solid #ddd;
		overflow-y: auto;
	}

	.messages {
		width: calc(100% - 600px);
		position: relative;
	}

	.messages .messages-list {
		padding: 20px;
		max-height: calc(100% - 50px);
		overflow-y: auto;
	}

	.messages .new-message {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 10px;
		background: #efefef;
		border-top: 1px solid #ddd;
	}

	.messages .new-message .input {
		border-radius: 15px;
		border: 2px solid #ddd;
		transition: border 0.3s ease-out 0s;
		padding: 5px 10px;
	}

	.messages .new-message .input:focus {
		box-shadow: none;
		border: 2px solid #009688;
	}

	.messages .no-messages {
		padding: 15px;
	}

	.notes {
		background: #efefef;
		width: 300px;
		padding: 20px;
		border-left: 1px solid #ddd;
	}

	.notes .textarea {
		border: 2px solid #ddd;
		transition: border 0.3s ease-out 0s;
		font-size: 14px;
	}

	.notes .textarea:focus {
		box-shadow: none;
		border: 2px solid #009688;
	}

</style>
