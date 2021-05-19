export const convertDate = (date: Date) => {
	let newDate: Date = new Date(date)
	let month: number = newDate.getMonth()
	var suffix: string = newDate.getHours() >= 12 ? 'PM' : 'AM'
	let hours: string | number = ((newDate.getHours() + 11) % 12) + 1
	let minutes: number = newDate.getMinutes()
	var months: Array<String> = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]
	let monthName: String = months[month]
	let year: number = newDate.getFullYear()
	let day: number = newDate.getDate()

	return `${day} ${monthName} ${year} - ${hours} : ${minutes} ${suffix}`
}
