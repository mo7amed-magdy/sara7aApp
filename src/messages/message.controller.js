import { messageModel } from "../../databases/models/message.model.js";

export const messageController = async (req,res) =>{
    var fullUrl = req.protocol + '://' + req.get('host') + '/user/'+req.session.userId;

    if(!req.session.isLoggedIn) return res.redirect('/login')
    let messages = await messageModel.find({receivedId:req.session.userId})

   res.render('messages.ejs',{session:req.session,fullUrl,messages})
}