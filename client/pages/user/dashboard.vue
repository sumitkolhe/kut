<template>
	<v-row justify="center">
		<v-col cols="12" md="10">
			<v-row>
				<v-col cols="12" md="4">
					<v-card flat rounded="lg">
						<v-list-item three-line>
							<v-list-item-content>
								<v-list-item-title class="headline mb-1">
									Total links
								</v-list-item-title>
								<v-list-item-subtitle>
									No. of links shortened
								</v-list-item-subtitle>
							</v-list-item-content>

							<v-icon x-large>mdi-link</v-icon>
						</v-list-item>
					</v-card>
				</v-col>
				<v-col cols="12" md="4">
					<v-card flat rounded="lg">
						<v-list-item three-line>
							<v-list-item-content>
								<v-list-item-title class="headline mb-1">
									Total Notes
								</v-list-item-title>
								<v-list-item-subtitle>Total notes written</v-list-item-subtitle>
							</v-list-item-content>
							<v-icon x-large>mdi-book-edit</v-icon>
						</v-list-item>
					</v-card>
				</v-col>
				<v-col cols="12" md="4">
					<v-card flat rounded="lg">
						<v-list-item three-line>
							<v-list-item-content>
								<v-list-item-title class="headline mb-1">
									Total link impressions
								</v-list-item-title>
								<v-list-item-subtitle>
									No. of link impressions
								</v-list-item-subtitle>
							</v-list-item-content>
							<v-icon x-large>mdi-cursor-default-click</v-icon>
						</v-list-item>
					</v-card>
				</v-col>
			</v-row>
			<v-row class="mt-12" justify="center" align="center">
				<v-col cols="12">
					<v-sheet class="pa-6" rounded="lg">
						<v-row>
							<v-col cols="12">
								<v-text-field
									label="Enter a long url"
									solo
									class="d-flex mb-n6"
									v-model="payload.longurl"
								>
									<v-icon @click="shorten()" slot="append" color="accent">
										mdi-send
									</v-icon>
								</v-text-field>
							</v-col>
						</v-row>
					</v-sheet>

					<v-row justify="center" class="mb-8 mt-4">
						<v-btn text @click="show = !show">
							<v-icon>
								{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
							</v-icon>
							Advance Options
						</v-btn>
					</v-row>

					<v-fade-transition>
						<v-sheet v-show="show" class="pa-6" rounded="lg">
							<v-row justify="space-around">
								<v-col cols="6">
									<v-text-field
										label="Alias"
										solo
										class="d-flex"
										v-model="payload.longurl"
									></v-text-field>
								</v-col>

								<v-col cols="6">
									<v-text-field
										label="Password"
										solo
										class="d-flex"
										v-model="payload.longurl"
									></v-text-field>
								</v-col>
							</v-row>

							<v-text-field
								label="Description"
								solo
								class="d-flex"
								v-model="payload.longurl"
							></v-text-field>
						</v-sheet>
					</v-fade-transition>
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
			show: false,
			payload: {
				longurl: '',
			},
		}
	},
	methods: {
		shorten() {
			this.$axios
				.post('/shorten/', this.payload)
				.then(() => {
					;(this as any).$notify.success('Link shortened sucessfully')
				})
				.catch((err) => {
					;(this as any).$notify.error(err.response.data.message)
				})
		},
	},
})
</script>
