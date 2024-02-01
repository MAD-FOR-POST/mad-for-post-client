import { postService } from '@/services/PostService'

export default async function onAccountConnectButtonClickedsad() {
  try {
    // Assuming you have some params to send, otherwise pass an empty object or appropriate data
    const params = {} // Replace with actual data as needed
    const response = await postService.uploadPost(params)

    // Handle response
    console.log('Upload response:', response)
  } catch (error) {
    // Handle error
    console.error('Error during upload:', error)
  }
}
