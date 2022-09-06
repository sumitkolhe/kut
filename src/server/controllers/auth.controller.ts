import { LinkModel } from 'models/link.model'
import { UserModel } from 'models/user.model'
import bcrypt from 'bcryptjs'
import type { NextFunction, Request, RequestHandler, Response } from 'express'

export class AuthController {
  public login: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // const mongo = await connectDatabase()

      // const r = await mongo.db('links-db').collection('test').find()
      // res.status(200).json(r)

      const response = await LinkModel.find()
      res.status(200).json(response)
    } catch (error) {
      next(error)
    }
  }

  public register: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password, firstName, lastName } = req.body

      const ifUserExist = await UserModel.findOne({
        email,
      })

      if (ifUserExist) throw new Error('Email already registered')

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newUser = new UserModel({ email, password: hashedPassword, firstName, lastName })
      await newUser.save().catch((err) => {
        throw new Error(err)
      })

      res.json({ message: 'User registered successfully' })
    } catch (error) {
      next(error)
    }
  }
}
