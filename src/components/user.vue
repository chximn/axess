<template>
	<div class="user">
		<span :class="{'status-indicator': true, 'on': user.online}"></span>
		{{ user.username }}
	</div>
</template>

<script>

	export default {
		name: 'User',
		props: ['user']
	}

</script>


<style lang="css">

	.user {
		padding: 10px 20px;
		border-bottom: 1px solid #ddd
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
