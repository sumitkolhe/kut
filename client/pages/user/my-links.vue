<template>
	<v-row justify="center" class="mt-6">
		<v-col cols="10">
			<v-row justify="space-around">
				<v-col
					cols="12"
					md="4"
					v-for="card in info_card"
					:key="card.card_title"
				>
					<v-card flat rounded="lg" :height="card_height" class="pa-4">
						<v-list-item three-line>
							<v-list-item-content>
								<v-list-item-title class="body-1 font-weight-medium mt-1 pb-2">
									{{ card.title }}
								</v-list-item-title>
								<v-list-item-subtitle class="text-h4 font-weight-medium">
									987
								</v-list-item-subtitle>
							</v-list-item-content>

							<v-list-item-avatar rounded color="primary" size="56">
								<v-icon x-large>{{ card.icon }}</v-icon>
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
export default Vue.extend({
	data() {
		return {
			card_height: '150px',
			info_card: [
				{
					title: 'Total Shortened Links',
					value: '',
					icon: 'mdi-link',
				},
				{
					title: 'Total Notes Created',
					value: '',
					icon: 'mdi-book-edit',
				},
				{
					title: 'Total Link Impressions',
					value: '',
					icon: 'mdi-cursor-default-click',
				},
			],
		}
	},

	methods: {},
})
</script>

<style  scoped>
.holo {
	width: 46px;
	height: 46px;
	border-radius: 12px;
	background-color: red;
}
</style>
