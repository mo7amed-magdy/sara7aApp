import { userModel } from "../../databases/models/user.model.js"

export const loginController = (req,res) =>{
    res.render('login.ejs',{error:req.query?.error,session:null})
}
export const handleLogin = async (req,res) =>{
    let user = await userModel.findOne(req.body);
    if(!user) return res.redirect('/login?error=user not found');   
    
    // res.setHeader('set-cookie','userId=' + user._id)
    req.session.isLoggedIn = true
    req.session.userId = user._id
    req.session.name = user.name

    res.redirect('/messages')
}