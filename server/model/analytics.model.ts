import { model, Schema, Document } from 'mongoose'

interface AnalyticsDocument extends Document {
	visit_date: { type: Date; required: boolean }
	os: {
		windows: boolean
		linux: boolean
		mac: boolean
		android: boolean
	}
	browser: {
		opera: boolean
		ie: boolean
		edge: boolean
		safari: boolean
		firefox: boolean
		chrome: boolean
	}

	details: {
		os: string
		browser: string
		version: string
		platform: string
		source: string
	}

	location: object
}

const AnalyticsSchema: Schema = new Schema({
	visit_date: { type: Date, default: Date.now, required: true },
	os: {
		windows: Boolean,
		linux: Boolean,
		mac: Boolean,
		android: Boolean,
	},
	browser: {
		opera: Boolean,
		ie: Boolean,
		edge: Boolean,
		safari: Boolean,
		firefox: Boolean,
		chrome: Boolean,
	},

	details: {
		os: String,
		browser: String,
		version: String,
		platform: String,
		source: String,
	},

	location: Object,
})

export const AnalyticsModel = model<AnalyticsDocument>(
	'analytics',
	AnalyticsSchema
)
