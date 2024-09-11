import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql
	.createPool({
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE,
	})
	.promise()

export async function getChart(id) {
	const [rows] = await pool.query(
		`
		SELECT * 
		FROM charts
		WHERE id = ?
		`,
		[id]
	)
	return rows[0]
}

export async function getCharts() {
	const [rows] = await pool.query('SELECT * FROM charts')
	return rows
}

export async function saveChart(title, style, xLabel, yLabel, data) {
	const jsonStringData = JSON.stringify(data)

	const [result] = await pool.query(
		`
    INSERT INTO charts (title, style, x_label, y_label, allValues)
    VALUES (?, ?, ?, ?, ?)
    `,
		[title, style, xLabel, yLabel, jsonStringData]
	)
	return result
}

export async function deleteChart(id) {
	await pool.query('DELETE FROM charts WHERE id = ?', [id])
}
