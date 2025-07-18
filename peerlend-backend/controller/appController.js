import bcrypt from "bcryptjs";
import e from "cors";
import jwt from "jsonwebtoken";
import SignupModel from "../models/Signup.model.js";
import randomstring from "randomstring";
import { sendEmail } from "../utils/sendEmails.js";
import LendererModel from "../models/Lenderer.model.js";


function generateOTP() {
    const otp = randomstring.generate({
        length: 6,
        charset: 'numeric'
    });
    return otp;
};

export const sendOTP = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = await SignupModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const otp = generateOTP();
        user.otp = otp; // Store OTP in the user's document
        await user.save();

        await sendEmail(
            email,
            "InstaPay: Your OTP Code",
            `Your OTP code is: ${otp}. It is valid for 10 minutes.`
        );

        console.log(`OTP for ${email}: ${otp}`); // For demonstration purposes
        return res.status(200).json({ message: "OTP sent successfully", otp });
    } catch (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }
        const user = await SignupModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.otp !== otp) {
            return res.status(401).json({ message: "Invalid OTP" });
        }
        // OTP is valid, clear it from the user's document
        user.otp = null; // Clear OTP after verification
        await user.save();
        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const signupUser = async (req, res) => {
    try {
        const { email, password, toggleValue } = req.body;
        
        console.log("toggleValue:", toggleValue);

        const normalUpiId = req.body.email.split('@')[0];
        console.log("UPI ID:", normalUpiId);

        const upiId = normalUpiId + '@instapay';

        if(toggleValue === true) {
            bcrypt.hash(password, 10)
                .then((hashedPassword) => {
                    const existingUser = new LendererModel({
                        email,
                        password: hashedPassword,
                        upiId: upiId,
                        balance: 10000, // Initial balance
                        upiPin: null // Initially no UPI PIN set
                    });
                    existingUser.save();
                })
                .catch((error) => {
                    console.error("Error hashing password:", error);
                    return res.status(500).json({ message: "Internal server error" });
                });
        } else {

        if (password) {
            bcrypt.hash(password, 10)
                .then((hashedPassword) => {
                    const existingUser = new SignupModel({
                        email,
                        password: hashedPassword,
                        upiId: upiId,
                        balance: 10000, // Initial balance
                        upiPin: null // Initially no UPI PIN set
                    });
                    existingUser.save();
                })
                .catch((error) => {
                    console.error("Error hashing password:", error);
                    return res.status(500).json({ message: "Internal server error" });
                });
        }
    }

    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(201).json({ message: "User created successfully" });
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await SignupModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ message: "Login successful", userId: user._id, upiId: user.upiId, userEmail: user.email });
            } else {
                return res.status(401).json({ message: "Invalid credentials" });
            }
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const loginLend = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await LendererModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ message: "Login successful", userId: user._id, upiId: user.upiId, userEmail: user.email });
            } else {
                return res.status(401).json({ message: "Invalid credentials" });
            }
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export async function getUser(req, res) {

    const { email } = req.params;

    try {

        if (!email) return res.status(501).send({ error: "Invalid User" });

        SignupModel.findOne({ email }, function (err, user) {
            if (err) return res.status(500).send({ err });
            if (!user) return res.status(501).send({ err: "Couldn't find the user!" })

            return res.status(201).send(user);
        })

    } catch (error) {

        return res.status(404).send({ error: "Cannot Find User Data" });
    }

}


