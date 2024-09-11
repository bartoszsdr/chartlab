const BASE_URL = 'http://localhost:8081'

export const fetchChartById = async id => {
	try {
		const response = await fetch(`${BASE_URL}/charts/${id}`)
		if (response.ok) {
			return await response.json()
		} else {
			throw new Error('Błąd przy pobieraniu wykresu. Proszę spróbować później.')
		}
	} catch (error) {
		console.error('Wystąpił błąd sieciowy:', error)
		throw error
	}
}

export const fetchCharts = async () => {
	try {
		const response = await fetch(`${BASE_URL}/charts`)
		if (response.ok) {
			return await response.json()
		} else {
			throw new Error('Błąd przy pobieraniu wykresów. Proszę spróbować później.')
		}
	} catch (error) {
		console.error('Wystąpił błąd sieciowy:', error)
		throw error
	}
}

export const saveChart = async (title, style, xLabel, yLabel, data) => {
	try {
		const response = await fetch(`${BASE_URL}/charts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title, style, xLabel, yLabel, data }),
		})

		if (response.ok) {
			return await response.json()
		} else {
			throw new Error('Błąd przy zapisywaniu wykresu. Proszę spróbować później.')
		}
	} catch (error) {
		console.error('Wystąpił błąd sieciowy:', error)
		throw error
	}
}

export const deleteChart = async id => {
	try {
		const response = await fetch(`${BASE_URL}/charts/${id}`, {
			method: 'DELETE',
		})

		if (!response.ok) {
			throw new Error('Błąd przy usuwaniu wykresu. Proszę spróbować później.')
		}
	} catch (error) {
		console.error('Wystąpił błąd sieciowy:', error)
		throw error
	}
}
