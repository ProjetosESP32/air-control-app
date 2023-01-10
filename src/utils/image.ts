import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'

export const compressImage = async (imageUri: string) => {
  const result = await manipulateAsync(imageUri, [{ resize: { width: 720, height: 720 } }], {
    compress: 0.95,
    format: SaveFormat.JPEG,
  })

  return result.uri
}
