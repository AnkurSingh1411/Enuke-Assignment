const Image = require("../models/images")


exports.uploadImage = async (req, res) => {
    try {
      const newImage = new Image ({
        imageData : req.file.path
      })
      if (newImage){
        await newImage.save()
        res.json({
            success : true,
            error : false,
            message : "Image Saved Sucessfully"
        })
      }

    }
    catch (err) {
        res.json({
            message: "Something Went Wrong",
            error: err.message
        })
    }

}


