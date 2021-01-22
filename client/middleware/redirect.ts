import { Middleware } from '@nuxt/types'

const redirectIfLoggedIn: Middleware = ({ store, redirect }) => {
	{
		console.log(store.state.auth)
		if (store.state.auth.loggedIn) {
			return redirect('/user/dashboard')
		}
	}
}

export default redirectIfLoggedIn
