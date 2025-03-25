const Review = require("../Modals/review");

// ✅ Add a Review
const addReview = async (req, res) => {
    try {
        const { productId, name, email, rating, comment } = req.body;
        const review = new Review({ productId, name, email, rating, comment });
        await review.save();
        res.status(200).json({ success: true, message: "Review added successfully!" });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
};

// ✅ Get Reviews for a Product
const getReviews = async (req, res) => {
    try {
      // console.log(req.params.productId);
      
        const reviews = await Review.find({ productId: req.params.productId });
        res.status(200).json(reviews);
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
};

// get all review
// const getBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find();
//     res.status(200).json(blogs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getallReviews = async (req, res) => {
  try {
    const review = await Review.find();
    res.status(200).json(review)
  } catch (error) {
    res.status(500).json({message: error.message});
    
  }
  
};



const getCustomerSatisfaction = async (req, res) => {
  try {
    const totalReviews = await Review.countDocuments();
    if (totalReviews === 0) {
      return res.status(200).json({ satisfaction: 0 }); // Avoid division by zero
    }

    const positiveReviews = await Review.countDocuments({ rating: { $gte: 4 } }); // 4 and 5 star ratings
    const satisfactionPercentage = ((positiveReviews / totalReviews) * 100).toFixed(2);

    res.status(200).json({ satisfaction: satisfactionPercentage });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ✅ Delete a Review
const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Review deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
    addReview , getReviews , getallReviews, getCustomerSatisfaction
}
