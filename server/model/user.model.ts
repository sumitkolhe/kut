import { model, Schema, Document } from 'mongoose'
import { LinkModel } from '@model/link.model'
import { NotesModel } from '@model/notes.model'
interface UserDocument extends Document {
	userName: {
		type: string
		unique: boolean
		required: boolean
		lowercase: boolean
	}
	email: {
		type: string
		unique: boolean
		required: boolean
		lowercase: boolean
	}
	password: {
		type: string
		required: boolean
		minlength: number
	}
	userLinks: {
		type: Schema.Types.ObjectId
		ref: string
	}
	userNotes: {
		type: Schema.Types.ObjectId
		ref: string
	}
	created: { type: Date; required: boolean }
}

const UserSchema = new Schema({
	userName: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	userLinks: [{ type: Schema.Types.ObjectId, ref: LinkModel }],
	userNotes: [{ type: Schema.Types.ObjectId, ref: NotesModel }],
	created: { type: Date, default: Date.now, required: true },
})

UserSchema.index({ userName: 1 }, { unique: true })
UserSchema.index({ email: 1 }, { unique: true })

export const UserModel = model<UserDocument>('user', UserSchema)
