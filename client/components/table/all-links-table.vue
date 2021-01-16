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
				<v-btn class="mr-1" icon @click="expand(!isExpanded)">
					<v-icon>mdi-pencil</v-icon>
				</v-btn>
				<v-btn class="mr-1" icon>
					<qr-code :target="item.short_url" />
				</v-btn>
				<v-btn icon>
					<delete-link @callback="fetchLinks" :target="item._id" />
				</v-btn>

				<v-tooltip bottom>
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							class="mr-1"
							icon
							color="green"
							v-show="item.password_protected"
						>
							<v-icon v-bind="attrs" v-on="on">mdi-security</v-icon>
						</v-btn>
					</template>
					<span>Password Protected</span>
				</v-tooltip>
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
			singleExpand: false,
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
				{ text: 'Actions', value: 'data-table-expand', width: '16%' },
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

		setSelectedLink(item: any) {
			this.$store.commit('all-links/SET_UPDATE_LINK', item)
		},
	},
})
</script>

<style >
.v-data-table {
	border-radius: 12px !important;
	padding: 4px;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
	font-weight: 500 !important;
	font-size: 14px !important;
}
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
	font-weight: 700 !important;
	font-size: 15px !important;
}
</style>