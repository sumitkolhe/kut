import { model, Schema, Document, models } from 'mongoose'

export interface NotesDocument extends Document {
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
}

const NotesSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
)

export const NotesModel = models.NotesModel || model<NotesDocument>('note', NotesSchema)
