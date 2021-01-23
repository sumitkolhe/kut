import { model, Schema, Document } from 'mongoose'
import { LinkModel } from '@model/link.model'
import { NotesModel } from '@model/notes.model'
interface UserDocument extends Document {
	user_name: {
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
	is_banned: {
		type: boolean
		required: boolean
	}
	user_links: {
		type: Schema.Types.ObjectId
		ref: string
	}
	user_notes: {
		type: Schema.Types.ObjectId
		ref: string
	}
	created_at: { type: Date }
	updated_at: { type: Date }
}

const UserSchema = new Schema(
	{
		user_name: {
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
		is_banned: {
			type: Boolean,
			required: true,
			default: false,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		user_links: [{ type: Schema.Types.ObjectId, ref: LinkModel }],
		user_notes: [{ type: Schema.Types.ObjectId, ref: NotesModel }],
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

UserSchema.index({ user_name: 1 }, { unique: true })
UserSchema.index({ email: 1 }, { unique: true })

export const UserModel = model<UserDocument>('user', UserSchema)
