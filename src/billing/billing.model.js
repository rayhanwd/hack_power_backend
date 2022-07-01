const mongoose = require('mongoose');
const { Schema } = mongoose;

const billingSchema = new Schema({
    fullName:{
        type: String,
        required: true,
        unique:false
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique:true,
    },
    paidAmount: {
        type: String,
        required: true
    },
},
    {
        timestamps: true,
        versionKey: false,
    })

module.exports = mongoose.model('billing', billingSchema);