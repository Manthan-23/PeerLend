import mongoose from "mongoose";

const lendererSchema = new mongoose.Schema({

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
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    dateOfBirth: {
        type: Date,
        required: false,
    },  
    occupation: {
        type: String,
        required: false,
    },
    annualIncome: {
        type: Number,
        required: false,
    }, 
    sourceOfIncome: {
        type: String,
        required: false,
    },  
    panOrAadhaar: {
        type: String,
        required: false,
    },
    lendingAmountRange: {
        type: String,
        required: false,
    },
    interestRate: {
        type: Number,
        required: false,
    }, 
    loanDuration: {
        type: String,
        required: false,
    },
    riskAppetite: {
        type: String,
        required: false,
    },

})

export default mongoose.model("Lenderers", lendererSchema);