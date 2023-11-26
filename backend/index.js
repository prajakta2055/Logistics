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

server.listen(8080,()=>{
    console.log('server started');
})