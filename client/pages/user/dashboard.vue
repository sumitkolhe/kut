<template>
	<v-row justify="center" align="center">
		<v-col cols="12" md="10">
			<p class="title-text" dark>
				Create short links quickly
				<svg
					viewBox="0 0 24 24"
					width="28"
					height="28"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					style="vertical-align: middle"
				>
					<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
				</svg>
			</p>
			<v-sheet elevation="2" class="pa-10 mt-4" rounded="xl">
				<v-row>
					<v-col>
						<input-field
							:placeholder="'Enter a URL'"
							:type="'text'"
							v-model="payload.longurl"
						/>
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-btn
						@click="shorten()"
						depressed
						color="secondary"
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
					elevation="2"
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
				<v-col>
					<recent-links :recent_links="recent_links" />
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
			recent_links: Array(),
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
		await this.$store.dispatch('all-links/fetchRecentLinks', 3)
		this.recent_links = this.$store.getters['all-links/GET_RECENT_LINKS']
	},
	methods: {
		async shorten() {
			await this.$store
				.dispatch(
					'shorten-link/createShortLink',
					this.show_advanced ? this.payload : { longurl: this.payload.longurl }
				)
				.then((short_link: any) => {
					this.$store.commit('all-links/PUSH_RECENT_LINK', short_link)
					this.recent_links = this.$store.getters['all-links/GET_RECENT_LINKS']
					;(this as any).$notify.success('Link shortened sucessfully')
				})
				.catch((err: any) => {
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