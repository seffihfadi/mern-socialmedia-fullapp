import { useDropzone } from "react-dropzone"
import { useCallback, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAlert } from "../../context/AlertProvider"
import {ImageUploadValidation} from '../../utils/validation'

const PostForm = ({type, postForm, setPostForm}) => {

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

  //console.log('out',  imagesb64)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const {privacy: prv, desc} = Object.fromEntries(formData)
    const privacy = postVisibility.includes(prv) ? prv : 'privat'
    //console.log('dd', {privacy, desc}, imagesb64)
    try {
      if (imagesb64.length < 1) {
        throw new Error('at least chose one image')
      }
      await ImageUploadValidation.validate(imagesb64)
      setSending(true)
      setPostForm({privacy, desc, images:imagesb64})
    } catch (error) {
      setAlert({type: 'error', text: error.message})
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="group glass">
        <textarea name="desc" id="desc" rows="2" maxLength={250}></textarea>
        <label htmlFor="desc">post description</label>
      </div>
      <div className="group glass">
        {selectedImages.length > 0 ? (
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
        )}
      </div>
      <div className="group glass">
        <select name="privacy" id="privacy" required>
          {postVisibility.map((p, i) => <option key={i} value={p}>{p}</option>)}
        </select>
        <label htmlFor="privacy">post visibility</label>
      </div>
      <div className="flex justify-between items-center">
        <Link to='/'>Cancel</Link>
        <button disabled={sending} className="gradient">{sending ? type + 'ing' : type}</button>
      </div>
    </form>
  )
}

export default PostForm