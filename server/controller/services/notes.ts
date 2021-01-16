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

		const saved_note = await new_note.save().catch((err: any) => {
			throw CreateError.InternalServerError(err)
		})

		const user_instance: any = await UserModel.findOne({
			email: req.body.auth.email,
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
		await UserModel.findOne({ email: req.body.auth.email })
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
		const payload = {
			title: req.body.title,
			content: req.body.content,
		}

		await NotesModel.findByIdAndUpdate(req.body._id, payload as any).catch(
			(err: any) => {
				throw CreateError.BadRequest(err)
			}
		)
		res.json({
			message: 'Note updated successfully',
		})
	} catch (error) {
		next(error)
	}
}

export const deleteNote: RequestHandler = async (req, res, next) => {
	try {
		await NotesModel.findByIdAndDelete(req.body._id).then(() => {
			res.json({ message: 'Note deleted successfully' })
		})
	} catch (error) {
		next(error)
	}
}
