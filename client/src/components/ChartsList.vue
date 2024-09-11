<template>
	<div class="charts">
		<div class="charts__header">
			<h2 class="charts__title">Lista utworzonych wykresów</h2>
		</div>
		<div class="charts__body">
			<ul v-if="charts.length" class="charts__list">
				<li v-for="chart in charts" :key="chart.id" class="charts__item">
					<h3 class="charts__title">{{ chart.title }}</h3>
					<p class="charts__date">{{ formatDate(chart.created) }}</p>
					<div class="charts__divider"></div>
					<RouterLink :to="`/charts/${chart.id}`" class="charts__link">Otwórz</RouterLink>
					<button @click="removeChart(chart.id)" class="charts__delete">Usuń</button>
				</li>
			</ul>
			<h3 v-else class="charts__feedback">Brak wykresów do wyświetlenia.</h3>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchCharts, deleteChart } from '../services/Api.js'

const charts = ref([])

const loadCharts = async () => {
	try {
		charts.value = await fetchCharts()
	} catch (error) {
		console.error('Błąd przy pobieraniu notatek:', error)
	}
}

const removeChart = async id => {
	try {
		await deleteChart(id)
		charts.value = charts.value.filter(chart => chart.id !== id)
	} catch (error) {
		console.error('Błąd przy usuwaniu wykresu:', error)
	}
}

const formatDate = dateString => {
	const date = new Date(dateString)
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const year = date.getFullYear()
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')

	return `${day}.${month}.${year} ${hours}:${minutes}`
}

onMounted(loadCharts)
</script>

<style scoped lang="scss">
.charts {
	background-color: #fff;
	border-radius: 5px;
	&__header {
		padding: 0.5em 1.5em;
		border-radius: 5px 5px 0 0;
		color: #fff;
		background-color: #3498db;
	}
	&__body {
		padding: 1.5em;
		border-radius: 5px;
	}
	&__list {
		list-style: none;
	}
	&__item {
		align-items: center;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 50px;
		margin-bottom: 0.5em;
	}

	&__title {
		grid-area: 1 / 1 / 2 / 2;
	}

	&__date {
		grid-area: 1 / 2 / 2 / 3;
	}
	&__divider {
		grid-area: 1 / 4 / 2 / 4;
	}
	&__link {
		grid-area: 1 / 5 / 2 / 5;
	}
	&__delete {
		grid-area: 1 / 6 / 2 / 6;
	}
	&__link {
		margin-right: 1em;
		padding: 0.5em 1em;
		border: none;
		border-radius: 5px;
		transition: background-color 0.1s, color 0.1s;
		font-size: 1.6rem;
		text-decoration: none;
		color: #000;
		background-color: #e9e9ed;
		cursor: pointer;
		&:hover {
			background-color: #bdbdbd;
		}
	}
}

button:hover {
	background-color: red;
	color: white;
}
</style>
