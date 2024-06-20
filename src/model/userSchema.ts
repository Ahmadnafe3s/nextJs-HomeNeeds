import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    UID: {
        type: Number,
        required: true,
        unique: true
    },

    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,

    verifyToken: String,
    verifyTokenExpiry: Date,

},
    { versionKey: false }

)

const users = mongoose.models.user || mongoose.model('user', userSchema)

export default users