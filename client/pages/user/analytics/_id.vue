<template>
	<v-row justify="center" class="mt-6">
		<v-col cols="12" sm="12" lg="11" xl="10">
			<v-row justify="space-around">
				<v-col
					cols="12"
					md="3"
					v-for="card in info_card"
					:key="card.card_title"
				>
					<v-card flat rounded="lg" :height="card_height" class="pa-2">
						<v-list-item three-line>
							<v-list-item-content>
								<v-list-item-subtitle
									class="text-h6 font-weight-regular mt-1 pb-2"
								>
									{{ card.title }}
								</v-list-item-subtitle>
								<v-list-item-title class="pl-1 text-h6 font-weight-medium">
									{{ card.value }}
								</v-list-item-title>
							</v-list-item-content>

							<v-list-item-avatar rounded :color="card.icon_bg_color" size="46">
								<v-icon large :color="card.icon_color">
									{{ card.icon }}
								</v-icon>
							</v-list-item-avatar>
						</v-list-item>
					</v-card>
				</v-col>
			</v-row>

			<v-sheet class="py-8 mt-12" rounded="xl">
				<v-row justify="center" class="my-6">
					<v-col cols="12" md="10">
						<line-chart legend="bottom" :data="chart_data.views"></line-chart>
					</v-col>
				</v-row>
				<v-row justify="space-between">
					<v-col cols="12" md="5">
						<pie-chart legend="bottom" :data="chart_data.os"></pie-chart>
					</v-col>
					<v-col cols="12" md="5">
						<pie-chart legend="bottom" :data="chart_data.browser"></pie-chart>
					</v-col>
				</v-row>
			</v-sheet>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	data() {
		return {
			chart_data: {},
			card_height: '150px',

			info_card: [
				{
					title: 'Total Visits',
					value: '',
					icon: 'mdi-link',
					icon_bg_color: '#e1fdff',
					icon_color: '#00cc88',
				},
				{
					title: 'Link Description',
					value: '',
					icon: 'mdi-card-text',
					icon_bg_color: '#f3f9ff',
					icon_color: '#0062ff',
				},
				{
					title: 'Created On',
					value: '',
					icon: 'mdi-calendar-text',
					icon_bg_color: '#ffeeee',
					icon_color: '#ff3d3d',
				},
				{
					title: 'Short Link',
					value: '',
					icon: 'mdi-link',
					icon_bg_color: '#ffeeee',
					icon_color: '#ff3d3d',
				},
			],
		}
	},

	async created() {
		await this.$store.dispatch('analytics/fetchAnalytics', {
			_id: this.$nuxt.$route.params.id,
		})

		let data = this.$store.getters['analytics/GET_ANALYTICS']
		this.chart_data = data.analytics
		this.info_card[0].value = data.visit_count
		this.info_card[1].value = data.description || 'No description provided'
		this.info_card[2].value = data.created_at
		this.info_card[3].value = data.short_url
	},
})
</script>

<style>
</style>