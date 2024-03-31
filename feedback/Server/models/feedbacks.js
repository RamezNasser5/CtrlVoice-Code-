const mongoose=require("mongoose");

const feedbackSchema=new mongoose.Schema({
  
    feedback:{
        type:String,
    },
    nickname:{
        type:String,
    },
    email:{
        type:String,
    },
    publicity:{
        type:Boolean,
    },  
    rating:{
        type:Number,
    },
    date: { type: Date, default: Date.now } 
})


const feedbackModel=mongoose.model("feedbacks",feedbackSchema);
module.exports = feedbackModel;