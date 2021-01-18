<template>
	<v-row justify="center" align="center">
		<v-col cols="12" sm="10" lg="8">
			<p class="title-text" dark>
				Create short links quickly
				<svg
					data-v-55d53dfe=""
					viewBox="0 0 24 24"
					width="26"
					height="26"
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
			<v-sheet elevation="0" class="pa-10 mt-4" rounded="xl">
				<v-row>
					<v-col>
						<input-field
							:placeholder="'Enter a URL'"
							:type="'text'"
							v-model="payload.long_url"
						/>
					</v-col>
				</v-row>
				<v-row justify="center" class="mt-6">
					<v-btn
						@click="shorten()"
						depressed
						color="accent"
						large
						:loading="loading"
					>
						Shorten
					</v-btn>
				</v-row>
			</v-sheet>
			<v-row justify="center" class="mb-6 mt-6">
				<v-btn
					color="primary"
					depressed
					@click="show_advanced = !show_advanced"
				>
					<v-icon>
						{{ show_advanced ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
					</v-icon>
					Advance Options
				</v-btn>
			</v-row>

			<v-fade-transition>
				<v-sheet
					elevation="0"
					v-show="show_advanced"
					class="mt-2 pa-6"
					rounded="xl"
				>
					<v-row justify="space-around">
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
				</v-sheet>
			</v-fade-transition>

			<v-row justify="center" class="mt-12">
				<v-col cols="12">
					<recent-links-table :recent_links="recent_links" />
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
			loading: false,
			payload: {
				long_url: '',
				alias: '',
				password: '',
				description: '',
			},
		}
	},

	computed: {
		recent_links() {
			return this.$store.getters['all-links/GET_RECENT_LINKS']
		},
	},

	async created() {
		await this.$store.dispatch('all-links/fetchRecentLinks', 3)
	},
	methods: {
		async shorten() {
			this.loading = true
			await this.$store
				.dispatch(
					'shorten-link/createShortLink',
					this.show_advanced
						? this.payload
						: { long_url: this.payload.long_url }
				)
				.then((short_link: any) => {
					this.$store.commit('all-links/PUSH_RECENT_LINK', short_link)
					this.loading = false
					;(this as any).$notify.success('Link shortened sucessfully')
				})
				.catch((err: any) => {
					this.loading = false
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
	padding: 16px 0px;
}

.v-label {
	color: green !important;
}

.v-text-field--outlined >>> fieldset {
	border-width: 3px;
	border-radius: 12px;
}

.v-text-field--outlined >>> .v-label {
	padding: 0px 8px;
	font-size: 18px;
	letter-spacing: 1px;
}
</style>