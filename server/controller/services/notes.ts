import { CreateError } from '@middleware/error-handler'
import { NotesModel } from '@model/notes.model'
import { UserModel } from '@model/user.model'
import { RequestHandler } from 'express'

export const createNote: RequestHandler = async (req, res, next) => {
	try {
		const new_note = new NotesModel({
			title: req.body.title,
			content: req.body.content,
		})

		const saved_note = await new_note.save()

		const user_instance: any = await UserModel.findOne({
			email: req.auth_data.email,
		})
		await user_instance.user_notes.push(new_note)
		await user_instance.save()
		res.status(201).json(saved_note)
	} catch (err) {
		next(err)
	}
}

export const getNotes: RequestHandler = async (req, res, next) => {
	try {
		await UserModel.findOne({ email: req.auth_data.email })
			.populate({
				path: 'user_notes',
			})
			.then((note: any) => {
				res.json(note?.user_notes)
			})
	} catch (error) {
		next(error)
	}
}

export const updateNote: RequestHandler = async (req, res, next) => {
	try {
		const response = await NotesModel.findByIdAndUpdate(
			req.body._id,
			req.body
		)

		if (!response) throw CreateError.BadRequest()
		{
			res.json({
				message: 'Note updated successfully',
			})
		}
	} catch (error) {
		next(error)
	}
}

export const deleteNote: RequestHandler = async (req, res, next) => {
	try {
		await UserModel.findOneAndUpdate(
			{ email: req.auth_data.email },
			{
				$pull: {
					user_notes: req.body._id,
				},
			}
		).then(async () => {
			await NotesModel.findByIdAndDelete(req.body._id).then(() => {
				res.json({ message: 'Note deleted successfully' })
			})
		})
	} catch (error) {
		next(error)
	}
}
