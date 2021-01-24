import { model, Schema, Document } from 'mongoose'
import { AnalyticsModel } from '@model/analytics.model'

export interface LinkDocument extends Document {
	alias: { type: string; required: boolean; unique: boolean }
	long_url: { type: string; required: boolean }
	short_url: { type: string }
	visit_count: { type: number }
	password: { type: string }
	password_protected: { type: boolean }
	description: { type: string }
	analytics: { type: Schema.Types.ObjectId; ref: string }
	visit_data: { type: Object }
	created_at: { type: Date }
	updated_at: { type: Date }
}

const LinkSchema = new Schema(
	{
		alias: { type: String, required: true, unique: true },
		long_url: { type: String, required: true },
		short_url: { type: String },
		visit_count: { type: Number, default: 0 },
		password: { type: String, select: false, default: null },
		password_protected: { type: Boolean, default: false },
		description: { type: String, default: null },
		analytics: [{ type: Schema.Types.ObjectId, ref: AnalyticsModel }],
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

LinkSchema.index({ alias: 1 }, { unique: true })

export const LinkModel = model<LinkDocument>('link', LinkSchema)
