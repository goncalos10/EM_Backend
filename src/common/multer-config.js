const multer = require('multer')

const config = multer({ dest: 'uploads/' })

config.fileFilter = (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
        return cb(new Error('only png, jpg, jpeg format allowed!'))
    }
    cb(null, true)
}

config.limits = {
    fileSize: 1024 * 1024 * 5
}

module.exports = config.single('photo')