<template>
	<v-row justify="center" class="mt-6">
		<v-col cols="12" sm="10" lg="10">
			<v-row justify="space-around">
				<v-col
					cols="12"
					md="4"
					v-for="card in info_card"
					:key="card.card_title"
				>
					<v-card flat rounded="xl" :height="card_height" class="pa-4">
						<v-list-item three-line>
							<v-list-item-content>
								<v-list-item-subtitle
									class="text-h6 font-weight-regular mt-1 pb-2"
								>
									{{ card.title }}
								</v-list-item-subtitle>
								<v-list-item-title class="pl-1 text-h4 font-weight-medium">
									{{ card.value }}
								</v-list-item-title>
							</v-list-item-content>

							<v-list-item-avatar rounded :color="card.icon_bg_color" size="56">
								<v-icon x-large :color="card.icon_color">
									{{ card.icon }}
								</v-icon>
							</v-list-item-avatar>
						</v-list-item>
					</v-card>
				</v-col>
			</v-row>

			<v-row justify="center" class="mt-12">
				<v-col align="center" cols="12">
					<all-links-table />
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	data() {
		return {
			card_height: '150px',

			info_card: [
				{
					title: 'Total Shortened Links',
					value: '',
					icon: 'mdi-link',
					icon_bg_color: '#e1fdff',
					icon_color: '#00cc88',
				},
				{
					title: 'Total Notes Created',
					value: '',
					icon: 'mdi-book-edit',
					icon_bg_color: '#f3f9ff',
					icon_color: '#0062ff',
				},
				{
					title: 'Total Link Impressions',
					value: '',
					icon: 'mdi-cursor-default-click',
					icon_bg_color: '#ffeeee',
					icon_color: '#ff3d3d',
				},
			],
		}
	},

	async mounted() {
		await this.$axios
			.get('/stats')
			.then((response: any) => {
				this.info_card.forEach((item: any, index) => {
					item.value = Object.values(response.data)[index]
				})
			})
			.catch((err: any) => {
				;(this as any).$notify.error(err)
			})
	},

	methods: {},
})
</script>

<style  scoped>
</style>
