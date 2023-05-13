import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import { UserRepository } from 'server/modules/users/repositories/user.repository'
import { ErrorType } from 'interfaces/error.interface'
import bcrypt from 'bcryptjs'
import { EmailService } from 'server/modules/email/services/email.service'
import type { User } from 'interfaces/user.interface'
import type { IUseCase } from 'server/common/types/use-case.type'

type RegisterUserUseCaseParams = Pick<User, 'email' | 'password'>

export class RegisterUserUseCase implements IUseCase<RegisterUserUseCaseParams, void> {
  private userRepository: UserRepository
  private emailService: EmailService

  constructor() {
    this.userRepository = new UserRepository()
    this.emailService = new EmailService()
  }

  async execute({ email, password }: Pick<User, 'email' | 'password'>) {
    const doesUserExist = await this.userRepository.findByEmail(email)

    if (doesUserExist) throw new HttpExceptionError(409, ErrorType.userAlreadyExists)

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const createdUser = await this.userRepository.createUser(email, hashedPassword)

    await createdUser.save().catch((error: any) => {
      logger.error(`error creating user: ${error}`)
      throw new HttpExceptionError(500, `error creating user, please try again later`)
    })

    await this.emailService.sendAccountVerificationEmail(email)
  }
}
