const addcategory = require('../Modals/category');
const cloudinary=require('cloudinary').v2

require('dotenv').config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const add_category = async (req, res) => {
    try {
        const { 
            category_name,
            category_image,
           
            
        } = req.body;


        // 'req.files' will contain the uploaded files
         const newDocumentPic = [];

        if (req.files) {
            // Upload files to Cloudinary and get the URLs
            for (let file of req.files) {
              const result = await cloudinary.uploader.upload(file.path);
              newDocumentPic.push(result.secure_url);
            }
          }
 

        // Create a new contact with the uploaded Cloudinary URLs
        const newAddcategory = new addcategory({
           
            category_name,
            category_image:newDocumentPic,
            
            
        });

        // Save to database
        const resp = await newAddcategory.save();
        res.status(200).send({ message: "category saved", user: resp });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error saving category", error });
    }
};

const viewcategory= async(req,res)=>
{
    try {
        const resp=await addcategory.find()
        res.status(200).send({message:"category data fetch",category:resp})
    } catch (error) {
        console.log(error);
        
    }
}


const delete_category = async (req, res) => {
    try {
      const id  = req.params._id; // Get product ID from URL parameter
  
      // Find the product by ID and delete it
      const deletedcategory = await addcategory.findByIdAndDelete(id);
  
      if (!deletedcategory) {
        return res.status(404).send({ message: "category not found" });
      }
  
      res.status(200).send({
        message: "category deleted successfully",
        category: deletedcategory,
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).send({ message: "Failed to delete category", error });
    }
  };


//   const edit_category = async (req, res) => {
    
//     try {
//         const id = req.params._id; // Get product ID from URL parameter
//         const updatedData = req.body; // Get updated data from the request body
    
        

//         // If there are new files, upload them to Cloudinary
//         if (req.files) {
//             const newDocumentPic = [];
//             for (let file of req.files) {
//                 const result = await cloudinary.uploader.upload(file.path);
//                 newDocumentPic.push(result.secure_url);
//             }
//             updatedData.category_image = newDocumentPic; // Update the product image field
//         }

//         // Find the product by ID and update it
//         const updatedcategory = await addcategory.findByIdAndUpdate(
//             id, // Find product by ID
//             updatedData, // Fields to update
//             { new: true } // Return the updated product
//         );

//         if (!updatedcategory) {
//             return res.status(404).send({ message: 'category not found' });
//         }

//         res.status(200).send({
//             message: 'category updated successfully',
//             category: updatedcategory,
//         });
//     } catch (error) {
//         console.error('Error updating category:', error);
//         res.status(500).send({ message: 'Failed to update category', error });
//     }
// };


const edit_category = async (req, res) => {
    try {
        const id = req.params._id; // Get category ID from URL parameter
        const updatedData = req.body; // Get updated data from the request body

        // Retrieve the existing category data
        const existingCategory = await addcategory.findById(id);

        if (!existingCategory) {
            return res.status(404).send({ message: 'Category not found' });
        }

        // Check if there are new files to upload
        if (req.files && req.files.length > 0) {
            const newDocumentPic = [];
            for (let file of req.files) {
                const result = await cloudinary.uploader.upload(file.path);
                newDocumentPic.push(result.secure_url);
            }
            updatedData.category_image = newDocumentPic; // Update with new images
        } else {
            updatedData.category_image = existingCategory.category_image; // Keep existing images
        }

        // Update the category data in the database
        const updatedCategory = await addcategory.findByIdAndUpdate(
            id, // Find category by ID
            updatedData, // Fields to update
            { new: true } // Return the updated category
        );

        if (!updatedCategory) {
            return res.status(404).send({ message: 'Category not found' });
        }

        res.status(200).send({
            message: 'Category updated successfully',
            category: updatedCategory,
        });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).send({ message: 'Failed to update category', error });
    }
};


  
module.exports={add_category,viewcategory,delete_category,edit_category};