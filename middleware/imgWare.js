import multer, { diskStorage } from 'multer'

//multer middleware for image storage and naming 
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, './uploads')
    },
    filename: (req,file,cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})

const upload = multer({
    storage: storage,
}).single("image");

export default upload