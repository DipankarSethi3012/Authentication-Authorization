const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: "String",
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: "String",
        required: true,
    },
    password: {
        type: "String",
        required: true,
    },
    role:{
        type:"String",
        required:true,
        enum:["Admin","Student","Visitor"] 
        //enums are used to create small userspace
        //As we have only 3 roles we are using enumn for this
    }


});

module.exports = mongoose.model("User", userSchema);