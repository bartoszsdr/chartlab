import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChartsView from '../views/ChartsView.vue'
import ChartView from '../views/ChartView.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/charts',
			name: 'charts',
			component: ChartsView,
		},
		{
			path: '/charts/:id',
			name: 'chart',
			component: ChartView,
		},
	],
})

export default router
