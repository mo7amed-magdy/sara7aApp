
import { userModel } from '../../databases/models/user.model.js';
import { messageModel } from './../../databases/models/message.model.js';
export const userController = async(req,res) =>{
    let user = await userModel.findById(req.params.id);
    res.render('user.ejs',{session:null,userId:req.params.id,userName:user.name})
}
export const handleUser = async (req,res) =>{
    await messageModel.insertMany({message:req.body.message,receivedId:req.params.id})

    res.redirect(`/user/${req.params.id}`)
}