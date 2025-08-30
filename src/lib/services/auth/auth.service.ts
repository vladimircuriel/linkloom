import bcrypt from 'bcryptjs'

type ComparePasswordProps = Readonly<{
  password: string
  hashedPassword: string
}>

type HashPasswordProps = Readonly<{
  password: string
  saltRounds?: number
}>

const authService = {
  comparePassword({ password, hashedPassword }: ComparePasswordProps): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  },

  hashPassword({ password, saltRounds = 10 }: HashPasswordProps): Promise<string> {
    return bcrypt.hash(password, saltRounds)
  },
}

export default authService
