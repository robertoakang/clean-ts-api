import { IDecrypter } from '@/data/protocols/criptography/decrypter'
import { IEncrypter } from '@/data/protocols/criptography/encrypter'
import { IHashComparer } from '@/data/protocols/criptography/hash-comparer'
import { IHasher } from '@/data/protocols/criptography/hasher'

export const mockHasher = (): IHasher => {
  class HasherSub implements IHasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }
  return new HasherSub()
}

export const mockDecrypter = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt (token: string): Promise<string> {
      return await Promise.resolve('any_value')
    }
  }
  return new DecrypterStub()
}

export const mockEncrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    async encrypt (value: string): Promise<string> {
      return await Promise.resolve('any_token')
    }
  }

  return new EncrypterStub()
}

export const mockHashComparer = (): IHashComparer => {
  class HashComparerStub implements IHashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }

  return new HashComparerStub()
}