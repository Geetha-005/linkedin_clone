import multer from "multer"


let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({storage})

export default upload



// import multer from 'multer';
// import path from 'path';

// // Define where the images will be stored and their filenames
// let storage = multer.diskStorage({
//   // The folder where the files will be saved
//   destination: (req, file, cb) => {
//     // Ensure the 'public' folder exists, or else Multer will throw an error
//     cb(null, './public/images');
//   },
//   // Define the filename with the original name
//   filename: (req, file, cb) => {
//     // Optionally sanitize the filename to avoid conflicts (remove spaces, special characters)
//     const sanitizedFilename = file.originalname.replace(/\s+/g, '_').toLowerCase();
//     // Use original name + timestamp to avoid overwriting
//     cb(null, Date.now() + '-' + sanitizedFilename);
//   }
// });

// Initialize Multer with the storage configuration
// const upload = multer({
//   storage: storage,
//   // You can set file size limits or image types here if needed
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|gif/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);

//     if (extname && mimetype) {
//       return cb(null, true); // Allow the file
//     } else {
//       cb(new Error('Only image files are allowed'));
//     }
//   },
//   limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB (can adjust)
// });
