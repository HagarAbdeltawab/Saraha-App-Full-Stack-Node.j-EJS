import { messageModel } from "../../models/message.model.js";
import { userModel } from "../../models/user.model.js";

export const messageController = async(req,res)=>{
    // if(!req.get('cookie')) return res.redirect('/login')

    let fullUrl = req.protocol + '://' + req.get('host') + '/user/' + req.session.userId;
    if(!req.session.isLoggedIn) return res.redirect('/login')
    let messages = await messageModel.find({userId:req.session.userId})
    let user = await userModel.findById(req.session.userId)
    res.render('message.ejs',{session: req.session, fullUrl, messages, user})
}

