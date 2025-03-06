export type DownloadableMessage = {
  mediaKey: Uint8Array
  directPath?: string
  url?: string
}

export type MediaDecryptionKeyInfo = {
  iv: Uint8Array
  cipherKey: Uint8Array
  macKey: Uint8Array
}

export type MediaType = 'image' | 'video' | 'audio' | 'document'
