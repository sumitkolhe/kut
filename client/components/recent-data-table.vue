<template>
	<v-row justify="center" dense class="mx-1" align="center">
		<table class="table">
			<thead>
				<tr>
					<th>Orignal</th>
					<th>Shortened</th>
					<th>Created</th>
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
						<p>{{ link.shorturl }}</p>
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

<style>
table {
	border-radius: 12px;
	background-color: var(--dark_color1);
	padding: 1rem;
	font-weight: bolder;
	font-size: 15px;
	color: #b3b3b3;
	width: 100%;
	border: 2px solid #424242;
}
table thead tr th {
	color: #a0a0a0;
	font-weight: 500;
	text-align: center;
	font-size: 18px;
	min-width: 150px;
	padding: 0.2rem 0.5rem 0.5rem 0.2rem;
}
table tbody tr td {
	height: 40px;
	text-align: center;
	font-size: 14px;
	padding: 0.5rem 0.5rem;
}
tbody div {
	margin: auto;
}
tbody div p {
	max-width: 300px;
	min-width: 20px;
	white-space: nowrap;
	overflow: hidden;
	font-weight: 500;
	text-overflow: ellipsis;
	margin: auto;
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