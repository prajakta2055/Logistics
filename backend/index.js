const express = require('express');
const cors= require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/reviews');
  console.log('db connected')
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const reviewSchema = new mongoose.Schema({
    username: String,
    serviceProviderName: String,
    serviceProviderRating: String,
    feedback: String,
    orderID: String,
    dateOfService: String,
    recommendService: String,
});
  const Review = mongoose.model('Review', reviewSchema);
const server =express();

server.use(cors());
server.use(bodyParser.json());

server.post('/demo',async(req,res)=>{
    let review=new Review();
    review.username= req.body.username;
    review.serviceProviderName=req.body.serviceProviderName;
    review.serviceProviderRating=req.body.serviceProviderRating;
    review.feedback=req.body.feedback;
    review.orderID=req.body.orderID;
    review.dateOfService=req.body.dateOfService;
    review.recommendService=req.body.recommendService;
    const doc=await review.save();
    console.log(doc);
    console.log(req.body);
    res.json(doc);
})

server.get('/demo',async(req,res)=>{
    const docs=await Review.find({});
    res.json(docs)
})


server.get('/dataAnalytics', async (req, res) => {
  try {
    const { serviceProviderName, reviewRating, compareRating, retailerZipcode } = req.query;
    console.log(serviceProviderName +" "+ reviewRating+" "+compareRating+" "+retailerZipcode);

    // Build the filter object based on the provided form fields
    const filter = {};
    if (serviceProviderName && serviceProviderName !== 'ALL_PRODUCTS') {
      filter.serviceProviderName = serviceProviderName;
    }
    if (reviewRating) {
      filter.serviceProviderRating = reviewRating;
    }
    if (compareRating) {
      // Modify the comparison condition based on your comparison logic
      // This is just an example; you should adjust it according to your requirements
      if (compareRating === 'EQUALS_TO') {
        // Modify this line based on your actual field names in the schema
        filter.$expr = { $eq: ["$serviceProviderRating", "$reviewRating"] };
      } else if (compareRating === 'GREATER_THAN') {
        // Modify this line based on your actual field names in the schema
        filter.serviceProviderRating = { $gt: reviewRating };
      } else if (compareRating === 'LESS_THAN') {
        // Modify this line based on your actual field names in the schema
        filter.serviceProviderRating = { $lt: reviewRating };
      }
    }
    // if (retailerZipcode) {
    //   filter.retailerZipcode = retailerZipcode;
    // }
console.log(filter)
    const docs = await Review.find(filter);
    console.log(docs);
    res.json(docs);
  } catch (error) {
    console.error('Error filtering data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



server.put('/updateProvider/:id', (req, res) => {
  const serviceProviderId = req.params.id;
  const {
      provider_name,
      email,
      phone_number,
      address,
      shipping_service,
      tracking_service,
      express_delivery_service,
      logo,
      agreement
  } = req.body;

  const sql = `
      UPDATE service_providers 
      SET 
          provider_name = ?,
          email = ?,
          phone_number = ?,
          address = ?,
          shipping_service = ?,
          tracking_service = ?,
          express_delivery_service = ?,
          logo = ?,
          agreement = ?
      WHERE id = ?
  `;

  db.query(sql, [
      provider_name,
      email,
      phone_number,
      address,
      shipping_service,
      tracking_service,
      express_delivery_service,
      logo,
      agreement,
      serviceProviderId
  ], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal Server Error", message: err.message });
      }

      return res.json({ message: "Service Provider updated successfully", result });
  });
});



server.listen(8080,()=>{
    console.log('server started');
})