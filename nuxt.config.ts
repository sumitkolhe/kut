import { NuxtConfig } from '@nuxt/types/config'
import { config } from './server/config/config'

const NuxtAppConfig: NuxtConfig = {
	telemetry: false,
	target: 'static',

	head: {
		titleTemplate: '%s | Shorten your links easily',
		title: 'Reduced',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{ hid: 'description', name: 'description', content: '' },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{
				rel: 'stylesheet',
				href:
					'https://fonts.googleapis.com/css2?family=Poppins&display=swap',
			},
		],
	},

	env: {
		APP_NAME: process.env.APP_NAME || config.APP_NAME,
		APP_VERSION: process.env.APP_VERSION || config.APP_VERSION,
	},

	loading: { color: '#f55555' },

	srcDir: 'client/',

	buildDir: './dist/.nuxt',

	generate: {
		dir: './dist/.nuxt',
	},

	components: true,

	server: {
		port: config.SERVER_PORT,
		host: config.SERVER_HOST,
	},

	buildModules: [
		'@nuxt/typescript-build',
		'@nuxtjs/vuetify',
		'nuxt-typed-vuex',
	],

	modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

	plugins: ['~/plugins/notifier.ts'],

	publicRuntimeConfig: {
		axios: {
			baseURL: `http://localhost:${config.SERVER_PORT}/api`, // server
		},
	},

	auth: {
		cookie: false,
		strategies: {
			local: {
				token: {
					property: 'accessToken',
					required: true,
					type: 'Bearer',
				},
				user: {
					property: 'userDetails',
					autoFetch: true,
				},
				endpoints: {
					login: { url: 'auth/login', method: 'post' },
					register: { url: 'auth/register', method: 'post' },
					user: { url: 'auth/me', method: 'get' },
					logout: false,
				},
			},
		},
		redirect: {
			login: '/auth/login',
			logout: '/auth/login',
			home: false,
		},
	},

	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			options: {},
			dark: false,
			default: false,
			disable: false,
			themes: {
				dark: {
					primary: '#242424',
					secondary: '#2b2d42',
					accent: '#f55555',
					background: '#121212',
					success: '#4CAF50',
					info: '#2196F3',
					warning: '#FB8C00',
					error: '#FF5252',
				},
				light: {
					primary: '#fff',
					secondary: '#2b2d42',
					background: '#eef4fb',
					accent: '#f55555',
					success: '#4CAF50',
					info: '#2196F3',
					warning: '#FB8C00',
					error: '#FF5252',
				},
			},
		},
	},
	build: {
		extractCSS: true,
		extend: function (NuxtAppConfig) {
			NuxtAppConfig.node = {
				fs: 'empty',
				worker_threads: 'empty',
			}
		},
	},
}

export default NuxtAppConfig
