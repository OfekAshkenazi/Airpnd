import { useState } from 'react'
import { uploadService } from '../services/upload.service'
import imgAttachment from "../assets/img/icons/icon-attachment.png"

export function StayImgUploader({ onUploaded = null }) {
  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded && onUploaded(secure_url)
  }

  return (
    <div className="upload-preview flex align-center mt5">
      <label htmlFor="imgUpload">
        <img src={imgAttachment} title='upload image' alt="" />
        <input type="file" hidden onChange={uploadImg} accept="img/*" id="imgUpload"  />
      </label>
    </div>
  )
}