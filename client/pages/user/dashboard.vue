<template>
	<div class="px-10">
		<v-row class="px-4">
			<p class="text-h4 font-weight-bold">
				Hey {{ this.$store.state.auth.user.userName }},
			</p>
		</v-row>

		<v-row justify="space-around">
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
				<v-card flat rounded="lg" color="secondary">
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
		<v-row class="px-4 mt-12" justify="center" align="center">
			<v-text-field
				label="Enter a long url"
				solo
				v-model="payload.longurl"
			></v-text-field>
		</v-row>
		<v-row justify="center">
			<v-btn @click="shorten()" elevation="2">Reduce</v-btn>
		</v-row>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	data() {
		return {
			payload: {
				longurl: '',
			},
		}
	},
	methods: {
		creatNotification() {
			this.$store.commit('notification/showNotification', {
				message: 'hello',
				color: 'accent',
			})
		},

		shorten() {
			this.$axios
				.post('/shorten/', this.payload)
				.then((response) => {
					console.log(response.data)
					this.$notify.showNotification()
				})
				.catch((err) => {
					console.log(err)
				})
		},
	},
})
</script>
