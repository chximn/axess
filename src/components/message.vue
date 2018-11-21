<template>
	<div :class="{ msg: true, from: message.to == 'me'}">
		<div class="bull" :id="'message-text-' + _id"></div>
	</div>
</template>

<script>
	export default {
		name: 'Message',
		props: ['message', '_id'],

		mounted() {
			let messageText = document.getElementById('message-text-' + this._id)
			let range = document.createRange()
			range.setStart(messageText, 0)
			messageText.appendChild(range.createContextualFragment(`<span>${this.message.text}</span>`))
		}
	}
</script>

<style>
	.msg {
		background: white;
		margin: 15px;
		text-align: right;
	}

	.msg.from {
		text-align: left;
	}

	.msg .bull {
		text-align: left;
		display: inline-block;
		background: #009688;
		color: white;
		padding: 7px 15px;
		border-radius: 17px;
		max-width: 70%;
	}

	.msg.from .bull {
		background: #ccc;
		color: #444;
	}
</style>
