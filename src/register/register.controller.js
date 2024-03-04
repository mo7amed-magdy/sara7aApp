
import { userModel } from './../../databases/models/user.model.js';
export const registerController = (req,res) =>{
    res.render('register.ejs',{error:req.query?.error,session:null})
}

export const handleRegister = async (req,res) =>{
    let user = await userModel.findOne({email:req.body.email})
    if(user) return res.redirect('/register?error=User already exists');
    await userModel.insertMany(req.body)
    res.redirect('/login')
} 
