const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

const payment=async(req,res)=>
{
    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100, // Amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
          };

          const order = await razorpay.orders.create(options);
          res.status(200).json(order);
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports=payment