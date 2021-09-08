const router = require("express").Router();
const db = require("../models");
const Controller = require("../controllers");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    var folder;
    if (file.fieldname === "thumbnail") {
      folder = req.body.id + "/" + req.body.webURL; //org_id and webURL is reQuired.
    } else if (file.fieldname === "logo") {
      folder = req.body.id + "/site"; //org_id is Required.
    }

    fs.mkdirSync(`./public/uploads/${folder}/`, {
      recursive: true,
    });
    cb(null, `./public/uploads/${folder}/`);
  },
  filename: (req, file, cb) => {
    switch (file.fieldname) {
      case "thumbnail":
        cb(null, file.fieldname + ".png"); //thumbnail.png
        break;
      case "logo":
        cb(null, file.fieldname + ".png"); //logo.png
        break;

      default:
        break;
    }
  },
});

const upload = multer({ storage: storage });

router.post(`/form`, Controller.Generate.formsignUp);
router.post(`/genTicket`, Controller.Generate.genTicket);
router.post(`/generateFAQsByOrg_id/:org_id`, Controller.Generate.generateFAQs);

router.post(
  `/generateSite`,
  upload.single("logo"),
  Controller.Generate.generateSite
);
router.post(
  `/generateSite/social`,
  Controller.Generate.generateSiteSocials
);

router.post(
  `/genEvent`,
  upload.single("thumbnail"),
  Controller.Generate.generateEvent
);
router.post(
  `/updateEvent`,
  upload.single("thumbnail"),
  Controller.Generate.updateEvent
  );
  router.post(
    `/generateBlog`,
    Controller.Generate.generateBlog
  );
  
module.exports = router;
