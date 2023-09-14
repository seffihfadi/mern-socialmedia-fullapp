import { useOutletContext } from "react-router-dom"
import EditInfo from "./EditInfo"
import EditPass from "./EditPass"

import { useDropzone } from "react-dropzone"
import { useCallback, useState, useEffect } from "react"


const Edit = () => {
  const userProfile = useOutletContext()

  // display image
  const [imageb64, setImageb64] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const onDrop = useCallback((acceptedFile) => {
    setSelectedImage(acceptedFile[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false,  accept: {
    'image/jpeg': ['.jpeg', '.png', '.jpg']
  }})
  
  useEffect(() => {
    setImageb64('')
    if (!!selectedImage){
      let reader = new FileReader();
      reader.onload = function (e) {
        setImageb64(e.target.result)
      }
      reader.readAsDataURL(selectedImage);
    }
  }, [selectedImage])
    
  return (
    <>
      <div className="col-span-12 md:col-span-5 edit">
        <div className="sticky top-4">

          <h1 className="head_text">Update Your Profile!</h1>
          <p className="text-lg">Explore fresh and intriguing encounters while forming valuable connections with others by sharing your own story.</p>

          <div className="flex flex-col justify-center items-center gap-5 my-10">
            <div className="relative">
              <img 
                onClick={() => {setSelectedImage('')}}
                className="mx-auto object-cover w-80 aspect-square rounded-full cursor-crosshair" 
                src={!!selectedImage ? URL.createObjectURL(selectedImage) : userProfile.image} 
                alt='profile avatar' 
              />
            </div>
            <div {...getRootProps()} className="border-gray-500 cursor-pointer rounded-md w-fit p-3 border-2 border-dashed">
              <input name="image" {...getInputProps()} />
              <p className="text-gray-500 text-center">
                {isDragActive ? 'Drop image here' : 'click to select or drop image here'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-7 grid grid-cols-12">
        <div className="col-span-12 lg:col-span-2"></div>
        <div className="col-span-12 lg:col-span-8 pb-10">
          <h1 className="head_text">main information</h1>
          <EditInfo image={imageb64} />
          <h1 className="head_text">change password</h1>
          <EditPass />
        </div>
      </div>
    </>
  )
}

export default Edit