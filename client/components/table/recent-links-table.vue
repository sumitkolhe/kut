<template>
	<v-row
		justify="center"
		class="mx-0 mb-8"
		align="center"
		v-show="recent_links != ''"
	>
		<h3 class="mb-8 mt-4 font-weight-medium">Recently shortened links</h3>
		<table class="table">
			<thead>
				<tr>
					<th>Orignal URL</th>
					<th>Created</th>
					<th>Short URL</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(link, index) in recent_links" :key="index">
					<td data-label="Original">
						<p>{{ link.long_url }}</p>
					</td>

					<td data-label="Created">
						<p>{{ link.created_at }}</p>
					</td>
					<td data-label="Shortened">
						{{ link.short_url }}
					</td>
					<td data-label="Shortened">
						<v-row justify="center">
							<copy-content :target="link.short_url" />
							<qr-code :target="link.short_url" />
						</v-row>
					</td>
				</tr>
			</tbody>
		</table>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	props: {
		recent_links: {
			type: Array,
		},
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
		padding: 16px;
	}
}
</style>