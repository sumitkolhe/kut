import { Middleware } from '@nuxt/types'

const redirectIfLoggedIn: Middleware = ({ store, redirect }) => {
	{
		if (store.state.auth.loggedIn) {
			return redirect('/user/dashboard')
		}
	}
}

export default redirectIfLoggedIn
