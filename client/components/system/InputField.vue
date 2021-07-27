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
	border-radius: 10px;
	width: 100%;
	border: 3px solid #d8d8d8;
	background-color: #ffffff;
	font-weight: bolder;
	font-size: large;
	padding: 8px 16px;
	line-height: 38px;

	outline: none;
}
.urlbox:focus {
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
}

.urlboxdark {
	border: 3px solid #696969;
	background-color: #191919;
	color: #fff;
}

::placeholder {
	color: #808080;
	opacity: 1;
}

:-ms-input-placeholder {
	color: #808080;
}

::-ms-input-placeholder {
	color: #808080;
}

.urlboxdark:focus {
	box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
}
</style>