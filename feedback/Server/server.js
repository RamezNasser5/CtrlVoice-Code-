
//create server
const express = require('express');
const app = express();
const cors=require("cors")
app.use(cors())

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
//connect to db
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rameznasser55:rpSXbun3eK1rc1It@cluster0.ilqmbbc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('Connected to DB');
}).catch((err)=>{
    console.log(err);
});

//import UserModel

const feedbackModel = require('./models/feedbacks');

app.get('/feedbacks', async (req, res) => {
    
        const feedbacks = await feedbackModel.find();
        res.json(feedbacks);
        
})



app.post('/feedbacks', async (req, res) => {
    try {
      // Extract form data from request body
      const {  feedback, nickname, email, publicity,rating,date} = req.body;
  
      // Create a new feedback document
      const newFeedback = new feedbackModel({
        feedback,
        nickname,
        email,
        publicity,
        rating,
        date: date 
      });
  
      // Save the new feedback document to the database
      await newFeedback.save();
  
      // Send success response
      res.status(201).json({ message: 'Feedback saved successfully' });
    } catch (error) {
      // Handle errors
      console.error('Error saving feedback:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  









app.listen(3001, () => {
    console.log('Server is running on port 3001');
});