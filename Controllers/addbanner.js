const banner = require('../Modals/banner')
const cloudinary=require('cloudinary').v2

const fs = require('fs');
const path = require('path');


require('dotenv').config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
// Upload Banners
const createBanner = async (req, res) => {
  try {
    const { bannerTitle, bannerLink} = req.body;
   
     
    const newDocumentPic = [];
    if (req.files) {
      // Upload files to Cloudinary and get the URLs
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        newDocumentPic.push(result.secure_url);  // Store the URL of the uploaded image
        // Optionally, you could delete the file from the server after uploading (uncomment below if needed)
        // fs.unlinkSync(file.path);
      }
    }
  
   
    // Create a new blog entry
    const newBanner = new banner({
      bannerTitle,
      bannerLink,
      sliderBannerImage:newDocumentPic, // Save Cloudinary image URL in the database
    });

    await newBanner.save();
    res.status(200).json({ message: "Blog created successfully", newBanner });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Banners
const getAllBanners = async (req, res) => {
  try {
    const resp = await banner.find();
    res.status(200).send({message:"banner fetch",banner:resp});
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ message: 'Error fetching banners' });
  }
};

// Delete Banner
const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    await banner.findByIdAndDelete(id);
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const editBanner = async (req, res) => {
  try {
    const id = req.params._id; // Get banner ID from request params
    const { bannerTitle, bannerLink } = req.body; // Get text fields from request body

    // Check if a new file is uploaded for sliderBannerImage
    const newDocumentPic = [];
    if (req.files) {
      // Upload files to Cloudinary and get the URLs
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        newDocumentPic.push(result.secure_url);  // Store the URL of the uploaded image
        // Optionally, you could delete the file from the server after uploading (uncomment below if needed)
        // fs.unlinkSync(file.path);
      }
    }

    const updatebanners={
      ...req.body,
      sliderBannerImage:newDocumentPic
    }
    // Update the banner in the database
    const updatedBanner = await banner.findByIdAndUpdate(id,updatebanners) 
  

    if (!updatedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({
      message: "Banner updated successfully",
      updatedBanner,
    });
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ message: "Error updating banner" });
  }
};





module.exports = {
  createBanner,
  getAllBanners,
  deleteBanner,
  editBanner,
};
