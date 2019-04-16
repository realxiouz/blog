<template>
	<div class="nav-wrap bs">
		<div class="nav-inner">
			<div class="logo" title="Blog"></div>
		</div>
	</div>
</template>

<script>
export default {
	data: _ => ({
		items: [],
	})
}
</script>

<style lang="scss" scoped>
.nav-wrap{
	width: 100%;
	background: #fff;
	.nav-inner{
		width: 1000px;
		margin: 0 auto;
		height: 52px;
		display: flex;
		align-items: center;
		.logo{
			width: 64px;
			height: 30px;
			background-image: url('/static/img/logo.png');
			background-size: 100% 100%;
		}
	}
}
</style>
