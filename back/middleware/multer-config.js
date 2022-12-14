const multer = require('multer');

const MINE_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
}; 

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); 
  },
  filename: (req, file, callback) => {                   
    const name = file.originalname.split(' ').join('_'); 
    const extension = MINE_TYPES[file.mimetype];        
    const temp = name.split('.')[0];
    callback(null, temp + '_'+ Date.now() + '.' + extension); 
  }
});

module.exports = multer({storage: storage}).single('image');