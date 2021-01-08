<template>
	<v-row>
		<v-col cols="12" md="4">
			<v-card flat rounded="lg">
				<v-list-item three-line>
					<v-list-item-content>
						<v-list-item-title class="headline mb-1">
							Total links
						</v-list-item-title>
						<v-list-item-subtitle>No. of links shortened</v-list-item-subtitle>
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
						<v-list-item-subtitle>No. of link impressions</v-list-item-subtitle>
					</v-list-item-content>
					<v-icon x-large>mdi-cursor-default-click</v-icon>
				</v-list-item>
			</v-card>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
