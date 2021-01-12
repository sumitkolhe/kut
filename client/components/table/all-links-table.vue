<template>
	<v-data-table
		:headers="headers"
		:items="desserts"
		:single-expand="singleExpand"
		:expanded.sync="expanded"
		item-key="name"
		show-expand
	>
		<template v-slot:[`item.data-table-expand`]="{ expand, isExpanded }">
			<v-icon @click="expand(!isExpanded)">mdi-pencil</v-icon>
		</template>
		<template v-slot:expanded-item="{ headers }">
			<td :colspan="headers.length">
				<v-row justify="space-around" class="pa-8">
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
			</td>
		</template>
	</v-data-table>
</template>
<script>
export default {
	data() {
		return {
			payload: {
				longurl: '',
				alias: '',
				password: '',
				description: '',
			},
			expanded: [],
			singleExpand: false,
			headers: [
				{
					text: 'Dessert (100g serving)',
					align: 'left',
					sortable: false,
					value: 'name',
				},
				{ text: 'Calories', value: 'calories' },
				{ text: 'Fat (g)', value: 'fat' },
				{ text: 'Carbs (g)', value: 'carbs' },
				{ text: 'Protein (g)', value: 'protein' },
				{ text: 'Iron (%)', value: 'iron' },
				{ text: '', value: 'data-table-expand' },
			],
			desserts: [
				{
					name: 'Eclair',
					calories: 262,
					fat: 16.0,
					carbs: 23,
					protein: 6.0,
					iron: '7%',
				},
				{
					name: 'Cupcake',
					calories: 305,
					fat: 3.7,
					carbs: 67,
					protein: 4.3,
					iron: '8%',
				},
				{
					name: 'Gingerbread',
					calories: 356,
					fat: 16.0,
					carbs: 49,
					protein: 3.9,
					iron: '16%',
				},

				{
					name: 'KitKat',
					calories: 518,
					fat: 26.0,
					carbs: 65,
					protein: 7,
					iron: '6%',
				},
			],
		}
	},
}
</script>

<style  scoped>
.v-data-table {
	border-radius: 12px !important;
}
</style>