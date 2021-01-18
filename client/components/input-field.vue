<template>
	<input
		class="urlbox"
		:class="{ urlboxdark: $vuetify.theme.dark }"
		:placeholder="placeholder"
		:type="type"
		:value="value"
		@input="$emit('input', $event.target.value)"
	/>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	props: {
		value: String,
		type: String,
		placeholder: String,
	},
})
</script>

<style scoped>
.urlbox {
	border-radius: 6px;
	width: 100%;
	border: 2px solid #f1f1f1;
	background-color: #ffffff;
	font-weight: bolder;
	font-size: large;
	padding: 8px;
	line-height: 32px;
	outline: none;
}
.urlbox:focus {
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
}

.urlboxdark {
	border: 2px solid #f1f1f1;
	background-color: #fff;
}

.urlboxdark:focus {
	box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
}
</style>