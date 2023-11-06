import { hashSync, compareSync } from 'bcrypt'
export const encryptedPassword = (password: string): string => {
  const saltRounds = 10
  const hashedPassword = hashSync(password, saltRounds)
  return hashedPassword
}

export const comparePassword = (password: string, passEncrypted: string): boolean => {
  return compareSync(password, passEncrypted)
}
