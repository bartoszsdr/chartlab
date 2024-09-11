<template>
	<nav class="nav">
		<div class="nav__box">
			<h1 class="nav__title"><img src="/icons/chart.svg" alt="Logo" />ChartLab</h1>
			<div class="nav__links">
				<RouterLink to="/" class="nav__link"
					><img src="/icons/plus.svg" alt="Generuj wykres" /><span>Generuj wykres</span></RouterLink
				>
				<RouterLink to="/charts" class="nav__link"
					><img src="/icons/box.svg" alt="Moje wykresy" /><span>Moje wykresy</span></RouterLink
				>
				<a href="https://github.com/bartoszsdr/chartlab" class="nav__link" rel="noopener" target="_blank"
					><img src="/icons/book.svg" alt="Dokumentacja" /><span>Dokumentacja</span></a
				>
			</div>
		</div>
	</nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped lang="scss">
.nav {
	display: flex;
	width: 100%;
	height: 4.5em;
	top: 0;
	margin-bottom: 2em;
	background-color: #343a40;
	box-shadow: 0 8px 8px -10px rgba(0, 0, 0, 0.15);
	border: none;
	&__title {
		display: flex;
		color: #fff;
		img {
			margin-right: 0.25em;
			color: #fff;
		}
	}
	&__box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		max-width: 1280px;
		margin: 0 auto;
		padding: 1em;
	}
	&__links {
		display: flex;
		justify-content: center;
	}
	&__link {
		display: flex;
		align-items: center;
		padding: 0.5em 0.7em;
		transition: color 0.1s;
		text-decoration: none;
		color: #fff;
		span {
			display: none;
		}
		img {
			margin-right: 0.25em;
		}
		&:hover {
			color: #3498db;
		}
	}
}

@media (min-width: 768px) {
	.nav {
		&__link {
			span {
				display: block;
			}
		}
	}
}
</style>
