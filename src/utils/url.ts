import { BASE_URL } from "./env"

export const getFullUrlResource = (uri: string) => {
  if (uri.match(/^https?:\/\//g)) {
    return uri
  }

  return `${BASE_URL.replace(/\/+$/g, '')}/${uri.replace(/^\/+/g, '')}`
}
