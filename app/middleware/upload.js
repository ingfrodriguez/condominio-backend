
const uuid = require('uuid');

const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/app/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    req.nombre=`${uuid.v1()}.jpg`;
    cb(null, req.nombre);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
