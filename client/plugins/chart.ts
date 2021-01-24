import Vue from 'vue'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Chartkick.options = {
	colors: ['#4ecdc4', '#ff6b6b', '#7bdff2', '#7678ed', '#f68e5f', '#ff5d73'],
}

Vue.use(Chartkick.use(Chart))
