<template>
	<div class="user" @click="onclick" :username="user.username">
		<span :class="{'status-indicator': true, 'on': user.online}"></span>
		{{ user.username }}
	</div>
</template>

<script>

	export default {
		name: 'User',
		props: ['user'],

		methods: {
			onclick() {
				this.$emit('click', this.user)
			}
		}
	}

</script>


<style lang="css">

	.user {
		padding: 10px 20px;
		border-bottom: 1px solid #ddd;
		cursor: pointer;
		transition: background 0.3s ease-out 0s;
	}

	.user:hover {
		background: #ddd;
	}

	.user .status-indicator {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius : 50%;
		background: #ccc;
	}

	.user .status-indicator.on {
		background: #4caf50;
	}

</style>
