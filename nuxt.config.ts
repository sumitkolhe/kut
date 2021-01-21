import { NuxtConfig } from '@nuxt/types/config'
import { config } from './server/config/config'

const NuxtAppConfig: NuxtConfig = {
	telemetry: false,
	head: {
		titleTemplate: '%s | Shorten your links easily',
		title: 'Reduced',
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				hid: 'description',
				name: 'description',
				content:
					'An Open-Source URL shortener built with powerful tools to help you grow and protect your brand.',
			},
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{
				rel: 'stylesheet',
				type: 'text/css',
				href:
					'https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800;900',
			},
		],
	},

	env: {
		APP_NAME: process.env.APP_NAME || config.APP_NAME,
		APP_VERSION: process.env.APP_VERSION || config.APP_VERSION,
	},

	loading: { color: '#f55' },

	srcDir: 'client/',

	generate: {
		dir: './dist/nuxt',
		fallback: true,
	},

	components: true,

	buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],

	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/auth-next',
		'nuxt-clipboard2',
		['nuxt-vuex-localstorage', { mode: 'debug', localStorage: ['theme'] }],
	],

	plugins: [
		'~/plugins/notifier.ts',
		'~/plugins/qr-code.ts',
		'~/plugins/chart.ts',
	],

	axios: {
		baseURL: '/api', // Used as fallback if no runtime config is provided
	},

	auth: {
		cookie: false,
		strategies: {
			local: {
				token: {
					prefix: 'access_token.',
					property: 'access_token',
					required: true,
					type: 'Bearer',
				},
				user: {
					property: 'user_details',
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
					primary: '#ffffff',
					secondary: '#613dc1',
					accent: '#ff5050',
					surface: '#242424',
					background: '#121212',
				},
				light: {
					primary: '#111111',
					secondary: '#00bbf9',
					accent: '#ff5050',
					surface: '#f7f7f7',
					background: '#fff',
				},
			},
		},
	},
	build: {
		extractCSS: true,
		extend: function (NuxtAppConfig) {
			NuxtAppConfig.node = {
				fs: 'empty',
			}
		},
	},
}

export default NuxtAppConfig
