const mongoose = require('mongoose');

const order = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobileNumber: String,
  apartmentNumber: String,
  selectstate: String,
  area: String,
  landmark: String,
  addressType: String,
  pincode: String,
  cartItems: [
    {
      product_image: [],
      product_name: String,
      product_price: Number,
      product_quantity: Number,
    },
  ],
  totalPrice: Number,
  setDefault: Boolean,
  payment_status:String,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', order);

module.exports = Order;
