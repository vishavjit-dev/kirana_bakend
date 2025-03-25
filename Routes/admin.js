const express=require('express');
const {add_product,viewproduct, delete_product,edit_product, viewproductbyid, viewproductbycategory} = require('../Controllers/addproduct');
const upload=require('../Middleware/file');
const { uploadBanner, getAllBanners, deleteBanner, editBanner, createBanner } = require('../Controllers/addbanner');
const uploadFields = require('../Middleware/bannerfile');
const { createOrder, getAllOrders, vieworderbyemail } = require('../Controllers/order');
const { signup, login } = require('../Controllers/user');
const protectRoute=require('../Middleware/routemiddle');
const payment = require('../Controllers/payment');
const { createBlog, getBlogs, deleteBlog, editBlog, viewblogbyid } = require('../Controllers/blog');
const { registerUser, loginUser, getAllUsers, getUserByEmail, getmail, deleteUserByEmail, getTotalUsers } = require('../Controllers/registation');
const { addReview, getReviews, getallReviews, getCustomerSatisfaction } = require('../Controllers/review');
const usercontact = require('../Modals/contact');
const { usercontacts, getContact, deleteContact } = require('../Controllers/contact');
const { add_category, viewcategory, edit_category, delete_category } = require('../Controllers/addcategory');
const router=express.Router();



router.post('/addcategory',upload.any(),add_category)
router.get('/getcategory',viewcategory)

router.put('/editcategory/:_id',upload.any(),edit_category);

router.delete("/deletecategory/:_id",delete_category);


router.post('/addproduct',upload.any(),add_product);
// router.post('/addproducts',protectRoute,add_product)
router.get('/getproduct',viewproduct);
router.get('/getproductbyid/:_id',viewproductbyid);
router.get('/getproductbycategory/:product_category',viewproductbycategory)
router.delete("/deleteproduct/:_id",delete_product);
router.put('/edit_product/:_id',upload.any(),edit_product);
router.post('/payment',payment);


router.post('/banner',upload.any(),createBanner);
  
  // Get All Banners
  router.get('/getAllBanners', getAllBanners);
  
  // Delete Banner
  router.delete('/deleteBanner/:id', deleteBanner);

  router.put("/editBanner/:_id", upload.any(), editBanner);
  
  router.post('/createOrder', createOrder);
  router.get('/getAllOrders', getAllOrders);
  router.get('/viewordersbyemail/:email', vieworderbyemail);

  router.post('/signup', signup);
  router.post('/login', login);

  router.post('/addblog',upload.any(), createBlog);
  router.get('/getblog', getBlogs);
  router.delete('/deleteblog/:id' , deleteBlog);
  router.put("/editblog/:id" , upload.single("image"), editBlog);
  router.get('/getblogbyid/:_id', viewblogbyid);


  router.post('/register',registerUser);
  router.post('/logins',loginUser);



router.post('/review', addReview);
router.get('/getreview/:productId', getReviews);
router.get('/allreview', getallReviews);
router.get('/alluser/:email', getUserByEmail);
router.put('/getmail/:email',getmail);
router.post('/contact',usercontacts);
router.get('/getcontact', getContact);
router.delete('/contactdelete/:id', deleteContact);
router.delete('/deletealluser/:email', deleteUserByEmail);
router.get('/totaluser',getTotalUsers);
router.get('/getcustomersetification',getCustomerSatisfaction);
 

module.exports=router