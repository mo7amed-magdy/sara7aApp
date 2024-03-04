import mongoose from "mongoose"

const schema = new mongoose.Schema({

    name: String,
    email: String,
    password: String
    
}, { timestamps: true })

export const userModel = mongoose.model('user', schema)