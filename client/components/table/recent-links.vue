<template>
	<v-row
		justify="center"
		class="mx-0"
		align="center"
		v-show="recent_links != ''"
	>
		<v-col cols="10">
			<table class="table">
				<thead>
					<tr>
						<th>Orignal URL</th>
						<th>Created</th>
						<th>Short URL</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(link, index) in recent_links" :key="index">
						<td data-label="Original">
							<p>{{ link.longurl }}</p>
						</td>

						<td data-label="Created">
							<p>{{ link.created }}</p>
						</td>
						<td data-label="Shortened">
							<p>
								<v-btn icon color="green">
									<svg
										viewBox="0 0 24 24"
										width="22"
										height="22"
										stroke="currentColor"
										stroke-width="2"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
										<path
											d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
										/>
									</svg>
								</v-btn>
								{{ link.shorturl }}
							</p>
						</td>
					</tr>
				</tbody>
			</table>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	data() {
		return {
			recent_links: this.$store.getters['all-links/GET_ALL_LINKS'],
		}
	},

	async mounted() {
		await this.$store.dispatch('all-links/fetchAllLinks', 3)
	},
})
</script>

<style scoped>
table {
	border-radius: 12px;
	background-color: #121212;
	font-weight: 600;
	font-size: 15px;
	padding-bottom: 16px;
	color: #c9c9c9;
	width: 100%;
	border: 2px solid #555555;
}
thead th {
	color: #a0a0a0;
	font-weight: 500;
	text-align: center;
	font-size: 18px;
	padding: 16px 0px;
	min-width: 150px;
}
tr td {
	height: 40px;
	text-align: center;
	font-size: 14px;
}

.v-application p {
	margin-bottom: 0px !important;
}

tbody div p {
	max-width: 300px;
	min-width: 20px;
	white-space: nowrap;
	padding: 12px 0px;
	overflow: hidden;
	font-weight: 500;
	text-overflow: ellipsis;
	margin: 0 auto;
}
@media screen and (max-width: 800px) {
	table thead {
		display: none;
	}
	table tr {
		margin-bottom: 0.8rem;
		margin-top: -0.4rem;
		display: block;
		padding-bottom: 0.8rem;
		border-bottom: 1px solid rgb(54, 54, 54);
	}
	table tr:last-child {
		border-bottom: none;
		margin-bottom: -0.8rem;
	}
	tbody div {
		width: 20ch;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		float: right;
	}
	table tbody td:before {
		content: attr(data-label);
		float: left;
		font-size: 14px;
		color: #a0a0a0;
		font-weight: 500;
	}
	table tbody tr td {
		display: block;
		text-align: right;
		font-size: 14px;
		border: none;
	}
}
</style>