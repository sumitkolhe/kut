<template>
	<v-card color="transparent" elevation="0">
		<v-footer dark color="transparent" elevation="0" padless width="100%">
			<v-col class="text-center" cols="12">
				<v-row justify="center" class="mt-6">
					<p class="font-weight-bold">
						Made with
						<svg
							class="pr-1 beat"
							style="width: 24px; height: 24px; vertical-align: middle"
							viewBox="0 0 24 24"
						>
							<path
								fill="red"
								d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
							/>
						</svg>
						by
						<a
							class="mx-2 white--text text-decoration-none"
							href="https://sumit.codes"
						>
							🦊
						</a>
					</p>
				</v-row>
			</v-col>
		</v-footer>
	</v-card>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style scoped>
@keyframes heartbeat {
	0% {
		transform: scale(0.75);
	}
	25% {
		transform: scale(1);
	}
	50% {
		transform: scale(0.75);
	}
	70% {
		transform: scale(1);
	}
	100% {
		transform: scale(0.75);
	}
}
.beat {
	animation: heartbeat 3s infinite;
}
</style>
