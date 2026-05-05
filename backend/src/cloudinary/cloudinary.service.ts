import { Injectable, BadRequestException } from '@nestjs/common'
import { v2 as cloudinary } from 'cloudinary'
import { v4 as uuid } from 'uuid'

@Injectable()
export class CloudinaryService {
  private readonly configured: boolean

  constructor() {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    this.configured = Boolean(cloudName && apiKey && apiSecret)

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    })
  }

  isConfigured() {
    return this.configured
  }

  private requireConfigured() {
    if (this.configured) return
    throw new BadRequestException('Cloudinary is not configured')
  }

  // ✅ Upload từ file (QUAN TRỌNG NHẤT)
  async uploadFile(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded')

    if (!this.configured) {
      const mimeType = file.mimetype || 'application/octet-stream'
      const base64 = file.buffer.toString('base64')
      const dataUrl = `data:${mimeType};base64,${base64}`

      return {
        secure_url: dataUrl,
        public_id: null,
        resource_type: 'image',
        provider: 'local',
      }
    }

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'books',
            public_id: `book-${uuid()}`, // tránh trùng
          },
          (error, result) => {
            if (error) return reject(error)
            resolve(result)
          },
        )
        .end(file.buffer)
    })
  }

  // (Optional) dùng khi seed data
  async uploadFromUrl(url: string) {
    this.requireConfigured()
    return cloudinary.uploader.upload(url, {
      folder: 'books',
      public_id: `book-${uuid()}`,
    })
  }

  // Tối ưu ảnh
  getOptimizeUrl(publicId: string) {
    return cloudinary.url(publicId, {
      fetch_format: 'auto',
      quality: 'auto',
    })
  }

  // Crop ảnh
  getAutoCropUrl(publicId: string) {
    return cloudinary.url(publicId, {
      crop: 'fill',
      gravity: 'auto',
      width: 300,
      height: 400,
    })
  }
}

