
import { userModel } from './../../databases/models/user.model.js';
import Joi from "joi"
import bcrypt from "bcryptjs"

const signupSchemaVal = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/).required(),


})



export const registerController = (req,res) =>{
    res.render('register.ejs',{error:req.query?.error,session:null,flash:req.flash('error')})
}

export const handleRegister = async (req,res) =>{
    const { error } = signupSchemaVal.validate({...req.params,...req.body,...req.query}, { abortEarly: false })
        if (!error) {
            let user = await userModel.findOne({email:req.body.email})
            if(user) return res.redirect('/register?error=User already exists');
            req.body.password = bcrypt.hashSync(req.body.password,8)
            await userModel.insertMany(req.body)
            return res.redirect('/login')
        }
        req.flash('error',error?.details)
        res.redirect('/register')
    
} 
