import api from './api'

// Upload helper prepared for Cloudinary integration.
//
// Current behavior:
// - Sends the raw File object to a mocked backend endpoint: POST /uploads/image
// - Assumes the backend (or mock) returns: { url, publicId, ... }
//
// To integrate with real Cloudinary later you have two main options:
// 1) Backend-signed upload:
//    - Call your backend API to get a signed upload URL/signature and upload preset.
//    - Use fetch/axios directly to POST the file to Cloudinary's upload URL.
// 2) Direct-from-frontend with unsigned preset (less secure, usually only for demos):
//    - POST a FormData with file + upload_preset to
//      https://api.cloudinary.com/v1_1/<cloud_name>/image/upload
//
// This function is structured so you only need to swap the implementation
// inside and keep the same call sites in your React components.
export async function uploadToCloudinary(file) {
  if (!file) {
    throw new Error('No file provided for upload')
  }

  // For now, send to a mocked backend endpoint that mimics Cloudinary.
  // Later you can replace this with a real Cloudinary upload flow.
  const formData = new FormData()
  formData.append('file', file)

  const response = await api.post('/uploads/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export default {
  uploadToCloudinary,
}


