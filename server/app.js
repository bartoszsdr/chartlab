import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

import { getChart, getCharts, saveChart, deleteChart } from './db.js'

app.get('/charts/:id', async (req, res) => {
	const id = req.params.id
	const chart = await getChart(id)
	res.send(chart)
})

app.get('/charts', async (req, res) => {
	const charts = await getCharts()
	res.send(charts)
})

app.post('/charts', async (req, res) => {
	const { title, style, xLabel, yLabel, data } = req.body
	const chart = await saveChart(title, style, xLabel, yLabel, data)
	res.status(201).send(chart)
})

app.delete('/charts/:id', async (req, res) => {
	const id = req.params.id
	try {
		await deleteChart(id)
		res.status(204).send()
	} catch (error) {
		res.status(500).json({ message: 'Wystąpił błąd serwera.' })
	}
})

app.use((err, req, res, next) => {
	console.log(err.stack)
	res.status(500).send('Wystąpił błąd serwera.')
})

app.listen(8081, () => {
	console.log('Serwer działa na porcie 8081.')
})
