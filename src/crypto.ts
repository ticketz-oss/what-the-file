import * as Crypto from 'crypto'
import HKDF from 'futoin-hkdf'

export const aesDecryptGCM = (ciphertext: Buffer, key: Buffer, iv: Buffer, authTag: Buffer) => {
  const decipher = Crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(authTag)
  return Buffer.concat([decipher.update(ciphertext), decipher.final()])
}

export function hkdf(buffer: Uint8Array | Buffer, expandedLength: number, info: { salt?: Buffer, info?: string }) {
  return HKDF(!Buffer.isBuffer(buffer) ? Buffer.from(buffer) : buffer, expandedLength, info)
}
