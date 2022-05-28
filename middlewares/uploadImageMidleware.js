const multer = require("multer");
const path = require("path");
const imagePath = process.cwd() + "/public/images";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagePath, cb);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      "_" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    const filename = file.fieldname + "_" + uniqueSuffix;

    req.body.image = "/static/images/" + filename;
    cb(null, filename);
  },
});

const checkFile = (file, cb) => {
  const filetypes = ["png", "jpg", "jpeg"];
  const mimetype = file.mimetype.split("/").pop();

  if (filetypes.includes(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("image only!!"));
  }
};

const maxSize = 4 * 1024 ** 2; // 4MB
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    checkFile(file, cb);
  },
  limits: { fileSize: maxSize },
});

const uploadImage = upload.single("image_product");

module.exports = { uploadImage };
