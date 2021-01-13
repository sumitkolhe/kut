<template>
	<v-data-table
		:headers="headers"
		:items="all_links"
		:single-expand="singleExpand"
		:expanded.sync="expanded"
		item-key="short_url"
		show-expand
	>
		<template v-slot:[`item.data-table-expand`]="{ expand, isExpanded, item }">
			<v-row>
				<v-btn icon @click="expand(!isExpanded)">
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
				<v-btn icon>
					<qr-code :target="item.short_url" />
				</v-btn>
				<v-btn icon>
					<delete-link @callback="fetchLinks" :target="item._id" />
				</v-btn>
			</v-row>
		</template>

		<template v-slot:expanded-item="{ headers, item }">
			<td :colspan="headers.length">
				<update-link @callback="fetchLinks" :target="item" />
			</td>
		</template>
	</v-data-table>
</template>
	</v-data-table>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	data() {
		return {
			loading: false,
			expanded: [],
			singleExpand: true,
			payload: {
				long_url: '',
				alias: '',
				description: '',
			},

			headers: [
				{ text: 'Original Link', value: 'long_url' },
				{ text: 'Short Link', value: 'short_url' },
				{ text: 'Created', value: 'created' },
				{ text: 'Total Views', value: 'visit_count' },
				{ text: 'Description', value: 'description' },
				{ text: 'Actions', value: 'data-table-expand', width: '10%' },
			],
			all_links: [],
		}
	},

	async mounted() {
		await this.fetchLinks()
	},

	methods: {
		async fetchLinks() {
			await this.$store
				.dispatch('all-links/fetchAllLinks')
				.catch((err: any) => {
					;(this as any).$notify.error(err)
				})
			this.all_links = this.$store.getters['all-links/GET_ALL_LINKS']
		},
	},
})
</script>

<style  scoped>
.v-data-table {
	border-radius: 12px !important;
}

.custom {
	font-size: 40px;
}
</style>