<script setup>
import { ref } from 'vue'

import Chart from '../components/Chart.vue'
import ChartForm from '../components/ChartForm.vue'

const chart = ref({
	title: '',
	style: '',
	xLabel: '',
	yLabel: '',
	data: [],
})

const updateChartData = ({ title, style, xLabel, yLabel, datasets }) => {
	chart.value.title = title
	chart.value.style = style
	chart.value.xLabel = xLabel
	chart.value.yLabel = yLabel
	chart.value.data = datasets
}
</script>

<template>
	<main class="wrapper">
		<div class="container">
			<div class="form-card">
				<ChartForm @updateChart="updateChartData" />
			</div>
			<div class="chart-card">
				<Chart
					:title="chart.title"
					:style="chart.style"
					:xLabel="chart.xLabel"
					:yLabel="chart.yLabel"
					:data="chart.data" />
			</div>
		</div>
	</main>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.form-card {
	flex: 1;
}

.chart-card {
	flex: 1;
}

@media (min-width: 768px) {
	.container {
		flex-direction: row;
	}
}
</style>
