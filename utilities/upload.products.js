const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/products");
    },
    filename: function (req, file, cb) {
      
        const fileExt = file.mimetype.split('/')
        const fileName = Date.now() + '_' + Math.round(Math.random() * 10000) + '.' + fileExt[1]
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

module.exports = upload