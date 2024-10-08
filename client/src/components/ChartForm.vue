<template>
	<form @submit.prevent="submitForm" class="form">
		<div class="form__header">
			<h2 class="form__title">Formularz</h2>
		</div>
		<div class="form__body">
			<div class="form__upper">
				<div class="form__input">
					<label for="title">Tytuł wykresu: <span class="form__req">*</span> </label>
					<input id="title" v-model="titleInput" type="text" placeholder="np. Dzienny opad deszczu" required />
				</div>
				<div class="form__input">
					<label for="pet-select">Rodzaj wykresu: <span class="form__req">*</span></label>
					<select name="pets" id="pet-select" v-model="styleSelect" @change="handleStyleSelect">
						<option value="auto">automatycznie</option>
						<option value="bar">słupkowy</option>
						<option value="line">liniowy</option>
						<option value="pie">kołowy</option>
						<option value="scatter">punktowy</option>
						<!-- <option value="radar">radarowy</option> -->
					</select>
				</div>
				<div class="form__input">
					<label for="xLabel">Nazwa osi X:</label>
					<input id="xLabel" v-model="xLabelInput" type="text" placeholder="np. h" />
				</div>
				<div class="form__input">
					<label for="yLabel">Nazwa osi Y:</label>
					<input id="yLabel" v-model="yLabelInput" type="text" placeholder="np. mm" />
				</div>
			</div>
			<!-- <hr class="form__divider" /> -->
			<div v-for="(datasetInput, index) in datasetsInput" :key="index" class="form__lower">
				<div class="form__dataset">
					<h3 class="form__dataset-name">Zestaw {{ index + 1 }}</h3>
					<button type="button" @click="removeDataset(index)" class="form__dataset-btn">Usuń</button>
				</div>
				<div class="form__input">
					<label :for="'name' + index">Nazwa zestawu danych: <span class="form__req">*</span></label>
					<input
						:id="'name' + index"
						v-model="datasetInput.nameInput"
						type="text"
						placeholder="np. Opad (mm/h)"
						required />
				</div>
				<div class="form__input">
					<label :for="'xValues' + index">Kategorie (oś X): <span class="form__req">*</span></label>
					<input
						:id="'xValues' + index"
						v-model="datasetInput.xValuesInput"
						type="text"
						placeholder="np. 6:00, 14:00, 22:00"
						required />
				</div>
				<div class="form__input">
					<label :for="'yValues' + index">Wartości (oś Y): <span class="form__req">*</span></label>
					<input
						:id="'yValues' + index"
						v-model="datasetInput.yValuesInput"
						type="text"
						placeholder="np. 0, 3, 2"
						required />
				</div>
			</div>

			<div class="form__controls">
				<button type="button" @click="addDataset">Dodaj zestaw danych</button>
				<button
					type="submit"
					:class="{
						'form__btn--selected': isAutoSelected,
					}"
					class="form__btn">
					{{ isAutoSelected ? 'Dobrano automatycznie' : 'Generuj wykres' }}
				</button>
			</div>
		</div>
	</form>
</template>

<script setup>
import { ref, defineEmits, onMounted } from 'vue'

const titleInput = ref('')
const styleSelect = ref('auto')
const isAutoSelected = ref(false)
const xLabelInput = ref('')
const yLabelInput = ref('')
const datasetsInput = ref([])

const emit = defineEmits(['updateChart'])

const addDataset = () => {
	datasetsInput.value.push({ nameInput: '', xValuesInput: '', yValuesInput: '' })
}

const removeDataset = index => {
	datasetsInput.value.splice(index, 1)
}

const autoSelectChartStyle = () => {
	const firstDataset = datasetsInput.value[0]
	const labels = firstDataset.xValuesInput.split(',').map(label => label.trim())
	const labelsAreStrings = firstDataset.xValuesInput.split(',').map(Number).some(Number.isNaN)
	const data = firstDataset.yValuesInput.split(',').map(Number)

	if (datasetsInput.value.length === 1) {
		// ONE DATASET LOGIC
		if (labels.length === 1 && data.length <= 5 && data.every(value => value >= 0)) {
			// Choose pie chart if there is only one X value, less or equal than 5 Y values and all Y values are > 0.
			styleSelect.value = 'pie'
		} else if (labels.length === data.length && labels.length <= 12 && labelsAreStrings) {
			// Choose bar chart if there is the same amount of X and Y values, less or equal than 12 X values and X values are not numbers.
			styleSelect.value = 'bar'
		} else if (labels.length === data.length && labels.length > 12 && labelsAreStrings) {
			// Choose line chart if there is the same amount of X and Y values, more than 12 X values and X values are not numbers.
			styleSelect.value = 'line'
		} else if (!labelsAreStrings) {
			// Choose scatter chart if X values are numbers.
			styleSelect.value = 'scatter'
		} else {
			// Choose bar chart in any other scenario.
			styleSelect.value = 'bar'
		}
	} else {
		// MORE DATASETS LOGIC
		if (labels.length === data.length && labels.length <= 12 && labelsAreStrings) {
			styleSelect.value = 'bar'
		} else if (labels.length === data.length && labels.length > 12 && labelsAreStrings) {
			styleSelect.value = 'line'
		} else if (!labelsAreStrings) {
			styleSelect.value = 'scatter'
		} else {
			styleSelect.value = 'bar'
		}
	}

	console.log(`Wybrano typ wykresu: ${styleSelect.value}`)

	isAutoSelected.value = true
	setTimeout(() => {
		isAutoSelected.value = false
	}, 3000)

	submitForm()
}

const submitForm = () => {
	if (styleSelect.value === 'auto') {
		autoSelectChartStyle()
	}

	const title = titleInput.value
	const style = styleSelect.value
	const xLabel = xLabelInput.value
	const yLabel = yLabelInput.value
	const datasets = datasetsInput.value.map(input => {
		const names = input.nameInput
		const labels = input.xValuesInput.split(',').map(label => label.trim())
		const data = input.yValuesInput.split(',').map(Number)
		return { names, labels, data }
	})
	emit('updateChart', { title, style, xLabel, yLabel, datasets })
}

onMounted(() => addDataset())
</script>

<style scoped lang="scss">
.form {
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
	&__upper {
		display: grid;
		grid-template-rows: repeat(2, 1fr);
		grid-column-gap: 20px;
		grid-row-gap: 20px;
		margin-bottom: 2em;
	}
	&__input {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-right: 0.5em;
		input,
		select {
			padding: 0.75em;
			border: none;
			border-radius: 5px;
			background-color: #f0f0f0;
		}
		label {
			margin-bottom: 0.2em;
		}
	}
	&__divider {
		border-top: 3px solid #bbb;
		border-radius: 5px;
		margin: 2em 0;
		width: 100%;
	}
	&__req {
		color: red;
	}
	&__lower {
		display: grid;
		grid-column-gap: 20px;
		grid-row-gap: 20px;
		margin-bottom: 2em;
		border: 1px solid #3498db;
		border-radius: 5px;
		padding: 1em;
	}
	&__dataset {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0.5em;
		border-radius: 5px;
	}
	&__controls {
		display: flex;
		justify-content: space-between;
		gap: 10px;
	}
	&__btn {
		&--selected {
			background-color: green;
			color: white;
		}
	}
}

@media (min-width: 768px) {
	.form {
		&__upper {
			grid-template-columns: repeat(2, 1fr);
		}
		&__lower {
			grid-template-rows: repeat(2, 1fr);
			grid-template-columns: repeat(2, 1fr);
		}
		&__dataset {
			padding: 0;
		}
		&__controls {
			gap: 0;
		}
	}
}
</style>
