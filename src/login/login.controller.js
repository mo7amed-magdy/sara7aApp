import { userModel } from "../../databases/models/user.model.js"
import Joi from "joi"
import bcrypt from "bcryptjs"


const signinSchemaVal = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-z0-9#@]{8,40}$/),

})


export const loginController = (req,res) =>{
    
    res.render('login.ejs',{error:req.query?.error,session:null,flash:req.flash('error2')})
}
export const handleLogin = async (req,res) =>{
    const { error } = signinSchemaVal.validate({...req.params,...req.body,...req.query}, { abortEarly: false })
    if (!error) {
        let user = await userModel.findOne({email:req.body.email});
        if(!user) return res.redirect('/login?error=user not found'); 
        if(user&&bcrypt.compareSync(req.body.password,user.password)){
            req.session.isLoggedIn = true
        req.session.userId = user._id
        req.session.name = user.name

        return res.redirect('/messages')
        } else{
            
            return res.redirect('/login?error=wrong password')
        }
        }
        req.flash('error2',error?.details)
        res.redirect('/login')

    
}