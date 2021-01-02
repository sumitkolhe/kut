import { model, Schema, Document } from 'mongoose'

export interface NotesDocument extends Document {
	title: { type: string; required: true; unique: boolean }
	description: { type: string; required: boolean }
	created: { type: Date; required: boolean }
}

const NotesSchema = new Schema({
	title: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	created: { type: Date, default: Date.now, required: true },
})

NotesSchema.index({ title: 1 }, { unique: true })

export const NotesModel = model<NotesDocument>('note', NotesSchema)
