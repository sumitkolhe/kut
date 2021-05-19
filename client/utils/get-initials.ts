export const getInitials = (name: any) => {
	let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')

	let initials = [...name.matchAll(rgx)] || []

	return (
		(initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
	).toUpperCase()
}
