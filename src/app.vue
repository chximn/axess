<template>
	<div id="app">
			<header class="header">
				Axess
			</header>

			<div class="container-fluid">
				<section class="users">
					<user v-for="(user, i) in users" :user="user" :key="i"></user>
				</section>

				<section class="messages">
					Messages
				</section>

				<section class="notes">
					Notes
				</section>
			</div>


	</div>
</template>

<script>

	import User from './components/user.vue'

	export default {
		name: 'Hello',
		data() {
			return {
				users: []
			}
		},

		mounted() {
			let hash = location.href.split('=')[1] || (new Date()).getTime()

			setInterval(() => fetchUsers(hash).then(users => this.users = users), 1000) // every 1s
		},

		components: { User }
	}

	function fetchUsers(hash) {
		return fetch(`http://localhost:3333/${hash}/users`)
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
	}

	.messages {
		flex-grow: 1;
		padding: 20px;
	}

	.notes {
		background: #efefef;
		width: 300px;
		padding: 20px;
		border-left: 1px solid #ddd;
	}

</style>
