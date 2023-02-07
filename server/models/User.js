const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },

    email: {
        type: String,
        max: 50,
        unique: true,
        require: true        
    },
    
    password: {
        type: String,
        min:6,
        max: 20,
        unique: true,
        require: true
    }
}, { timestamps: true })

module.exports=mongoose.model("user",userSchema)