<template>
	<v-row justify="center" align="center">Dashboard {{ message.message }}</v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	data() {
		return {
			message: this.$store.state.notification,
		}
	},
})
</script>
