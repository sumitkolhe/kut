import { model, Schema, Document } from 'mongoose'

interface AnalyticsDocument extends Document {
	mobile: { type: boolean }
	tablet: { type: boolean }
	desktop: { type: boolean }
	os: { type: string }
	browser: { type: string }
	version: { type: string }
	platform: { type: string }
	location: { type: object }
	source: { type: string }
}

const AnalyticsSchema: Schema = new Schema({
	mobile: { type: Boolean },
	tablet: { type: Boolean },
	desktop: { type: Boolean },
	os: { type: String },
	browser: { type: String },
	version: { type: String },
	platform: { type: String },
	location: { type: Object },
	source: { type: String },
})

export const AnalyticsModel = model<AnalyticsDocument>(
	'statistic',
	AnalyticsSchema
)
