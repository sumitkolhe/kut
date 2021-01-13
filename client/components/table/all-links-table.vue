<template>
	<v-data-table
		:headers="headers"
		:items="all_links"
		item-class="custom"
		:single-expand="singleExpand"
		:expanded.sync="expanded"
		item-key="short_url"
		show-expand
	>
		<template v-slot:[`item.data-table-expand`]="{ expand, isExpanded, item }">
			<v-row>
				<v-btn icon @click="expand(!isExpanded)">
					<v-icon color="#f3722c">mdi-pencil</v-icon>
				</v-btn>
				<v-btn icon>
					<qr-code :target="item.short_url" />
				</v-btn>
				<v-btn icon>
					<delete-link :target="item._id" />
				</v-btn>
			</v-row>
		</template>

		<template v-slot:expanded-item="{ headers, item }">
			<td :colspan="headers.length">
				<v-row justify="space-around" class="pt-8">
					<v-col cols="12" md="4">
						<p>Original Link</p>
						<v-text-field
							:label="item.long_url"
							:placeholdder="item.long_url"
							v-model="item.long_url"
							single-line
							outlined
						></v-text-field>
					</v-col>
					<v-col cols="12" md="4">
						<p>Custom Alias</p>
						<v-text-field
							:label="item.alias"
							:placeholder="item.alias"
							v-model="payload.alias"
							single-line
							outlined
						></v-text-field>
					</v-col>
					<v-col cols="12" md="4">
						<p>Description</p>
						<v-text-field
							:label="item.description"
							:placeholder="item.description"
							v-model="payload.description"
							single-line
							outlined
						></v-text-field>
					</v-col>
				</v-row>
				<v-row justify="center" class="pb-8">
					<v-btn
						@click="updateLink(item)"
						depressed
						color="primary"
						:loading="loading"
					>
						Update link
					</v-btn>
				</v-row>
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

	computed: {},

	async mounted() {
		await this.$store.dispatch('all-links/fetchAllLinks').catch((err: any) => {
			;(this as any).$notify.error(err)
		})
		this.all_links = this.$store.getters['all-links/GET_ALL_LINKS']
	},

	methods: {
		async updateLink(item: any) {
			console.log(item)

			//this.$axios.patch("/links",item).then((res: any)=>{console.log(response)})
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