export async function setPin(req, res) {
    const { upiId, upiPin } = req.body;

    try {
        
        if (!upiId || !upiPin) {
            return res.status(400).json({ message: "Email and UPI PIN are required" });
        }

        const user = await SignupModel.findOne({ upiId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (upiPin.length !== 4) {
            return res.status(400).json({ message: "UPI PIN must be of 4 digits!!" });
        } else if(user.upiPin !== null) {
            return res.status(400).json({ message: "UPI PIN already set. Please update it instead." });
        } else {
            const hashedPin = await bcrypt.hash(upiPin, 10);
            // Save the hashed UPI PIN to the user's document

            user.upiPin = hashedPin; // Set the UPI PIN
            await user.save();
        }

       

        return res.status(200).json({ message: "UPI PIN set successfully" });

    } catch (error) {
        console.error("Error setting UPI PIN:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export async function updatePin(req, res) {
    const { upiId, newUpiPin, oldPin } = req.body;

    try {
        if (!upiId || !oldPin || !newUpiPin) {
            return res.status(400).json({ message: "UPI ID, old PIN, and new PIN are required." });
        }

        const user = await SignupModel.findOne({ upiId });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (user.upiPin === null) {
            return res.status(400).json({ message: "UPI PIN not set. Please set it first." });
        }

        const isOldPinCorrect = await bcrypt.compare(oldPin, user.upiPin);
        if (!isOldPinCorrect) {
            return res.status(401).json({ message: "Old PIN is incorrect." });
        }

        if (oldPin === newUpiPin) {
            return res.status(400).json({ message: "New PIN must be different from the old PIN." });
        }

        if (!/^\d{4}$/.test(newUpiPin)) {
            return res.status(400).json({ message: "New UPI PIN must be exactly 4 digits." });
        }

        const hashedNewPin = await bcrypt.hash(newUpiPin, 10);
        user.upiPin = hashedNewPin;
        await user.save();

        return res.status(200).json({ message: "UPI PIN updated successfully." });

    } catch (error) {
        console.error("Error updating UPI PIN:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
    
}


export async function updateBasicDetailsLend(req, res) {
    const { upiId, name, phoneNumber, dateOfBirth } = req.body;
    console.log("Received data:", req.body);
    try {
        if (!upiId || !name || !phoneNumber || !dateOfBirth) {
            return res.status(400).json({ message: "UPI ID, name, phone number, and date of birth are required." });
        }
            console.log("Updating basic details for UPI ID:", upiId);

        const user = await LendererModel.findOne({upiId: upiId});
        console.log("User found:", user);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        user.name = name;
        user.phoneNumber = phoneNumber;
        user.dateOfBirth = dateOfBirth;

        await user.save();

        return res.status(200).json({ message: "Basic details updated successfully." });
    } catch (error) {
        console.error("Error updating basic details:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}



export async function updateProfDetailsLend(req, res) {
    const { upiId, occupation, incomeRange, sourceOfIncome, panAadhaar } = req.body;
    console.log("Received data:", req.body);
    try {
        if (!upiId || !occupation || !incomeRange || !sourceOfIncome || !panAadhaar) {
            return res.status(400).json({ message: "UPI ID, occupation, income range, source of income, and PAN/Aadhaar are required." });
        }
            console.log("Updating professional details for UPI ID:", upiId);

        const user = await LendererModel.findOne({upiId: upiId});
        console.log("User found:", user);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        user.occupation = occupation;
        user.annualIncome = incomeRange;
        user.sourceOfIncome = sourceOfIncome;
        user.panOrAadhaar = panAadhaar;

        await user.save();

        return res.status(200).json({ message: "Professional details updated successfully." });
    } catch (error) {
        console.error("Error updating professional details:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}


export async function updateLendingDetailsLend(req, res) {
    const { upiId, lendAmountRange, interestRate, prefLoanDuration, riskAppetite } = req.body;
    console.log("Received data:", req.body);
    try {
        if (!upiId || !lendAmountRange || !interestRate || !prefLoanDuration || !riskAppetite) {
            return res.status(400).json({ message: "UPI ID, lending amount range, interest rate, preferred loan duration, and risk appetite are required." });
        }
            console.log("Updating lending details for UPI ID:", upiId);

        const user = await LendererModel.findOne({upiId: upiId});
        console.log("User found:", user);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        user.lendingAmountRange = lendAmountRange;
        user.interestRate = interestRate;
        user.loanDuration = prefLoanDuration;
        user.riskAppetite = riskAppetite;

        await user.save();

        return res.status(200).json({ message: "Lending details updated successfully." });
    } catch (error) {
        console.error("Error updating lending details:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}


export async function getLendProfileDetails(req, res) {
    console.log(req.params);
    const { upiId } = req.params;
    console.log("Entered");
    console.log("Fetching lend profile details for UPI ID:", upiId);
    try {
        if (!upiId) return res.status(400).send({ error: "Invalid UPI ID" });

        const user = await LendererModel.findOne({ upiId: upiId });
        if (!user) return res.status(404).send({ error: "User not found" });    
        return res.status(200).send(user);
    } catch (error) {
        console.error("Error fetching lend profile details:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
};
