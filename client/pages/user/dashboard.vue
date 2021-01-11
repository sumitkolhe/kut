<template>
	<v-row justify="center" align="center">
		<v-col cols="10">
			<p class="title-text" dark>
				Shorten Your links Quickly
				<svg
					data-v-55d53dfe=""
					viewBox="0 0 24 24"
					width="26"
					height="26"
					stroke="#000"
					stroke-width="1"
					fill="#000"
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
							<v-icon slot="append" @click="shorten()" @keyup.enter="shorten()">
								mdi-send
							</v-icon>
						</v-text-field>
					</v-col>
				</v-row>
				<v-row justify="center" class="mb-1">
					<v-btn text @click="show_advanced = !show_advanced">
						<v-icon>
							{{ show_advanced ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
						</v-icon>
						Advance Options
					</v-btn>
				</v-row>
			</v-sheet>

			<v-fade-transition>
				<v-sheet v-show="show_advanced" class="mt-2 pa-6" rounded="xl">
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

			<v-row justify="center" class="mt-12">
				<v-col>
					<recent-links v-bind:recent_links="recent_links" />
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
			show_advanced: false,
			recent_links: [] as any,
			payload: {
				longurl: '',
				alias: '',
				password: '',
				description: '',
			},
		}
	},

	computed: {},

	async mounted() {
		await this.$store.dispatch('all-links/fetchAllLinks', 3)
		this.recent_links = this.$store.getters['all-links/GET_ALL_LINKS']
	},
	methods: {
		async shorten() {
			await this.$store.dispatch(
				'shorten-link/createShortLink',
				this.show_advanced ? this.payload : { longurl: this.payload.longurl }
			)

			this.recent_links = this.$store.getters['shorten-link/GET_SHORT_LINK']
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
	padding: 16px 0px;
}

.v-text-field--outlined >>> fieldset {
	border-width: 3px;
	border-radius: 12px;
}
</style>