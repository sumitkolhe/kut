<template>
	<v-row justify="center" align="center" class="mt-2 mt-md-8">
		<v-col cols="12">
			<p class="title-text" dark>
				Create short links quickly
				<svg-icon name="flash" />
			</p>

			<v-row justify="center">
				<v-col cols="12" sm="10" lg="8" xl="6">
					<input-field
						:placeholder="'Enter a URL...'"
						:type="'text'"
						v-model="payload.long_url"
					/>
				</v-col>
			</v-row>

			<v-row justify="center" class="mt-6">
				<v-btn
					@click="shorten()"
					depressed
					color="secondary"
					x-large
					dark
					class="font-weight-bold background--text"
					rounded
					:loading="loading"
				>
					Shorten
				</v-btn>
				<v-btn
					icon
					color="primary"
					x-large
					class="ml-2"
					@click="show_advanced = !show_advanced"
				>
					<svg-icon v-if="show_advanced" name="settings_filled" size="30" />
					<svg-icon v-else name="settings" size="30" />
				</v-btn>
			</v-row>

			<v-fade-transition>
				<v-row justify="center" v-show="show_advanced" class="mt-8">
					<v-col cols="12" sm="10" lg="8" xl="6">
						<input-field
							class="mt-md-2 mt-0"
							:placeholder="'Custom Alias'"
							:type="'text'"
							v-model="payload.alias"
						/>

						<input-field
							class="mt-4"
							:placeholder="'Password'"
							:type="'password'"
							v-model="payload.password"
						/>

						<input-field
							class="mt-4"
							:placeholder="'Description'"
							:type="'text'"
							v-model="payload.description"
						/>
					</v-col>
				</v-row>
			</v-fade-transition>

			<v-row justify="center" class="mt-12">
				<v-col cols="12" sm="10" lg="10" xl="8">
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