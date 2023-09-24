import { useDropzone } from "react-dropzone"
import { useCallback, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAlert } from "../../context/AlertProvider"
import {ImageUploadValidation} from '../../utils/validation'
import { motion } from 'framer-motion'
import { FadeUp } from "../../utils/animation/fadeUpAnimation"

const PostForm = ({type, postForm, setPostForm}) => {

  const isUpdate = type === 'Update'
  const postVisibility = ['public', 'connections', 'privat']
  const [sending, setSending] = useState(false)
  const [setAlert] = useAlert()

  // display image
  const [imagesb64, setImagesb64] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      setSelectedImages((prevState) => [...prevState, file])
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 3, multiple: true,  accept: {
    'image/jpeg': ['.jpeg', '.png', '.jpg']
  }})

  useEffect(() => {
    (function () {
      setImagesb64([])
      if (selectedImages.length > 0){
        selectedImages.map((file) => {
          let reader = new FileReader();
          reader.onload = function (e) {
            setImagesb64(prev => [...prev, e.target.result])
          }
          reader.readAsDataURL(file);
        })
      }
    })()
  }, [selectedImages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const {privacy: prv, desc} = Object.fromEntries(formData)
    const privacy = postVisibility.includes(prv) ? prv : 'privat'
    try {
      if (!isUpdate) {
        if (imagesb64.length < 1) {
          throw new Error('at least chose one image')
        }
        await ImageUploadValidation.validate(imagesb64)

      }
      setSending(true)
      setPostForm({privacy, desc, images: isUpdate ? [] : imagesb64})

    } catch (error) {
      setAlert({type: 'error', text: error.message})
    }
  }

  return (
    <motion.form {...FadeUp} onSubmit={handleSubmit} noValidate>
      <div className="group glass">
        <textarea defaultValue={isUpdate ? postForm.desc : ''} name="desc" id="desc" rows="2" maxLength={250} required></textarea>
        <label htmlFor="desc">post description</label>
      </div>
      <div className="group glass">
        {isUpdate ?
          <div className={`imgscol num-${postForm.images.length}`}>
            {postForm.images.map((image, i) => 
              <div key={i} className="imgcol">
                <img src={image} alt={image} />
              </div>
            )}
          </div>
        :
          selectedImages.length > 0 ? (
            <>
              <div className={`imgscol num-${selectedImages.length}`}>
                {selectedImages.map((selectedImage) => 
                  <div key={selectedImage.lastModified} className="imgcol">
                    <img src={`${URL.createObjectURL(selectedImage)}`} alt="" />
                    <button 
                      onClick={() => setSelectedImages(selectedImages.filter((img) => img !== selectedImage))}
                    >
                      <i className="uil uil-multiply text-white text-sm"></i>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div {...getRootProps()} className="w-full rounded-lg aspect-video border-gray-500 border-2 border-dashed flex justify-center items-center">
                <input {...getInputProps()} />
                <p className="text-gray-500 text-center px-5">
                  {isDragActive ? 'Drop images here ...' : 'Drag and drop images here, or click to select'}
                </p>
              </div>
              <label>max 3 images</label>
            </>
          )
        }
        
      </div>
      <div className="group glass">
        <select defaultValue={isUpdate ? postForm.privacy : 'public'} name="privacy" id="privacy" required>
          {postVisibility.map((p, i) => <option key={i} value={p}>{p}</option>)}
        </select>
        <label htmlFor="privacy">post visibility</label>
      </div>
      <div className="flex justify-between items-center">
        <Link to='/'>Cancel</Link>
        <button disabled={sending} className="gradient">
          {sending ? type.substring(0, type.length - 1) + 'ing' : type}
        </button>
      </div>
    </motion.form>
  )
}

export default PostForm