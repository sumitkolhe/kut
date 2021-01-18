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

	loading: { color: '#f55555' },

	srcDir: 'client/',

	buildDir: './dist/nuxt',

	generate: {
		dir: './dist/nuxt',
		fallback: true,
	},

	components: true,

	server: {
		port: config.SERVER_PORT,
		host: config.SERVER_HOST,
	},

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

	publicRuntimeConfig: {
		axios: {
			browserBaseURL: `${config.SERVER_PROTOCOL}://${config.SERVER_HOST}:${config.SERVER_PORT}/api`, // server
		},
	},

	auth: {
		cookie: false,
		strategies: {
			local: {
				token: {
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
					primary: '#ff5050',
					secondary: '#3d405b',
					accent: '#613dc1',
					surface: '#242424',
					background: '#121212',
				},
				light: {
					primary: '#ff5050',
					secondary: '#3d405b',
					accent: '#00bbf9',
					surface: '#f1f1f1',
					background: '#f1f2f4',
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
