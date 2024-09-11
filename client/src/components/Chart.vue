<template>
	<div class="chart">
		<div class="chart__header">
			<h2 class="chart__title">Podgląd</h2>
		</div>
		<div class="chart__body">
			<canvas ref="chartCanvas" class="chart__canvas"></canvas>
			<button
				v-if="myChart"
				@click="submitChart"
				type="button"
				:class="{
					'chart__btn--saved': isSaved,
					'chart__btn--error': isError,
				}"
				class="chart__btn">
				{{ isSaved ? 'Zapisano pomyślnie' : isError ? 'Wystąpił błąd' : 'Zapisz wykres' }}
			</button>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Chart from 'chart.js/auto'
import { saveChart } from '../services/Api.js'

const chartCanvas = ref(null)
const isSaved = ref(false)
const isError = ref(false)
let myChart

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	style: {
		type: String,
		required: true,
	},
	xLabel: {
		type: String,
		required: false,
	},
	yLabel: {
		type: String,
		required: false,
	},
	data: {
		type: Array,
		required: false,
	},
})

const createChart = () => {
	if (chartCanvas.value) {
		if (myChart) {
			myChart.destroy()
		}
		myChart = new Chart(chartCanvas.value, {
			type: props.style,
			data: {
				labels: props.data.length > 0 ? props.data[0].labels : [],
				datasets: props.data.map(dataset => ({
					label: dataset.names,
					data: dataset.data,
				})),
			},
			options: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: props.title,
					},
				},
				scales: {
					x: {
						display: true,
						title: {
							display: true,
							text: xLabel.value,
						},
					},
					y: {
						display: true,
						title: {
							display: true,
							text: yLabel.value,
						},
					},
				},
			},
		})
	}
}

const submitChart = async () => {
	console.log(props.data[0])
	const jsonString = JSON.stringify(props.data)
	console.log(jsonString)
	try {
		const newChart = await saveChart(props.title, props.style, props.xLabel, props.yLabel, props.data)
		isSaved.value = true
		isError.value = false
		setTimeout(() => {
			isSaved.value = false
		}, 3000)
	} catch (error) {
		isSaved.value = false
		isError.value = true
		setTimeout(() => {
			isError.value = false
		}, 3000)
		console.error('Błąd przy dodawaniu wykresu:', error)
	}
}

watch(() => [props.data, props.title], createChart)
</script>

<style scoped lang="scss">
.chart {
	background-color: #fff;
	border-radius: 5px;
	&__header {
		padding: 0.5em 1.5em;
		border-radius: 5px 5px 0 0;
		color: #fff;
		background-color: #3498db;
	}
	&__body {
		display: flex;
		flex-direction: column;
		padding: 1.5em;
		border-radius: 5px;
	}
	&__canvas {
		color: white;
	}

	&__btn {
		align-self: flex-end;
		margin-top: 2em;
		&--saved {
			background-color: green;
			color: white;
		}
		&--error {
			background-color: red;
			color: white;
		}
	}
}
</style>
