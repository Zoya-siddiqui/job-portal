import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    },
    role: {
        type: String,
        enum: ['candidate', 'recruiter'],
        required: true
    },

}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role,
    },
        process.env.ACCESS_TOKEN_SECERET,

        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
        }
    )
}


userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECERET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
        }
    );
};




export const User = mongoose.model("User", userSchema)