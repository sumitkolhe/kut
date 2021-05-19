import { model, Schema, Document } from 'mongoose'

export interface NotesDocument extends Document {
	title: { type: string; required: true; unique: boolean }
	description: { type: string; required: boolean }
	created_at: { type: Date }
	updated_at: { type: Date }
}

const NotesSchema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

export const NotesModel = model<NotesDocument>('note', NotesSchema)
