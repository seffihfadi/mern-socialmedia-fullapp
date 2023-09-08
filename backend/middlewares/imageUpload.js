import multer from "multer";

const imageUpload = async (req, res, next) => {
  const storage = multer.memoryStorage()
  const upload = multer({ storage })
  
  upload.array("image")
  next()

}


export default imageUpload