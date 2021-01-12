import { model, Schema, Document } from 'mongoose'
import { AnalyticsModel } from '@model/analytics.model'

export interface LinkDocument extends Document {
	alias: { type: string; required: true; unique: boolean }
	longurl: { type: string; required: boolean }
	shorturl: { type: string }
	clicks: { type: number }
	password: { type: string }
	description: { type: string }
	analytics: { type: Schema.Types.ObjectId; ref: string }
	created: { type: Date; required: boolean }
}

const LinkSchema = new Schema({
	alias: { type: String, required: true, unique: true },
	longurl: { type: String, required: true },
	shorturl: { type: String },
	clicks: { type: Number, default: 0 },
	password: { type: String, default: null },
	description: { type: String, default: null },
	analytics: [{ type: Schema.Types.ObjectId, ref: AnalyticsModel }],
	created: { type: Date, default: Date.now, required: true },
})

LinkSchema.index({ alias: 1 }, { unique: true })

export const LinkModel = model<LinkDocument>('link', LinkSchema)
