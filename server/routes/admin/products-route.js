const express = require('express');
const {handleImageUpload} = require('../../controllers/admin/products-controller');
const {upload} = require('../../helpers/Cloudinary');


const router = express.Router();

router.post('/upload-image', upload.single('my-file'), handleImageUpload);

module.exports = router;