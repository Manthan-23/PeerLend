import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    upiId: {
        type: String,
        required: false,
    },
    balance: {
        type: Number,
        default: 0,
        required: false,
    },
    upiPin: {
        type: String,
        required: false,
        length: 4, // Assuming UPI PIN is a 4-digit number
    },
    otp: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false, 
    }

})

export default mongoose.model("Users", signupSchema);