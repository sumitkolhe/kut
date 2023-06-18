import { HttpExceptionError } from 'server/common/exceptions/http.exception'
import { UserRepository } from 'server/modules/users/repositories'
import { ErrorType } from 'interfaces/error.interface'
import bcrypt from 'bcryptjs'
import { AccountVerificationEmailUseCase } from 'server/modules/users/use-cases'
import type { IUseCase } from 'server/common/types/use-case.type'
import type { UserRegisterDto } from 'server/modules/users/dto'

export class RegisterUserUseCase implements IUseCase<UserRegisterDto, void> {
  private userRepository: UserRepository
  private accountVerificationEmailUsecase: AccountVerificationEmailUseCase

  constructor() {
    this.userRepository = new UserRepository()
    this.accountVerificationEmailUsecase = new AccountVerificationEmailUseCase()
  }

  async execute({ email, password }: UserRegisterDto) {
    const doesUserExist = await this.userRepository.findByEmail(email)

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    if (doesUserExist && doesUserExist.authProviders?.credentials === true) {
      throw new HttpExceptionError(409, ErrorType.userAlreadyExists)
    } else if (doesUserExist && doesUserExist.authProviders?.credentials === false) {
      await this.userRepository.update(doesUserExist._id.toString(), {
        $set: {
          password: hashedPassword,
          'authProviders.credentials': true,
        },
      })
    } else {
      await this.userRepository.create({
        email,
        password: hashedPassword,
        authProviders: {
          social: {
            github: false,
            google: false,
          },
          credentials: true,
        },
      })
      await this.accountVerificationEmailUsecase.execute(email)
    }
    return
  }
}
