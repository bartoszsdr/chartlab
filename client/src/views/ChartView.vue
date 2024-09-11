<template>
	<main class="wrapper">
		<div v-if="chart" class="chart">
			<canvas ref="chartCanvas" class="chart__canvas"></canvas>
		</div>
		<div v-else class="chart__feedback">Ładowanie danych...</div>
	</main>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { fetchChartById } from '../services/Api.js'
import Chart from 'chart.js/auto'

const chartCanvas = ref(null)
const route = useRoute()
const chart = ref(null)

let myChart

const loadChart = async () => {
	try {
		chart.value = await fetchChartById(route.params.id)
		await nextTick()
		createChart(chart.value)
	} catch (error) {
		console.error('Błąd przy pobieraniu wykresu:', error)
	}
}

const createChart = chart => {
	const valuesObject = JSON.parse(chart.allValues)

	if (chartCanvas.value) {
		if (myChart) {
			myChart.destroy()
			console.log('destr')
		}
		myChart = new Chart(chartCanvas.value, {
			type: chart.style,
			data: {
				labels: valuesObject.length > 0 ? valuesObject[0].labels : [],
				datasets: valuesObject.map(dataset => ({
					label: dataset.names,
					data: dataset.data,
				})),
			},
			options: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: chart.title,
					},
				},
				scales: {
					x: {
						display: true,
						title: {
							display: true,
							text: chart.x_label,
						},
					},
					y: {
						display: true,
						title: {
							display: true,
							text: chart.y_label,
						},
					},
				},
			},
		})
	}
}

onMounted(loadChart)
</script>

<style scoped lang="scss">
.chart {
	padding: 2em;
	background-color: #fff;
	border-radius: 5px;

	&__feedback {
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
	}
}

@media (min-width: 1024px) {
}
</style>
