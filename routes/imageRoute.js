const express = require ('express')
const router = express.Router()
const imageController = require("../controllers/imageController")
const {authenticateToken} = require("../jwt/jwt_operations")
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 500000
    },
    fileFilter: fileFilter
});

router.post("/upload",upload.single('imageData'),authenticateToken,imageController.uploadImage);

module.exports = router