<template>
	<v-row justify="center" align="center">
		<v-col cols="10">
			<p class="title-text">
				Shorten Your links Quickly
				<svg
					data-v-55d53dfe=""
					viewBox="0 0 24 24"
					width="24"
					height="24"
					stroke="currentColor"
					stroke-width="2"
					fill="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					style="vertical-align: middle"
				>
					<polygon
						data-v-55d53dfe=""
						points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
					></polygon>
				</svg>
			</p>
			<v-sheet class="pa-6" rounded="xl">
				<v-row>
					<v-col cols="12">
						<v-text-field
							label="Enter long Url"
							v-model="payload.longurl"
							single-line
							outlined
						>
							<v-icon slot="append" @click="shorten()">mdi-send</v-icon>
						</v-text-field>
					</v-col>
				</v-row>
				<v-row justify="center" class="mb-1">
					<v-btn text @click="showAdvanced = !showAdvanced">
						<v-icon>
							{{ showAdvanced ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
						</v-icon>
						Advance Options
					</v-btn>
				</v-row>
			</v-sheet>

			<v-fade-transition>
				<v-sheet v-show="showAdvanced" class="mt-2 pa-6" rounded="xl">
					<v-row justify="space-around">
						<v-col cols="6">
							<p class="mb-2 font-weight-medium mt-n1">Alias</p>
							<v-text-field
								placeholder="Alias"
								class="d-flex"
								outlined
								single-line
								v-model="payload.alias"
							></v-text-field>
						</v-col>

						<v-col cols="6">
							<p class="mb-2 font-weight-medium mt-n1">Password</p>
							<v-text-field
								placeholder="Password"
								outlined
								single-line
								v-model="payload.password"
							></v-text-field>
						</v-col>
					</v-row>

					<p class="mb-2 font-weight-medium mt-n1">Description</p>
					<v-text-field
						placeholder="Description"
						outlined
						single-line
						v-model="payload.description"
					></v-text-field>
				</v-sheet>
			</v-fade-transition>

			<v-fade-transition>
				<v-row justify="center" class="mt-12">
					<v-data-table
						class="d-flex"
						dark
						hide-default-footer
						:headers="table.headers"
						:items="table.data"
					></v-data-table>
				</v-row>
			</v-fade-transition>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	data() {
		return {
			showAdvanced: false,
			payload: {
				longurl: '',
				alias: '',
				password: '',
				description: '',
			},

			table: {
				headers: [
					{ text: 'Original Link', value: 'longurl', align: 'start' },
					{ text: 'Created on', value: 'created' },
					{ text: 'Short Link', value: 'shorturl' },
				],
				data: [
					{
						longurl: 'google.com',
						created: '2020',
						shorturl: 'red.com',
					},
					{
						longurl: 'google.com',
						created: '2020',
						shorturl: 'red.com',
					},
					{
						longurl: 'google.com',
						created: '2020',
						shorturl: 'red.com',
					},
				],
			},
		}
	},
	methods: {
		shorten() {
			this.$axios
				.post(
					'/shorten/',
					this.showAdvanced ? this.payload : { longurl: this.payload.longurl }
				)
				.then((res) => {
					;(this as any).$notify.success('Link shortened sucessfully')
					console.log(res.data)
				})
				.catch((err) => {
					;(this as any).$notify.error(err.response.data.message)
				})
		},
	},
})
</script>

<style scoped>
.title-text {
	font-weight: 500;
	text-align: center;
	font-size: 22px;
	letter-spacing: 1px;
}

.v-text-field--outlined >>> fieldset {
	border-color: var(--light_color4);
	border-width: 2px;
	border-radius: 12px;
}
</style>