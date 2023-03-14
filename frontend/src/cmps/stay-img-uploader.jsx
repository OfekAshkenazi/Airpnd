import { useRef, useState } from 'react'
import { uploadService } from '../services/upload.service'

export function StayImgUploader({ stayToEdit, onUploaded, idx }) {
  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })
  const id = `imgUpload-${idx}`

  async function uploadImg(ev) {
    try {
      const { secure_url, height, width } = await uploadService.uploadImg(ev)
      setImgData({ imgUrl: secure_url, width, height })
      onUploaded && onUploaded(idx, secure_url)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={`grid-img-${(idx + 1).toString()} upload-preview flex align-center mt5`}>
      <label className="">
        <img className="" src={stayToEdit.imgUrls[idx] ? stayToEdit.imgUrls[idx] : ''} alt="Upload Image" />
        <input type="file" hidden onChange={(ev) => uploadImg(ev)} accept="img/*" id={id} />
      </label>
    </div>
  )
}