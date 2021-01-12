<template>
	<v-data-table
		:headers="headers"
		:items="all_links"
		single-expand
		:expanded.sync="expanded"
		item-key="name"
		show-expand
	>
		<template v-slot:[`item.data-table-expand`]="{ expand, isExpanded }">
			<v-icon @click="expand(!isExpanded)">mdi-pencil</v-icon>
		</template>
		<template v-slot:expanded-item="{ headers }">
			<td :colspan="headers.length">
				<v-row justify="space-around" class="pa-8">
					<v-col cols="12" md="6">
						<input-field
							:placeholder="'Custom Alias'"
							:type="'text'"
							v-model="payload.alias"
						/>
					</v-col>

					<v-col cols="12" md="6">
						<input-field
							:placeholder="'Password'"
							:type="'password'"
							v-model="payload.password"
						/>
					</v-col>
					<v-col cols="12">
						<input-field
							:placeholder="'Description'"
							:type="'text'"
							v-model="payload.description"
						/>
					</v-col>
				</v-row>
			</td>
		</template>
	</v-data-table>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	data() {
		return {
			payload: {
				long_url: '',
				alias: '',
				password: '',
				description: '',
			},
			expanded: [],

			headers: [
				{
					text: 'Original Link',
					align: 'left',
					sortable: false,
					value: 'long_url',
				},
				{ text: 'Short Link', value: 'short_url' },
				{ text: 'Created', value: 'created' },
				{ text: 'Description', value: 'description' },
				{ text: 'Password', value: 'password' },
				{ text: '', value: 'data-table-expand' },
			],
			all_links: [],
		}
	},

	async mounted() {
		await this.$store.dispatch('all-links/fetchAllLinks').catch((err: any) => {
			;(this as any).$notify.error(err)
		})

		this.all_links = this.$store.getters['all-links/GET_ALL_LINKS']
	},
})
</script>

<style  scoped>
.v-data-table {
	border-radius: 12px !important;
}
</style>