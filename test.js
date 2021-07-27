const axios = require('axios')

const test = async () => {
	for (let i = 0; i > -1; i++) {
		await axios
			.post('http://localhost:3000/api/anonshorten', {
				long_url: 'https://sumit.co',
			})
			.then((res) => {
				console.log(res.data.alias)
			})
			.catch((err) => {
				console.log(err.message)
				process.exit()
			})
	}
}

test()
