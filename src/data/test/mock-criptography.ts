import { IDecrypter } from '@/data/protocols/criptography/decrypter'
import { IEncrypter } from '@/data/protocols/criptography/encrypter'
import { IHashComparer } from '@/data/protocols/criptography/hash-comparer'
import { IHasher } from '@/data/protocols/criptography/hasher'
import { faker } from '@faker-js/faker'

export class HasherSpy implements IHasher {
  digest = faker.datatype.uuid()
  plaintext: string

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return await Promise.resolve(this.digest)
  }
}

export class HashComparerSpy implements IHashComparer {
  plaintext: string
  digest: string
  isValid = true

  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return await Promise.resolve(this.isValid)
  }
}

export class EncrypterSpy implements IEncrypter {
  ciphertext = faker.datatype.uuid()
  plaintext: string

  async encrypt (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return await Promise.resolve(this.ciphertext)
  }
}

export class DecrypterSpy implements IDecrypter {
  plaintext = faker.internet.password()
  ciphertext: string

  async decrypt (ciphertext: string): Promise<string> {
    this.ciphertext = ciphertext
    return await Promise.resolve(this.plaintext)
  }
}
