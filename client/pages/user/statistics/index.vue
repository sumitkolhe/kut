<template>
	<v-row justify="center" class="mt-6">
		<v-col cols="12" sm="12" lg="11" xl="10">
			<v-row justify="space-around">
				<v-col
					cols="12"
					md="4"
					v-for="card in info_card"
					:key="card.card_title"
				>
					<v-card
						rounded="xl"
						flat
						:min-height="card_height"
						max-height="auto"
						class="py-2 px-1"
					>
						<v-list-item three-line>
							<v-list-item-content>
								<v-list-item-subtitle
									class="text-h6 font-weight-regular mt-1 pb-2"
								>
									{{ card.title }}
								</v-list-item-subtitle>
								<v-list-item-title
									class="pl-1 text-h5 font-weight-medium text-wrap"
								>
									{{ card.value }}
								</v-list-item-title>
							</v-list-item-content>

							<v-list-item-avatar rounded :color="card.icon_bg_color" size="64">
								<v-icon x-large :color="card.icon_color">
									{{ card.icon }}
								</v-icon>
							</v-list-item-avatar>
						</v-list-item>
					</v-card>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import { convertDate } from '../../../utils/convert-date'
export default Vue.extend({
	data() {
		return {
			card_height: '150px',

			info_card: [
				{
					title: 'Total Notes Created',
					value: '',
					icon: 'mdi-book-edit',
					icon_bg_color: 'rgba(0,0,0,.04)',
					icon_color: '#0062ff',
				},
				{
					title: 'Total Shortened Links',
					value: '',
					icon: 'mdi-link',
					icon_bg_color: 'rgba(0,0,0,.04)',
					icon_color: '#00cc88',
				},
				{
					title: 'Account Created',
					value: '',
					icon: 'mdi-account-plus',
					icon_bg_color: 'rgba(0,0,0,.04)',
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
					if (Object.keys(response.data)[index] == 'account_created') {
						item.value = convertDate(
							Object.values(response.data)[index] as any
						).split('-')[0]
					} else {
						item.value = Object.values(response.data)[index]
					}
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
.v-card.v-sheet.theme--light {
	border: 2px solid rgba(0, 0, 0, 0.12) !important;
}
.v-card.v-sheet.theme--dark {
	border: 2px solid rgba(255, 255, 255, 0.12) !important;
}
</style>
