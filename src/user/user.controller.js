import { messageModel } from "../../models/message.model.js"
import { userModel } from "../../models/user.model.js"

export const userController = async(req,res)=>{
    let user = await userModel.findById(req.params.id)
    res.render('user.ejs',{session: undefined, userId: req.params.id,user})
}

export const handleUser = async(req,res)=>{
    await messageModel.insertMany({userId:req.params.id, message:req.body.message})
    res.redirect(`/user/${req.params.id}`)
}