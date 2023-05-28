import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import { UserRepository } from 'server/modules/users/repositories/user.repository'
import { ErrorType } from 'interfaces/error.interface'
import bcrypt from 'bcryptjs'
import { AccountVerificationEmailUseCase } from 'server/modules/users/use-cases/send-verification-email/send-verification-email.use-case'
import type { IUseCase } from 'server/common/types/use-case.type'
import type { UserRegisterDto } from 'server/modules/users/dto/register.dto'

export class RegisterUserUseCase implements IUseCase<UserRegisterDto, void> {
  private userRepository: UserRepository
  private accountVerificationEmailUsecase: AccountVerificationEmailUseCase

  constructor() {
    this.userRepository = new UserRepository()
    this.accountVerificationEmailUsecase = new AccountVerificationEmailUseCase()
  }

  async execute({ email, password }: UserRegisterDto) {
    const doesUserExist = await this.userRepository.exists({ email })

    if (doesUserExist) throw new HttpExceptionError(409, ErrorType.userAlreadyExists)

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    await this.userRepository.create({
      email,
      password: hashedPassword,
      authProviders: {
        credentials: true,
      },
    })

    return this.accountVerificationEmailUsecase.execute(email)
  }
}
