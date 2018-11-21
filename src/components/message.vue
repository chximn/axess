<template>
	<div :class="{ msg: true, from: message.to == 'me'}">
		<div class="bull">
			{{ message.text }}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Message',
		props: ['message']
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
