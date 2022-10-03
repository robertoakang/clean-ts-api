import { IEncrypter, IDecrypter } from '@/data/protocols'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor (private readonly secret: string) {}

  async encrypt (plaintext: string): Promise<string> {
    const ciphertext = await jwt.sign({ id: plaintext }, this.secret)
    return ciphertext
  }

  async decrypt (ciphertext: string): Promise<string> {
    const plaintext: any = await jwt.verify(ciphertext, this.secret)
    return plaintext
  }
}
